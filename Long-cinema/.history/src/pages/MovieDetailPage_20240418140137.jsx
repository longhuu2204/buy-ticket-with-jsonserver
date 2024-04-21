import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  console.log(movieId);
  const movieApi = "http://localhost:5173/movies/";
  const [movie, setMovie] = useState([]);
  const { data } = useSWR(movieApi.concat(movieId), fetcher);
  console.log(data);
  return <div>Movie Detail Page</div>;
};

export default MovieDetailPage;
