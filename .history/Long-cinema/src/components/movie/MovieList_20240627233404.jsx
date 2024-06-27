import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../redux-toolkit/moviesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);
  const error = useSelector((state) => state.movies.error);
  const loading = movieStatus === "loading";

  useEffect(() => {
    if (movieStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);
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
          nextEl: ".swiper-button-next__movie-list",
          prevEl: ".swiper-button-prev__movie-list",
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
        className="swiper-button-prev swiper-button-prev__movie-list !text-white absolute top-1/2 left-0 -translate-x-full bg-red-700 rounded-l-full"
        onClick={handlePrevButton}
      ></div>
      <div
        className="swiper-button-next swiper-button-next__movie-list !text-white absolute top-1/2 right-0 translate-x-full bg-red-700 rounded-r-full"
        onClick={handleNextButton}
      ></div>
    </div>
  );
};

export default MovieList;
