import React, { useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";

const MovieList = () => {
  const movieListApi = "http://localhost:3000/movie";
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(movieListApi, fetcher);
  console.log(data);
  return <div></div>;
};

export default MovieList;
