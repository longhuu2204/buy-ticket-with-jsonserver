import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MovieList = () => {
  const movieListApi = "http://localhost:3000/movie";
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(movieListApi, fetcher);
  useEffect(() => {
    if (data) setMovies(data);
  }, [data]);
  const swiperRef = useRef(null);
  const handlePrevButton = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNextButton = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  return (
    <div className="movie-list page-container relative">
      <Swiper
        grabCursor={true}
        spaceBetween={6}
        slidesPerView={"auto"}
        ref={swiperRef}
        navigation={{
          nextEl: ".swiper-button-next1",
          prevEl: ".swiper-button-prev1",
        }}
        modules={[Navigation]}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
      <div
        className="swiper-button-prev1 !text-white absolute top-1/2 left-0 -translate-x-full bg-red-700 rounded-l-full"
        onClick={handlePrevButton}
      ></div>
      <div
        className="swiper-button-next1 !text-white absolute top-1/2 right-0 translate-x-full bg-red-700 rounded-r-full"
        onClick={handleNextButton}
      ></div>
    </div>
  );
};

export default MovieList;
