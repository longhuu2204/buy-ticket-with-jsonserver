import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const Banner = () => {
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
      ></Swiper>
    </section>
  );
};

export default Banner;
