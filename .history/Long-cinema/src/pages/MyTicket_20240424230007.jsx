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
    <div>
      {tickets.map((ticket) => (
        <TicketComponent key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
const TicketComponent = ({ ticket }) => {
  //   return (
  //     // <div key={ticket.id}>
  //     //   <p>Phim: {ticket.movie}</p>
  //     //   <p>Rạp: {ticket.location}</p>
  //     //   <p>Sảnh: {ticket.room}</p>
  //     //   <p>Ghế: {ticket.seats.join(", ")}</p>
  //     //   <p>Tổng tiền: {ticket.totalMoney} VND</p>
  //     // </div>
  //   );
};
export default TicketList;
