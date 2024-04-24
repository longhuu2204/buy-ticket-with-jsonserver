import React, { useEffect, useState } from "react";
import Seat from "../components/seat/Seat";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";

const SeatPage = () => {
  const { showtimeId } = useParams();
  const showtimeApi = `http://localhost:3000/showtime?id=${showtimeId}`;
  const [selectedShowtime, setSelectedShowtime] = useState();
  const { data: showtime } = useSWR(showtimeApi, fetcher);

  useEffect(() => {
    if (showtime && showtime.length > 0) setSelectedShowtime(showtime);
  }, [showtime]);

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
  const totalMoney = selectedSeats.length * (showtime && showtime.price); // Kiểm tra showtime trước khi truy cập price
  const totalQuantity = selectedSeats.length;

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
          style={{
            background: isSelected ? "green" : isSeatSelected ? "red" : "grey",
            width: "50px",
            height: "50px",
            margin: "5px",
            cursor: isSeatSelected ? "not-allowed" : "pointer",
          }}
          disabled={isSeatSelected}
        >
          {seatId}
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Chọn ghế:</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{renderSeats()}</div>
      <div>
        <p>Tổng tiền: {totalMoney}</p>
        <p>Số lượng ghế đã chọn: {totalQuantity}</p>
      </div>
    </div>
  );
};

export default SeatPage;
