// import { Fragment } from "react";
// import Header from "./components/layout/Header";
// import Banner from "./components/banner/Banner";
// import Advertisement from "./components/advertisement/ads";
// import MovieList from "./components/movie/MovieList";
// export default function App() {
//   return (
//     <Fragment>
//       <div className="mx-auto bg-[#fdfcf0] overflow-hidden">
//         <Header></Header>
//         <Banner></Banner>
//         <MovieList></MovieList>
//         <Advertisement></Advertisement>
//       </div>
//     </Fragment>
//   );
// }
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation]);

function App() {
  const swiperRef = useRef(null);
  const [controlMethod, setControlMethod] = useState("buttons");

  const handleSlideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleControlMethodChange = (method) => {
    setControlMethod(method);
  };

  return (
    <div>
      <div>
        <button onClick={handleSlidePrev}>Prev</button>
        <button onClick={handleSlideNext}>Next</button>
        <button onClick={() => handleControlMethodChange("buttons")}>
          Buttons
        </button>
        <button onClick={() => handleControlMethodChange("swipe")}>
          Swipe
        </button>
      </div>

      <Swiper
        ref={swiperRef}
        navigation={
          controlMethod === "swipe"
            ? {}
            : { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
        }
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>

      {controlMethod === "buttons" && (
        <div>
          <button className="swiper-button-prev" onClick={handleSlidePrev}>
            Prev
          </button>
          <button className="swiper-button-next" onClick={handleSlideNext}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
