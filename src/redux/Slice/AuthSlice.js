import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 1️⃣ Base URL setup (works for local + Render)
const API_BASE_URL =
   import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
axios.defaults.baseURL = API_BASE_URL;

// ✅ 2️⃣ REGISTER USER THUNK
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // ⬇️ Automatically uses API_BASE_URL from axios.defaults
      const res = await axios.post("/api/auth/register", userData);

      console.log("Backend response:", res.data);
      return res.data; // return full response (success, message, user)
    } catch (err) {
      console.error("Register thunk error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ 3️⃣ INITIAL STATE
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// ✅ 4️⃣ SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Fulfilled
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // will contain { success, message, user }
        state.error = null;
      })
      // Rejected
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

// ✅ 5️⃣ EXPORTS
export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
