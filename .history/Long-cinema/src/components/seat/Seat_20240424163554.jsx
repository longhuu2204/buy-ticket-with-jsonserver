import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../config";
const Seat = () => {
  const { theaterId } = useParams();
  const showtimeApi = `http://localhost:3000/showtime?id=${theaterId}`;
  const [selectedShowtime, setSelectedShowtime] = useState();
  const { data } = useSWR(showtimeApi, fetcher);
  useEffect(() => {
    if (data && data.length > 0) setSelectedShowtime(data);
  }, [data]);
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
