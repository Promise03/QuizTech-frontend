import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// REGISTER USER THUNK
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post("https://quiztech-backend.onrender.com/api/auth/register", userData);
      console.log("Backend response:", res.data);
      return res.data; // return full response (success, message, user)
    } catch (err) {
      console.error("Register thunk error:", err.response?.data);
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// INITIAL STATE
const initialState = {
  user: null,
  loading: false,
  error: null,
};

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
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // will contain { success, message, user }
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
