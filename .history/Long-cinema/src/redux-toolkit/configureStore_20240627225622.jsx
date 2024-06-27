import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";
import bannerSlice from "./bannerSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    banners: bannerReducer,
  },
});

export default store;
