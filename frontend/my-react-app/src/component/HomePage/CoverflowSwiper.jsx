import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import CardHome from "./CardHome"
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import './Swiper-slide.css'
// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";


function CoverflowSwiper({ games }) {
  return (
    <Swiper
      effect={"coverflow"}
      centeredSlides={true}
      initialSlide={5}
      loop={true}
      slidesPerView={4}
      spaceBetween={20}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true,
      }}
      autoplay={{
        delay: 3000, // Thời gian giữa các lần chuyển (3 giây)
        disableOnInteraction: false,
      }}

      modules={[EffectCoverflow, Pagination, Autoplay]}
    >
      {games.map((game) => {
        return (
          <SwiperSlide key={game._id}  className="custom-swiper-slide mx-14 h-96 ">
          <CardHome  game={game} />
        </SwiperSlide>
        )
      })}
    </Swiper>
  );
}

export default CoverflowSwiper;
