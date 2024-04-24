import React, { useEffect, useState } from "react";
import Seat from "../components/seat/Seat";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";

const SeatPage = () => {
  const { theaterId } = useParams();
  console.log(theaterId);
  const showtimeApi = `http://localhost:3000/showtime?id=${theaterId}`;
  console.log(theaterId);
  const [selectedShowtime, setSelectedShowtime] = useState();
  const { data } = useSWR(showtimeApi, fetcher);
  useEffect(() => {
    if (data && data.length > 0) setSelectedShowtime(data);
  }, [data]);
  console.log(selectedShowtime);
  return <div></div>;
};

export default SeatPage;
