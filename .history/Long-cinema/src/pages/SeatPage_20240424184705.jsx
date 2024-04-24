import React, { useEffect, useState } from "react";
import "../components/seat/seat.css";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";

const SeatPage = () => {
  const { showtimeId } = useParams();
  const movieApi = "http://localhost:3000/movies/";
  const [movie, setMovie] = useState([]);
  const { data } = useSWR(
    movieApi.concat(selectedShowtime[0].movie_id),
    fetcher
  );
  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);
  console.log(movie);
  const theaterListApi = `http://localhost:3000/movietheater`;
  const [locations, setLocations] = useState({});
  const { data: listLocation } = useSWR(theaterListApi, fetcher);
  useEffect(() => {
    if (listLocation) {
      setLocations(listLocation);
    }
  }, [listLocation]);
  const showtimeApi = `http://localhost:3000/showtime?id=${showtimeId}`;
  const [selectedShowtime, setSelectedShowtime] = useState();
  const { data: showtime } = useSWR(showtimeApi, fetcher);
  useEffect(() => {
    if (showtime && showtime.length > 0) setSelectedShowtime(showtime);
  }, [showtime]);
  let locationId;
  let movie_id;
  if (selectedShowtime) {
    locationId = selectedShowtime[0].id;
  }
  const listTicketApi = `http://localhost:3000/ticket?showtime_id=${showtimeId}`;
  const [isSelectedSeat, setIsSelectedSeat] = useState([]);
  const { data: tickets } = useSWR(listTicketApi, fetcher);

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      const extractedSeatIds = tickets.map((item) => item.seat_id).flat();
      setIsSelectedSeat(extractedSeatIds);
    }
  }, [tickets]);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalMoney =
    selectedSeats.length * (selectedShowtime && selectedShowtime[0].price);

  const handleSeatClick = (seatId) => {
    const isSeatSelected = isSelectedSeat.includes(seatId);
    if (!isSeatSelected) {
      const isSeatSelected = selectedSeats.includes(seatId);

      if (isSeatSelected) {
        setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      } else {
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  const renderSeats = () => {
    return Array.from({ length: 60 }, (_, i) => i + 1).map((seatId) => {
      const isSeatSelected = isSelectedSeat.includes(seatId);
      const isSelected = selectedSeats.includes(seatId);

      return (
        <div
          key={seatId}
          onClick={() => handleSeatClick(seatId)}
          className={`seat ${
            isSelected ? "selected" : isSeatSelected ? "occupied" : ""
          }`}
        >
          {seatId}
        </div>
      );
    });
  };

  return (
    <div className="page-container">
      <div className="Cinema">
        <ShowCase></ShowCase>
        <div className="screen">
          <span className="text text-center">Màn hình chiếu</span>
        </div>
        <div className="seats text-center text-white">{renderSeats()}</div>
      </div>
      {selectedShowtime && (
        <div>
          <p>Rạp: {locations[locationId - 1].name}</p>
          <p>Ghế đã chọn: {selectedSeats.join(", ")}</p>
          <p>Tổng tiền: {totalMoney} VND</p>
        </div>
      )}
    </div>
  );
};

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>Có thể chọn</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Ghế đang chọn</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Ghế đã bán</small>
      </li>
    </ul>
  );
}

export default SeatPage;
