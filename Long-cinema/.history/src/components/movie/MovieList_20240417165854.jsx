import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import Swiper from "swiper";
import { SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  const movieListApi = "http://localhost:3000/movie";
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(movieListApi, fetcher);
  useEffect(() => {
    if (data) setMovies(data);
  }, [data]);
  return (
    <div className="movie-list">
      {/* <Swiper grabCursor={true} spaceBetween={30} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              {/* <MovieCard item={item}></MovieCard> */}
            </SwiperSlide>
          ))}
      </Swiper> */}
    </div>
  );
};

export default MovieList;
