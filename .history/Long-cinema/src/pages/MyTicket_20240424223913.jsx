import React from "react";

const MyTicket = () => {
  return <div>
  <div className="font-bold text-lg text-white bg-black mb-5">
          <div className="bg-ticket-dot bg-repeat-x overflow-hidden w-full h-[4px] rotate-180"></div>
          <div className="flex gap-x-5 py-3 px-5">
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
              </div></div>;
};

export default MyTicket;
