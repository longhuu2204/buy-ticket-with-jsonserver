import React, { useEffect, useState } from "react";
import "../components/seat/seat.css";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Button from "../components/button/Button";
import axios from "axios";

const SeatPage = () => {
  const { showtimeId } = useParams();
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
    movie_id = selectedShowtime[0].movie_id;
  }
  const movieApi = "http://localhost:3000/movies/";
  const [movie, setMovie] = useState([]);
  const { data } = useSWR(movieApi.concat(movie_id), fetcher);
  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);
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
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);
  const openPaymentPopup = () => {
    setIsPaymentPopupOpen(true);
  };

  const closePaymentPopup = () => {
    setIsPaymentPopupOpen(false);
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
        <div className="flex gap-x-5">
          <div className="inline-block">
            <p>Phim: {movie.name}</p>
            <p>Rạp: {locations[locationId - 1].name}</p>
            <p>Sảnh: {selectedShowtime[0].room_id}</p>
          </div>
          <div className="w-[400px]">
            Ghế đã chọn: {selectedSeats.join(", ")}
          </div>
          <div className="">
            <p className="flex-1">Tổng tiền: {totalMoney} VND</p>
            <Button
              disabled={selectedSeats.length === 0}
              onClick={openPaymentPopup}
              bgColor={selectedSeats.length === 0 ? "disabled" : ""}
            >
              Thanh Toán
            </Button>
            {isPaymentPopupOpen && (
              <PaymentPopup
                movieName={movie.name}
                locationName={locations[locationId - 1].name}
                roomName={selectedShowtime[0].room_id}
                selectedSeats={selectedSeats}
                totalMoney={totalMoney}
                onClose={closePaymentPopup}
                showtimeId={selectedShowtime[0].id}
              />
            )}
          </div>
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
const PaymentPopup = ({
  movieName,
  locationName,
  roomName,
  selectedSeats,
  totalMoney,
  onClose,
  showtimeId,
  accountId = 1,
}) => {
  const confirmPayment = () => {
    axios
      .post("http://localhost:3000/tickets", {
        showtime_id: showtimeId,
        account_id: accountId,
        seat_id: selectedSeats,
      })
      .then((response) => {
        console.log("Vé đã được gửi thành công!", response.data);
        // Đặt state để hiển thị thông báo thành công
        setIsPaymentSuccess(true);
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gửi vé:", error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]">
      <div className="popup text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-gray-300 shadow-lg z-50">
        <div className="popup">
          <h2>Thông Tin Đặt Vé</h2>
          <p>Phim: {movieName}</p>
          <p>Rạp: {locationName}</p>
          <p>Phòng: {roomName}</p>
          <p>Ghế Đã Chọn: {selectedSeats.join(", ")}</p>
          <p>Tổng Tiền: {totalMoney} VND</p>
          <Button onClick={confirmPayment} className="mr-5">
            Xác nhận
          </Button>

          <Button onClick={onClose}>Đóng</Button>
        </div>
      </div>
    </div>
  );
};

export default SeatPage;
