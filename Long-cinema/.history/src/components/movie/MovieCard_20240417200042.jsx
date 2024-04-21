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
      <div className="overlay">
        <div className="play-trailer"></div>
        <div className="card__detail">
          <div className="card__name"></div>
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
