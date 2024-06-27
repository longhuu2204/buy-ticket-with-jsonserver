import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../slices/moviesSlice"; // Đường dẫn đến file slice của bạn
import MovieCard from "../components/movie/MovieCard";

const MoviePage = () => {
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

  return (
    <div className="page-container">
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <div key={item.id} className="">
              <MovieCard item={item}></MovieCard>
              <div className="text-base font-bold line-clamp-2">
                {item.name}
              </div>
              <div className="line-clamp-2 text-sm">
                <b>Thể loại:</b> {item.genre}
              </div>
              <div className="text-sm">
                <b>Khởi chiếu:</b> {item.release_date}
              </div>
              <div className="text-sm">
                <b>Thời lượng:</b> {item.duration} phút
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
