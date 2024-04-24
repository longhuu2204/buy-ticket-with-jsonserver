import React, { useEffect, useState } from "react";
import { fetcher } from "../../config";
import useSWR from "swr";

const ShowTimeList = ({ item, handleClosePopupClick }) => {
  const { id } = item;
  const showtimeListApi = `http://localhost:3000/showtime?movie_id=${id}`;
  console.log(showtimeListApi);
  const [showtime, setShowtime] = useState([]);
  const { data } = useSWR(showtimeListApi, fetcher);
  useEffect(() => {
    if (data) setShowtime(data);
  }, [data]);
  return (
    <div>
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={handleClosePopupClick}>
            &times;
          </span>
          <p>Nội dung của Popup ở đây.</p>
          {/* Hiển thị danh sách thời gian chiếu */}
          <ul>
            {showtime.map((item, index) => (
              <li key={index}>{item.time}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShowTimeList;
