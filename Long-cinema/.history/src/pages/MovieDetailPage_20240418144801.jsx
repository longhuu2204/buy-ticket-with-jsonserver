import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  //   console.log(movieId);
  const movieApi = "http://localhost:3000/movies/";
  const [movie, setMovie] = useState([]);
  const { data } = useSWR(movieApi.concat(movieId), fetcher);
  if (!data) return null;
  const {
    id,
    director,
    cast,
    name,
    poster,
    genre,
    trailer,
    duration,
    release_date,
  } = data;
  return (
    <div className="page-container">
      <h1 className="text-3xl w-full border-b-2 pb-6 mt-9 border-black ">
        Movie Details
      </h1>
      <div className="page-content mt-6 flex">
        <div className="movie__img w-[181px] h-[270px]">
          <img src={`${poster}`} alt={`${name}`} />
        </div>
        <div className="movie__info ml-6 flex-1">
          <h2 className="movie__name border-b-2 text-3xl w-full">{`${name}`}</h2>
          <span>Đạo diễn: {`${director}`}</span>
          <span>Diễn viên: {`${cast}`}</span>
          <span>Thể loại: {`${genre}`}</span>
          <span>Khởi chiếu: {`${release_date}`}</span>
          <span>Thời lượng: {`${duration}`}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
