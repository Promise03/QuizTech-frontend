import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1️⃣ Login User - Step 1: email & password
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5002/api/auth/login",
        credentials
      );

      // ✅ OTP required
      if (res.data?.status === "success" && res.data?.tempToken) {
        localStorage.setItem("tempToken", res.data.tempToken);
        return {
          otpPending: true,
          tempToken: res.data.tempToken,
          email: credentials.email,
          message: res.data?.message || "OTP sent to your email",
        };
      }

      return rejectWithValue("Unexpected response from server.");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 2️⃣ Verify OTP - Step 2: OTP verification
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ otp }, { rejectWithValue }) => {
    try {
      const tempToken = localStorage.getItem("tempToken");
      if (!tempToken)
        return rejectWithValue("Session expired. Please log in again.");

      const res = await axios.post(
        "http://localhost:5002/api/verify-otp",
        { otp },
        { headers: { Authorization: `Bearer ${tempToken}` } }
      );

      // 🛑 FIXED LOGIC: Check for both token AND user data
      if (res.data?.token && res.data?.data) {
        
        // 1. Save data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data)); // Cleanly save the user object
        localStorage.removeItem("tempToken");
        localStorage.removeItem("error"); // Clear any previous error in local storage, if applicable

        // 2. Return payload
        return {
          otpPending: false,
          user: res.data.data, // This is correct, pulling user from the 'data' key
          token: res.data.token,
          message: res.data?.message || "OTP verified successfully",
        };
      }

      // If token or data is missing from the success response
      return rejectWithValue("Invalid server response after OTP verification.");
    } catch (err) {
      // Handles 4xx errors from the server (e.g., Invalid OTP, Expired OTP)
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
// ==========================
// 🧠 Initial State
// ==========================
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  tempToken: localStorage.getItem("tempToken") || null,
  email: null,
  otpPending: false,
  loading: false,
  error: null,
  message: null,
};

// ==========================
// 🪄 Slice
// ==========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
logout: (state) => {
  state.user = null;
  state.token = null;
  state.tempToken = null;
  state.email = null;
  state.otpPending = false;
  state.loading = false;
  state.error = null;
  state.message = null;

  // 🧹 Clear all related items from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("tempToken");
  localStorage.removeItem("user");
},

    clearAuthMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔑 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPending = action.payload.otpPending;
        state.tempToken = action.payload.tempToken || null;
        state.email = action.payload.email || null;
        state.token = action.payload.token || null;
        state.user = action.payload.user || null;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📩 VERIFY OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpPending = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.tempToken = null;
        state.message = action.payload.message;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==========================
// 📤 Export
// ==========================
export const { logout, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;
