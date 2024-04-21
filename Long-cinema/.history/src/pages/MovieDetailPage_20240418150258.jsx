import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import Button from "../components/button/Button";

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
  const genre_format = genre.join(", ");
  return (
    <div className="page-container">
      <h1 className="text-3xl w-full border-b-2 pb-6 mt-9 border-black ">
        Movie Details
      </h1>
      <div className="page-content mt-6 flex">
        <div className="movie__img w-[181px] h-[270px]">
          <img src={`${poster}`} alt={`${name}`} />
        </div>
        <div className="movie__info ml-6 flex-1 relative">
          <h2 className="movie__name border-b-2 text-3xl w-full">{`${name}`}</h2>
          <div>
            <b>Đạo diễn:</b> {`${director}`}
          </div>
          <div>
            <b>Diễn viên:</b> {`${cast}`}
          </div>

          <div>
            <b>Thể loại:</b> {`${genre_format}`}
          </div>
          <div>
            <b>Khởi chiếu:</b> {`${release_date}`}
          </div>
          <div>
            <b>Thời lượng:</b> {`${duration}`} phút
          </div>
          <div>
            <b>Mô tả:</b> Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Ad ipsam dolorem hic quod asperiores architecto quisquam ut
            ullam vel. Magnam voluptas molestias quas quidem sunt rem maiores
            modi aliquid cupiditate?
          </div>
          <Button
            className={"flex gap-x-1 absolute bottom-0 left-0 mb-3 text-white"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            MUA VÉ
          </Button>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default MovieDetailPage;
