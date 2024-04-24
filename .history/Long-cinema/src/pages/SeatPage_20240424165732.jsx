import React, { useEffect, useState } from "react";
import Seat from "../components/seat/Seat";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";

const SeatPage = () => {
  const { showtimeId } = useParams();
  const showtimeApi = `http://localhost:3000/showtime?id=${showtimeId}`;
  const [selectedShowtime, setSelectedShowtime] = useState();
  const { data } = useSWR(showtimeApi, fetcher);
  useEffect(() => {
    if (data && data.length > 0) setSelectedShowtime(data);
  }, [data]);
  const listTicketApi = `http://localhost:3000/ticket?showtime_id=${showtimeId}`;
  const [isSelectedSeat, setIsSelectedSeat] = useState();
  const { data: tickets } = useSWR(listTicketApi, fetcher);
  useEffect(() => {
    if (tickets && tickets.length > 0) {
      const extractedSeatIds = tickets.map((booking) => booking.seat_id).flat();
      setIsSelectedSeat(extractedSeatIds);
    }
  });
  return <div></div>;
};

export default SeatPage;
