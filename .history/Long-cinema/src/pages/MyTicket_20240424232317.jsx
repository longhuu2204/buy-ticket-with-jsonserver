import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const userInfoFromStorage = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoFromStorage);
  useEffect(() => {
    if (userInfo.id) {
      axios
        .get(`http://localhost:3000/ticket?account_id=${userInfo.id}`)
        .then((response) => {
          setTickets(response.data);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi lấy vé:", error);
        });
    }
  }, [userInfo]);

  return (
    <div className="page-container">
      {tickets.map((ticket) => (
        <TicketComponent key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
const TicketComponent = ({ ticket }) => {
  return (
    <div key={ticket.id}>
      <div className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]">
        <div className="popup text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-gray-300 shadow-lg z-50">
          <div className="popup">
            <h2>Thông Tin Vé</h2>
            <p>Phim: {ticket.movie_name}</p>
            <p>Rạp: {ticket.location_id}</p>
            <p>Sảnh: {ticket.hall_í}</p>
            <p>Ghế: {ticket.seat_id.join(", ")}</p>
            <p>Tổng tiền: {ticket.total} VND</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketList;
