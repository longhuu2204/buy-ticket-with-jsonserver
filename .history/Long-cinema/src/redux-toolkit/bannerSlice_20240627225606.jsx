import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../config";

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const response = await fetcher("http://localhost:3000/banner");
    return response;
  }
);

const bannerSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
