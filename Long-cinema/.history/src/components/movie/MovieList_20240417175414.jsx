import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const MovieList = () => {
  const movieListApi = "http://localhost:3000/movie";
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(movieListApi, fetcher);
  useEffect(() => {
    if (data) setMovies(data);
  }, [data]);
  return (
    <div className="movie-list page-container">
      <Swiper
        grabCursor={true}
        spaceBetween={6}
        slidesPerView={"1"}
        pagination={{ clickable: true }}
        modules={[Pagination]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export default MovieList;
