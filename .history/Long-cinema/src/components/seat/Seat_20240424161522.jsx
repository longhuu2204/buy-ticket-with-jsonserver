import React, { useState } from "react";
const Seat = () => {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isSelectedSeat, setIsSelectedSeat] = useState(false);
  const totalMoney = selectedSeats.length * selectedMovie.price;
  const totalQuantity = selectedSeats.length;

  return <div></div>;
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

export default Seat;
