import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/tickets?userId=${userId}`)
        .then((response) => {
          setTickets(response.data);
        })
        .catch((error) => {
          console.error("Đã xảy ra lỗi khi lấy vé:", error);
        });
    }
  }, [userId]);

  return (
    <div>
      {tickets.map((ticket) => (
        <TicketComponent ticket={ticket} />
      ))}
    </div>
  );
};
const TicketComponent = ({ ticket }) => {
  return (
    <div key={ticket.id}>
      <p>Phim: {ticket.movie}</p>
      <p>Rạp: {ticket.location}</p>
      <p>Sảnh: {ticket.room}</p>
      <p>Ghế: {ticket.seats.join(", ")}</p>
      <p>Tổng tiền: {ticket.totalMoney} VND</p>
    </div>
  );
};
export default TicketList;
