import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Base URL setup (works for local + Render)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
axios.defaults.baseURL = API_BASE_URL;

// ==========================
// 🔑 LOGIN USER (Direct login with email & password)
// ==========================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/login", credentials);

      // ✅ Check for token and user data
      if (res.data?.status === "success" && res.data?.token && res.data?.user) {
        return {
          user: res.data.user,
          token: res.data.token,
          message: res.data?.message || "Login successful",
        };
      }

      return rejectWithValue("Unexpected response from server.");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==========================
// 🧠 INITIAL STATE
// ==========================
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  message: null,
};

// ==========================
// 🪄 SLICE
// ==========================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;

      // 🧹 Clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },

    clearAuthMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟡 LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.message = action.payload.message;

        // Save to localStorage
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ==========================
// 📤 EXPORT
// ==========================
export const { logout, clearAuthMessage } = authSlice.actions;
export default authSlice.reducer;