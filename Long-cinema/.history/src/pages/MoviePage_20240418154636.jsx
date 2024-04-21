import React, { useEffect, useState } from "react";
import { fetcher } from "../config";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
  const movieListApi = "http://localhost:3000/movies";
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(movieListApi, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (data) setMovies(data);
  }, [data]);
  return (
    <div className="page-container">
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <>
              <MovieCard key={item.id} item={item}></MovieCard>
              <div>
                <b>Thể loại:</b> {`${genre_format}`}
              </div>
              <div>
                <b>Khởi chiếu:</b> {`${release_date}`}
              </div>
              <div>
                <b>Thời lượng:</b> {`${duration}`} phút
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
