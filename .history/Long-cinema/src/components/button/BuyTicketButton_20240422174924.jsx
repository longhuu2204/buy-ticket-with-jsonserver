import React, { useEffect, useState } from "react";
import Button from "./Button";
import useSWR from "swr";
import { fetcher } from "../../config";

const BuyTicketButton = ({ item }) => {
  const { id } = item;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const showtimeListApi = `http://localhost:3000/showtime?movie=${id}`;
  const [showtime, setShowtime] = useState([]);
  const { data } = useSWR(showtimeListApi, fetcher);
  useEffect(() => {
    if (data) setShowtime(data);
  }, [data]);
  console.log(showtime);
  const HandleBuyTicketClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopupClick = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
      <Button className="display: flex gap-x-1" onClick={HandleBuyTicketClick}>
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
      {/* Popup */}
      {isPopupOpen && (
        <div className="popup">
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

export default BuyTicketButton;
