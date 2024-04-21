import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/swiper-bundle.min.css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import useSWR from "swr";
import { fetcher } from "../../config";
const Banner = () => {
  const bannerApi = "http://localhost:3000/banner";
  const [banners, setBanners] = useState([]);
  const { data } = useSWR(bannerApi, fetcher);
  useEffect(() => {
    if (data && data.length) setBanners(data);
  }, [data]);
  return (
    <section className="banner h-[450px] mb-20 overflow-hidden mx-auto bg-banner-bg-img flex justify-center">
      <div className="w-[980px]">
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
        >
          {banners.length > 0 &&
            banners.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </section>
  );
};
function BannerItem({ item }) {
  const { img } = item;
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0]"></div>
      <img src={`${img}`} alt="" className="w-full h-full  object-cover" />
    </div>
  );
}
export default Banner;
