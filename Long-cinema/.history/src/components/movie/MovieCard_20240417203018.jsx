import React from "react";

const MovieCard = ({ item }) => {
  const { id, name, poster, genre, trailer, duration, release_date } = item;
  return (
    <div className="moviecard-container w-[240px] h-[350px] relative">
      <img
        src={`${poster}`}
        alt={`${name}`}
        className="w-full h-full object-fill movie-img"
      />
      <div className="overlay flex flex-col justify-end">
        <div className="play-trailer flex-1 text-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </div>
        <div className="card__detail w-full h-[100px]">
          <div className="card__name text-white font-bold text-center line-clamp-1">{`${name}`}</div>
          <div className="flex">
            <div className="detail"></div>
            <div className="buy-ticket"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
