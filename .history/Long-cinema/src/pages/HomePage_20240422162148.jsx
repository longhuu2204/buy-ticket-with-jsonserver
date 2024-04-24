import React from "react";
import Banner from "./components/banner/Banner";
import Advertisement from "./components/advertisement/ads";
import MovieList from "./components/movie/MovieList";
const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <MovieList></MovieList>
      <Advertisement></Advertisement>
    </>
  );
};

export default HomePage;
