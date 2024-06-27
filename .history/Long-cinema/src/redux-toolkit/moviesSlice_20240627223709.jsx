import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "../config";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetcher("http://localhost:3000/movies");
  return response;
});

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
