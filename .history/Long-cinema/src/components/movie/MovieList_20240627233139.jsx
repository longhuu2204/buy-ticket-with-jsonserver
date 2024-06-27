import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux-toolkit/moviesSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);

  useEffect(() => {
    // Thực hiện fetch dữ liệu và dispatch action để cập nhật state
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        dispatch(setMovies(data)); // Cập nhật state redux với danh sách phim từ API
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [dispatch]);
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
