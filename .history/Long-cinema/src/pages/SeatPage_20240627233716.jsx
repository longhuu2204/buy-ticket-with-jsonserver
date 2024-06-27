import React, { useEffect, useState } from "react";
import "../components/seat/seat.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetcher } from "../config";
import useSWR from "swr";
import Button from "../components/button/Button";
import axios from "axios";
import { setMovies } from "../redux/moviesSlice";

const SeatPage = () => {
  const { showtimeId } = useParams();
  const theaterListApi = `http://localhost:3000/movietheater`;
  const { data: listLocation } = useSWR(theaterListApi, fetcher);
  const dispatch = useDispatch();

  useEffect(() => {
    if (listLocation) {
      // Nếu dữ liệu listLocation đã có, dispatch action để lưu vào Redux
      dispatch(setMovies(listLocation));
    }
  }, [dispatch, listLocation]);

  const selectedShowtime = useSelector((state) => state.movies.movies.find((item) => item.id === showtimeId));

  const movieApi = "http://localhost:3000/movies/";
  const { data: movie } = useSWR(movieApi.concat(selectedShowtime?.movie_id), fetcher);

  const listTicketApi = `http://localhost:3000/ticket?showtime_id=${showtimeId}`;
  const { data: tickets } = useSWR(listTicketApi, fetcher);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatId)) {
        return prevSeats.filter((id) => id !== seatId);
      } else {
        return [...prevSeats, seatId];
      }
    });
  };

  const totalMoney = selectedSeats.length * (selectedShowtime?.price || 0);

  const openPaymentPopup = () => {
    setIsPaymentPopupOpen(true);
  };

  const closePaymentPopup = () => {
    setIsPaymentPopupOpen(false);
  };

  const confirmPayment = () => {
    axios
      .post("http://localhost:3000/ticket", {
        showtime_id: showtimeId,
        account_id: userInfo.id,
        seat_id: selectedSeats,
        movie_name: movie?.name,
        hall_id: selectedShowtime?.room_id,
        location_id: selectedShowtime?.location_id,
        total: totalMoney,
      })
      .then((response) => {
        alert("Vé đã được gửi thành công!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gửi vé:", error);
      });
  };

  const renderSeats = () => {
    return Array.from({ length: 60 }, (_, i) => i + 1).map((seatId) => {
      const isSeatSelected = tickets?.some((item) => item.seat_id === seatId);
      const isSelected = selectedSeats.includes(seatId);

      return (
        <div
          key={seatId}
          onClick={() => handleSeatClick(seatId)}
          className={`seat ${isSelected ? "selected" : isSeatSelected ? "occupied" : ""}`}
        >
          {seatId}
        </div>
      );
    });
  };

  return (
    <div className="page-container">
      <div className="Cinema">
        <ShowCase />
        <div className="screen">
          <span className="text text-center">Màn hình chiếu</span>
        </div>
        <div className="seats text-center text-white">{renderSeats()}</div>
      </div>
      {selectedShowtime && (
        <div className="font-bold text-lg text-white bg-slate-500 mb-5">
          <div className="bg-ticket-dot bg-repeat-x overflow-hidden w-full h-[4px] rotate-180"></div>
          <div className="flex gap-x-5 py-3 px-5">
            <div className="inline-block">
              <p>Phim: {movie?.name}</p>
              <p>Rạp: {selectedShowtime.location_id}</p>
              <p>Sảnh: {selectedShowtime.room_id}</p>
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
                  movieName={movie?.name}
                  locationName={selectedShowtime.location_id}
                  roomName={selectedShowtime.room_id}
                  selectedSeats={selectedSeats}
                  totalMoney={totalMoney}
                  onClose={closePaymentPopup}
                  showtimeId={showtimeId}
                  accountId={userInfo.id}
                />
              )}
            </div>
          </div>
          <div className="bg-ticket-dot bg-repeat-x overflow-hidden w-full h-[4px]"></div>
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
  accountId,
}) => {
  const confirmPayment = () => {
    axios
      .post("http://localhost:3000/ticket", {
        showtime_id: showtimeId,
        account_id: accountId,
        seat_id: selectedSeats,
        movie_name: movieName,
        hall_id: roomName,
        location_id: locationName,
        total: totalMoney,
      })
      .then((response) => {
        alert("Vé đã được gửi thành công!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gửi vé:", error);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,
