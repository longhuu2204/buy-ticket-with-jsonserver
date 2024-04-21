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
      <h2 className="text-2xl w-full border-b-4 border-black">Movie Details</h2>
    </div>
  );
};

export default MovieDetailPage;
