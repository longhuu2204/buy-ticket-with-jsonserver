import React, { useEffect, useState } from "react";
import { fetcher } from "../../config";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

const ShowTimeList = ({ item, handleClosePopupClick }) => {
  const { id, location } = item;
  const navigate = useNavigate();
  const showtimeListApi = `http://localhost:3000/showtime?movie_id=${id}`;
  const theaterListApi = `http://localhost:3000/movietheater`;
  const { data: listLocation } = useSWR(theaterListApi, fetcher);
  const [locations, setLocations] = useState({});
  const [showtimesByLocation, setShowtimesByLocation] = useState({});
  const { data } = useSWR(showtimeListApi, fetcher);
  useEffect(() => {
    if (data) {
      const sortedShowtimes = sortByLocation(data);
      setShowtimesByLocation(sortedShowtimes);
    }
  }, [data]);
  useEffect(() => {
    if (listLocation) {
      setLocations(listLocation);
    }
  }, [listLocation]);
  if (locations && locations.length > 0) console.log(locations[0].name);
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
    <div className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gradient-to-br from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]">
      <div className="popup text-black fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border border-gray-300 shadow-lg z-50">
        <div className="popup-content !max-h-[80vh] !max-w-[90vw] overflow-y-auto w-[1280px] h-[600px]">
          <span
            className="close absolute top-2 right-2 cursor-pointer"
            onClick={handleClosePopupClick}
          >
            &times;
          </span>
          {/* Hiển thị danh sách thời gian chiếu */}
          {Object.keys(showtimesByLocation).map((location) => (
            <div key={location}>
              <h3 className="text-xl font-bold mb-4">
                Địa điểm {locations[location - 1]?.name}
              </h3>
              <ul>
                {showtimesByLocation[location].map((item) => (
                  <li
                    key={item.id}
                    className="mb-2 cursor-pointer border inline-block mr-4 py-2 px-4 rounded-sm"
                    onClick={() => navigate(`/movies/${id}/booking`)}
                  >
                    {item.time}
                  </li>
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
