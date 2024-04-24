import React from "react";

const ShowTimeList = () => {
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
