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

  // Handler khi người dùng chọn một ghế
  const handleSeatClick = (seatId) => {
    // Kiểm tra xem ghế đã được mua chưa
    const isSeatSelected = isSelectedSeat.includes(seatId);
    if (!isSeatSelected) {
      // Kiểm tra xem ghế đã được chọn chưa
      const isSeatSelected = selectedSeats.includes(seatId);

      if (isSeatSelected) {
        // Nếu ghế đã được chọn, hãy loại bỏ nó khỏi danh sách ghế đã chọn
        setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      } else {
        // Nếu ghế chưa được chọn, hãy thêm nó vào danh sách ghế đã chọn
        setSelectedSeats([...selectedSeats, seatId]);
      }
    }
  };

  // Hiển thị danh sách ghế
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
          // Disable ghế nếu đã mua
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
