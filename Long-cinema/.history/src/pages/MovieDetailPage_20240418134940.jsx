import React from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil ratione
      numquam iste excepturi autem nisi cum quaerat unde incidunt aliquam, a
      quibusdam odio et tenetur deleniti nobis dolorem voluptatum sunt!
    </div>
  );
};

export default MovieDetailPage;
