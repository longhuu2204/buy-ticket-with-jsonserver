import React, { useEffect, useState } from "react";
import Seat from "../components/seat/Seat";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";

const SeatPage = () => {
  const { showtimeId } = useParams();
  const showtimeApi = `http://localhost:3000/showtime?id=${showtimeId}`;
  const [selectedShowtime, setSelectedShowtime] = useState();
  const { data: showtime } = useSWR(showtimeApi, fetcher);
  useEffect(() => {
    if (showtime && showtime.length > 0) setSelectedShowtime(showtime);
  }, [showtime]);
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
  const totalMoney = selectedSeats.length * showtime.price;
  const totalQuantity = selectedSeats.length;
  const seats = Array.from({ length: 60 }, (_, i) => i);

  function Cinema({ showtime, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat, key) {
      const isSelected = selectedSeats.includes(seat);
      if (isSelected) {
        onSelectedSeatsChange(
          selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        );
        setIsSelectedSeat(false);
      } else {
        onSelectedSeatsChange([...selectedSeats, seat]);
        setIsSelectedSeat(true);
      }
    }

    return (
      <div className="Cinema">
        <div className="screen">
          <span className="text">Màn hình chiếu</span>
        </div>
        <div className="seats">
          {seats.map((seat, key) => {
            const isSelected = selectedSeats.includes(seat);
            const isOccupied = movie.occupied.includes(seat);
            return (
              <div>
                <span
                  tabIndex="0"
                  key={seat}
                  className={clsx(
                    "seat",
                    isSelected && "selected",
                    isOccupied && "occupied"
                  )}
                  onClick={
                    isOccupied
                      ? null
                      : () => {
                          handleSelectedState(seat, key);
                        }
                  }
                  onKeyPress={
                    isOccupied
                      ? null
                      : (e) => {
                          if (e.key === "Enter") {
                            handleSelectedState(seat, key);
                          }
                        }
                  }
                >
                  {key + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default SeatPage;
