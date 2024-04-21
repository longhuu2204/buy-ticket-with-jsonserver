import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useSWR from "swr";
import { fetcher } from "../../config";
const Banner = () => {
  const bannerApi = "http://localhost:3000/banner";
  const [banners, setBanners] = useState([]);
  const { data } = useSWR(bannerApi, fetcher);
  useEffect(() => {
    if (data) setBanners(data);
  }, [data]);
  return (
    <section className="banner h-[500px] mb-20 overflow-hidden">
      <Swiper
        grabCursor="true"
        slidesPerView={"auto"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1500}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >{banners.length>0&&banners.map((item)=>)</Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { id, poster } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.2)] rounded-lg"></div>
      <img
        src={`${poster}`}
        alt=""
        className="w-full h-full rounded-lg object-cover"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex gap-x-5 mb-10">
          <MovieGenres movieId={id}></MovieGenres>
        </div>
        <Button onClick={() => navigate(`/movies/${id}`)} bgColor="primary">
          Watch Now
        </Button>
      </div>
    </div>
  );
}
export default Banner;
