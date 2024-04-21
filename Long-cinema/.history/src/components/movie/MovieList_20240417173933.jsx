import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.css";

// Cài đặt SwiperCore với Pagination
SwiperCore.use([Pagination]);
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
        slidesPerView={"auto"}
        pagination={{ clickable: true }}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
