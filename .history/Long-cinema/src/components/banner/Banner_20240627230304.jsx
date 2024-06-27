import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchBanners } from "../../redux-toolkit/bannerSlice";

const Banner = () => {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.banners.banners);
  const { status } = useSelector((state) => state.banners);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBanners());
    }
  }, [status, dispatch]);

  return (
    <section className="banner h-[450px] mb-20 overflow-hidden mx-auto bg-banner-bg-img flex justify-center">
      <div className="page-container flex justify-center">
        <Swiper
          grabCursor="true"
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1500}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="mySwiper"
        >
          {banners.length > 0 &&
            banners.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            ))}
          <div className="swiper-button-prev !text-white"></div>
          <div className="swiper-button-next !text-white"></div>
        </Swiper>
      </div>
    </section>
  );
};

function BannerItem({ item }) {
  const { img } = item;
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0"></div>
      <a href="">
        <img src={`${img}`} alt="" className="w-full h-full  object-cover" />
      </a>
    </div>
  );
}

export default Banner;
