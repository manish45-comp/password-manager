import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api_key = import.meta.env.VITE_API_KEY;

export const fetchLogo = createAsyncThunk(
  "general/fetchLogo",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/logo?name=${name}`,
        {
          headers: {
            "X-Api-Key": api_key,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const LogoSlice = createSlice({
  name: "logo",
  initialState: {
    url: null,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.url = action.payload.data[0].image;
      })
      .addCase(fetchLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default LogoSlice.reducer;
