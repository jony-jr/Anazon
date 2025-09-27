"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import Image from "next/image";
import { categoryType, productType } from "@/app/_interfaces/products.type";
import Link from "next/link";
type swiperType = {
  categoryList: categoryType[];
  spaceBetween?: number;
  slidesPerView?: number;
};
export default ({
  categoryList,
  spaceBetween = 10,
  slidesPerView = 3,
}: swiperType) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      modules={[Autoplay]}
      loop
      breakpoints={{
        // Large screens (lg, ≥1024px, like Tailwind's lg breakpoint)
        1024: {
          slidesPerView: 8,
          spaceBetween: 20, // Slightly larger gap for large screens
        },
        // Optionally, add more breakpoints (e.g., medium screens)
        768: {
          slidesPerView: 5, // Example for medium screens (optional)
          spaceBetween: 15,
        },
      }}
      autoplay={{
        delay: 5000, // 2.5 seconds per slide
        disableOnInteraction: false, // Continue autoplay after user swipe
        pauseOnMouseEnter: true, // Pause on hover (optional)
      }}
      className=""
    >
      {categoryList.map((cat) => (
        <SwiperSlide key={cat._id} className="">
          <Link scroll href={`/categories/${cat._id}`}>
            <figure className="relative h-[100] md:h-[180]">
              <Image
                fill
                src={cat.image}
                alt="anazon products"
                className="select-none w-full rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw" // Adjust based on your layout
              />
            </figure>
            <figcaption className="text-center text-sm mt-3 text-amber-900 select-none">
              {cat.name}
            </figcaption>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
