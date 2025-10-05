//@ts-nocheck

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import your icons, for example from react-icons
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "./about.scss";
import "swiper/css";

export default function About() {
  // Create refs for the navigation buttons and pagination container
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  return (
    <div
      className="nav-padding"
      style={{
        height: "600px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Swiper
        // Pass modules
        modules={[Navigation, Pagination]}
        className="mySwiper"
        // Configure Navigation
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        // Configure Pagination
        pagination={{
          el: paginationRef.current,
          type: "fraction",
          // Custom render function for the fraction
          renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + " of " + '<span class="' + totalClass + '"></span>';
          },
        }}
        // This is important: it re-initializes Swiper after the refs are mounted
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
          swiper.params.pagination.el = paginationRef.current;
        }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      {/* Your Custom Controls Container */}
      <div className="custom-controls-container">
        <div
          ref={navigationPrevRef}
          className="custom-button custom-button-prev"
        >
          left
        </div>
        <div
          ref={paginationRef}
          className="custom-pagination"
        ></div>
        <div
          ref={navigationNextRef}
          className="custom-button custom-button-next"
        >
          right
        </div>
      </div>
    </div>
  );
}
