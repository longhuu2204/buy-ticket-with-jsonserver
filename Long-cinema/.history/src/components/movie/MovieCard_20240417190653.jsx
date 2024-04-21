import React from "react";

const MovieCard = ({ item }) => {
  const { id, name, poster, genre, trailer, duration, release_date } = item;
  return (
    <div className="w-[240px] h-[350px] relative">
      <img
        src={`${poster}`}
        alt={`${name}`}
        className="w-full h-full object-fill"
      />
      <div className="hidden hover:block overlay absolute inset-0 bg-gradient-to-t from-[rgb(0,0,0)] to-[rgb(0,0,0)]"></div>
    </div>
  );
};

export default MovieCard;
