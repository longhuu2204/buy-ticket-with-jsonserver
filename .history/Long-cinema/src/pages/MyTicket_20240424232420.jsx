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
      <div className="font-bold text-lg text-white bg-black mb-5">
        <div className="bg-ticket-dot bg-repeat-x overflow-hidden w-full h-[4px] rotate-180"></div>
        <div className="flex gap-x-5 py-3 px-5">
          <div className="inline-block">
            <h2>Thông Tin Vé</h2>
            <p>Phim: {ticket.movie_name}</p>
            <p>Rạp: {ticket.location_id}</p>
            <p>Sảnh: {ticket.hall_id}</p>
            <p>Ghế: {ticket.seat_id.join(", ")}</p>
            <p>Tổng tiền: {ticket.total} VND</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TicketList;
