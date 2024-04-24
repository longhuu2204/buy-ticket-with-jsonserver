import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";

const ShowtimeList = ({ showtimes }) => {
  // Kiểm tra xem showtimes có tồn tại không
  if (!showtimes || showtimes.length === 0) {
    return null;
  }

  return (
    <div>
      {showtimes.map((location, index) => (
        <div key={index}>
          <h2>Địa điểm {index + 1}</h2>
          <ul>
            {location.map((item, index) => (
              <li key={index}>{item.time}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const BuyTicketButton = ({ item }) => {
  const [showtimes, setShowtimes] = useState([]);

  const handleBuyTicketClick = async () => {
    if (item && item.id) {
      const showtimeListApi = `http://localhost:3000/showtime?movie_id=${item.id}`;
      const { data } = await fetcher(showtimeListApi);

      // Xử lý dữ liệu để xếp theo địa điểm
      const sortedShowtimes = sortByLocation(data);
      setShowtimes(sortedShowtimes);
    }
  };

  const sortByLocation = (showtimes) => {
    const sortedShowtimes = [];

    // Tạo một mảng 2 chiều và xếp theo location
    showtimes.forEach((showtime) => {
      if (!sortedShowtimes[showtime.location]) {
        sortedShowtimes[showtime.location] = [];
      }
      sortedShowtimes[showtime.location].push(showtime);
    });

    return sortedShowtimes;
  };

  return (
    <div>
      <button onClick={handleBuyTicketClick}>Mua vé</button>
      {/* Hiển thị danh sách thời gian chiếu */}
      <ShowtimeList showtimes={showtimes} />
    </div>
  );
};

export default BuyTicketButton;
