import React from "react";

const MovieCard = ({ item }) => {
  const { id, name, poster, genre, trailer, duration, release_date } = item;
  return (
    <div className="w-[240px] h-[350px]">
      <img
        src={`${poster}`}
        alt={`${name}`}
        className="w-full h-full object-fill"
      />
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.2)]"></div>
    </div>
  );
};

export default MovieCard;
