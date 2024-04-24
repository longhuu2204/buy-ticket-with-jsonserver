import React from "react";
import Banner from "./components/banner/Banner";
import Advertisement from "./components/advertisement/ads";
import MovieList from "./components/movie/MovieList";
const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <div className="bg-home-title-bg-img">
        <h2>movie selection</h2>
      </div>
      <MovieList></MovieList>
      <Advertisement></Advertisement>
    </>
  );
};

export default HomePage;