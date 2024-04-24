import React, { useEffect, useState } from "react";
import { fetcher } from "../../config";
import useSWR from "swr";

const ShowTimeList = ({ item }) => {
  if (!item || !item.id) {
    // Nếu không có item hoặc item không có thuộc tính id, không thể tiếp tục
    return null;
  }
  const { id } = item;
  const showtimeListApi = `http://localhost:3000/showtime?movie_id=${id}`;
  console.log(showtimeListApi);
  const [showtime, setShowtime] = useState([]);
  const { data } = useSWR(showtimeListApi, fetcher);
  useEffect(() => {
    if (data) setShowtime(data);
  }, [data]);
  return <div></div>;
};

export default ShowTimeList;
