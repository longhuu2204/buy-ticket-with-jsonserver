import React, { useEffect, useState } from "react";
import { fetcher } from "../../config";
import useSWR from "swr";

const ShowTimeList = ({ item, handleClosePopupClick }) => {
  const { id } = item;
  const showtimeListApi = `http://localhost:3000/showtime?movie_id=${id}`;
  const [showtimesByLocation, setShowtimesByLocation] = useState({});
  const { data } = useSWR(showtimeListApi, fetcher);
  useEffect(() => {
    if (data) {
      const sortedShowtimes = sortByLocation(data);
      setShowtimesByLocation(sortedShowtimes);
    }
  }, [data]);
  const sortByLocation = (showtimes) => {
    const sortedShowtimes = {};
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
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleClosePopupClick}>
            &times;
          </span>
          <p>Nội dung của Popup ở đây.</p>
          {/* Hiển thị danh sách thời gian chiếu */}
          <ul className="text-black">
            {showtime.map((item) => (
              <li key={item.id}>{item.time}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowTimeList;
