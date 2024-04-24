import React, { useEffect, useRef } from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { id, name, poster, genre, trailer, duration, release_date } = item;

  // Trạng thái của popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  // Xử lý khi nhấn nút "MUA VÉ"
  const handleBuyTicketClick = () => {
    setIsPopupOpen(true);
  };

  // Xử lý khi nhấn nút đóng trong popup
  const handleClosePopupClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsPopupOpen(false);
    }
  };
  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("click", handleClosePopupClick);
    } else {
      document.removeEventListener("click", handleClosePopupClick);
    }
    return () => {
      document.removeEventListener("click", handleClosePopupClick);
    };
  }, [isPopupOpen]);
  return (
    <div className="moviecard-container w-[240px] h-[350px] relative mb-5">
      <img
        src={`${poster}`}
        alt={`${name}`}
        className="w-full h-full object-fill movie-img"
      />
      <div className="overlay flex flex-col justify-end">
        <div className="play-trailer flex-1 text-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-12 h-12 cursor-pointer rounded-md bg-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
            />
          </svg>
        </div>
        <div className="card__detail w-full h-[90px] bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]">
          <div className="card__name text-white font-bold text-center line-clamp-1 mb-2">{`${name}`}</div>
          <div className="flex gap-x-2 justify-center  text-slate-100">
            <Button onClick={() => navigate(`/movies/${id}`)}>
              XEM CHI TIẾT
            </Button>
            <Button
              className="display: flex gap-x-1"
              onClick={handleBuyTicketClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                />
              </svg>
              MUA VÉ
            </Button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="popup" ref={popupRef}>
          <div className="popup-content">
            <span className="close" onClick={handleClosePopupClick}>
              &times;
            </span>
            <p>Nội dung của Popup ở đây.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
