import React, { useEffect, useState } from "react";
import { fetcher } from "../../config";
import useSWR from "swr";

const ShowTimeList = ({ item, handleClosePopupClick }) => {
  const { id, location } = item;
  const showtimeListApi = `http://localhost:3000/showtime?movie_id=${id}`;
  const theaterListApi = `http://localhost:3000/movietheater`;
  const { data: locations } = useSWR(theaterListApi, fetcher);
  console.log(locations[0]);
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
          {Object.keys(showtimesByLocation).map((location) => (
            <div key={location}>
              <h3>Địa điểm {location}</h3>
              <ul className="text-black">
                {showtimesByLocation[location].map((item) => (
                  <li key={item.id}>{item.time}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowTimeList;
