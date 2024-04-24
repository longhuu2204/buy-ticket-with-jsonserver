import React from "react";
import Banner from "../components/banner/Banner";
import Advertisement from "../components/advertisement/ads";
import MovieList from "../components/movie/MovieList";
const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <div className="bg-home-title-bg-img w-full h-[60px] items-center flex justify-center bg-center bg-repeat-x bg-scroll mb-5">
        <h2 className="bg-movie-selection-bg-img z-1 bg-no-repeat bg-center w-[425px] -indent-[99999px] h-[60px] py-2">
          movie selection
        </h2>
      </div>
      <MovieList></MovieList>
      <Advertisement></Advertisement>
    </>
  );
};

export default HomePage;
