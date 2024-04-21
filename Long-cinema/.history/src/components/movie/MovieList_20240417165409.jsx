import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import Swiper from "swiper";

const MovieList = () => {
  const movieListApi = "http://localhost:3000/movie";
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(movieListApi, fetcher);
  useEffect(() => {
    if (data) setMovies(data);
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={30}
        slidesPerView={"auto"}
      ></Swiper>
    </div>
  );
};

export default MovieList;
