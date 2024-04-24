import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";
import Button from "../components/button/Button";
import BuyTicketButton from "../components/button/BuyTicketButton";

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
          <div className="line-clamp-2">
            <b>Mô tả:</b> Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Ad ipsam dolorem hic quod asperiores architecto quisquam ut
            ullam vel. Magnam voluptas molestias quas quidem sunt rem maiores
            modi aliquid cupiditate?
          </div>
          <div className="text-white">
            <BuyTicketButton item={data}></BuyTicketButton>
          </div>
        </div>
      </div>
      <div className=" flex justify-center aspect-video w-full">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDetailPage;
