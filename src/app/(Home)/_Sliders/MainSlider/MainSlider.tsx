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
};

import sliderBg1 from "@images/sliderBg1.jpg";
import sliderBg2 from "@images/sliderBg2.jpg";
import sliderBg3 from "@images/sliderBg3.jpg";
import sliderBg4 from "@images/sliderBg4.jpg";
import sliderBg5 from "@images/sliderBg5.jpg";
import sliderBg6 from "@images/sliderBg6.jpg";
import sliderBg7 from "@images/sliderBg7.jpg";
import blog1 from "@images/blog1.jpg";
import blog2 from "@images/blog2.jpg";
const imgsList: string[] = [
  sliderBg1.src,
  sliderBg2.src,
  sliderBg3.src,
  sliderBg4.src,
  sliderBg5.src,
  sliderBg6.src,
  sliderBg7.src,
];
export default function MainSlider() {
  return (
    <div className="md:grid grid-cols-4 h-[200] md:h-[400] gap-1 px-5 rounded-2xl ">
      <div className="col-span-3 rounded-2xl">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 10000,
            disableOnInteraction: false, // Continue autoplay after user swipe
            pauseOnMouseEnter: true, // Pause on hover (optional)
          }}
          className={"rounded-l-2xl"}
        >
          {imgsList.map((src) => (
            <SwiperSlide key={src}>
              <figure className="relative h-[200] md:h-[400]">
                <Image
                  fill
                  src={src}
                  alt="anazon products"
                  className="select-none rounded-2xl md:rounded-l-2xl md:rounded-r-none"
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className=" hidden md:block col-span-1 rounded-2xl ">
        <Image
          draggable={"false"}
          src={blog1}
          alt="blog1"
          className="select-none w-full h-[100] md:h-[200] rounded-tr-2xl"
        />
        <Image
          draggable={"false"}
          src={blog2}
          alt="blog2"
          className="select-none w-full h-[100] md:h-[200] rounded-br-2xl"
        />
      </div>
    </div>
  );
}
