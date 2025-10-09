import { useRef, useState } from "react";
import type { Route } from "./+types/Home";

import { Link, useSearchParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./home.scss";
import Filter from "~/components/icons/filter/Filter";
import FilterModal from "~/components/filter-modal/FilterModal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const imgUrls = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(imgUrls[0]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  const getActiveDisplay = () => {
    const displayValue = searchParams.get("display");
    if (displayValue === "Collection") {
      return displayValue;
    }
    return "Single";
  };

  const changeDisplay = () => {
    setSearchParams({
      display: getActiveDisplay() === "Single" ? "Collection" : "Single",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
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
            return (
              '<span class="' +
              currentClass +
              '"></span>' +
              " of " +
              '<span class="' +
              totalClass +
              '"></span>'
            );
          },
        }}
        // This is important: it re-initializes Swiper after the refs are mounted
        onBeforeInit={(swiper) => {
          //@ts-ignore
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          //@ts-ignore
          swiper.params.navigation.nextEl = navigationNextRef.current;
          //@ts-ignore
          swiper.params.pagination.el = paginationRef.current;
        }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 1</SwiperSlide>
      </Swiper>
      <FilterModal show={isModalOpen} onClose={closeModal} />
      <main className="home-page main-container nav-padding">
        <div className="content">
          <div className="left-container">
            <div>
              <h1 className="gradient-text">Mountain Cliffs NFT</h1>

              <div className="nft-desc-container">
                <img src={selectedImage} className="img-item" />

                <p className="gradient-text">
                  A dramatic coastal scene where towering white cliffs meet the
                  restless ocean. The cliffs rise steeply from the narrow strip
                  of beach, their faces streaked with earthy tones and patches
                  of greenery. breaking into white foam as waves lap onto the
                  sand. The coastline curves gracefully into the distance,
                  giving a sense of both grandeur and solitude, as if this
                  rugged place belongs more to nature than to people.
                </p>
              </div>
            </div>

            <Link to="/purchase/1123123">
              <button className="btn">Detail</button>
            </Link>
          </div>

          <div className="right-container">
            <div className="filter-container">
              <Filter onClick={openModal} />
            </div>
            <h1 className="gradient-text">Check our NFT product</h1>

            <div className="type-container">
              <p className="gradient-text">Display : {getActiveDisplay()}</p>
              <button className="btn" onClick={changeDisplay}>
                {getActiveDisplay() === "Single" ? "Collections" : "Single"}
              </button>
            </div>

            <span>Showing result of "..."</span>

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
                  return (
                    '<span class="' +
                    currentClass +
                    '"></span>' +
                    " of " +
                    '<span class="' +
                    totalClass +
                    '"></span>'
                  );
                },
              }}
              // This is important: it re-initializes Swiper after the refs are mounted
              onBeforeInit={(swiper) => {
                //@ts-ignore
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                //@ts-ignore
                swiper.params.navigation.nextEl = navigationNextRef.current;
                //@ts-ignore
                swiper.params.pagination.el = paginationRef.current;
              }}
            >
              {Array.from({
                length: 10,
              }).map(() => {
                return (
                  <SwiperSlide>
                    <div
                      className="img-container"
                      style={{
                        backgroundColor:
                          getActiveDisplay() === "Collection"
                            ? "salmon"
                            : "blue",
                      }}
                    >
                      {imgUrls.map((imgUrl) => {
                        return (
                          <img
                            className="img-item"
                            src={imgUrl}
                            key={imgUrl}
                            onClick={() => {
                              setSelectedImage(imgUrl);
                            }}
                          />
                        );
                      })}

                      {imgUrls.map((imgUrl) => {
                        return (
                          <img
                            className="img-item"
                            src={imgUrl}
                            key={imgUrl}
                            onClick={() => {
                              setSelectedImage(imgUrl);
                            }}
                          />
                        );
                      })}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="custom-controls-container">
              <div
                ref={navigationPrevRef}
                className="custom-button custom-button-prev"
              >
                left
              </div>
              <div ref={paginationRef} className="custom-pagination"></div>
              <div
                ref={navigationNextRef}
                className="custom-button custom-button-next"
              >
                right
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
