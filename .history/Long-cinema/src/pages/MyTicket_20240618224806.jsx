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

  const handleCancelTicket = (ticketId) => {
    axios
      .delete(`http://localhost:3000/ticket/${ticketId}`)
      .then(() => {
        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi hủy vé:", error);
      });
  };

  return (
    <div className="page-container">
      {tickets.map((ticket) => (
        <TicketComponent
          key={ticket.id}
          ticket={ticket}
          onCancel={() => handleCancelTicket(ticket.id)}
        />
      ))}
    </div>
  );
};

const TicketComponent = ({ ticket, onCancel }) => {
  return (
    <div>
      <div className="font-bold text-lg text-white bg-slate-500 mb-5">
        <div className="bg-ticket-dot bg-repeat-x overflow-hidden w-full h-[4px] rotate-180"></div>
        <div className="flex gap-x-5 py-3 px-5">
          <div className="inline-block">
            <p>Phim: {ticket.movie_name}</p>
            <p>Rạp: {ticket.location_id}</p>
            <p>Sảnh: {ticket.hall_id}</p>
          </div>
          <div className="w-[400px]">
            Ghế đã chọn: {ticket.seat_id.join(", ")}
          </div>
          <div>
            <p className="flex-1">Tổng tiền: {ticket.total} VND</p>
          </div>
          <div>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Hủy vé
            </button>
          </div>
        </div>
        <div className="bg-ticket-dot bg-repeat-x overflow-hidden w-full h-[4px]"></div>
      </div>
    </div>
  );
};

export default TicketList;
