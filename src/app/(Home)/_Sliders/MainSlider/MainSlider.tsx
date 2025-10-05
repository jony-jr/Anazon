"use client";
import MySwiper from "@/app/_Components/MySwiper/MySwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import Image from "next/image";
type swiperType = {
  imgsList: string[];
  spaceBetween?: number;
  slidesPerView?: number;
  isMain?: boolean;
  imgAlt?: string;
};


export default function MainSlider({ imgsList, isMain = false,spaceBetween=20, slidesPerView=1, imgAlt = "anazon products" }: swiperType) {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      modules={[Autoplay]}
      loop
      autoplay={{
        delay: 10000,
        disableOnInteraction: false, // Continue autoplay after user swipe
        pauseOnMouseEnter: true, // Pause on hover (optional)
      }}
      className={`${isMain&&'rounded-l-2xl'} `}
    >
      {imgsList.map((src) => (
        <SwiperSlide key={src}>
          <figure className="relative h-[200] md:h-[400]">
            <Image
              fill
              src={src}
              alt={imgAlt}
              className={`select-none ${isMain && ' rounded-2xl md:rounded-l-2xl md:rounded-r-none'} `}
              sizes="(max-width: 768px) 100vw, 50vw" // Adjust based on your layout
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>



  );
}
