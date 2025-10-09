import { useRef, useState } from "react";
import type { Route } from "./+types/Home";

import { Link, useSearchParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./home.scss";
import jsonNftData from "../../nft-data.json";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

const imgUrls = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const nftData1 = jsonNftData.slice(0, 8);
const nftData2 = jsonNftData.slice(8, 16);
const nftData3 = jsonNftData.slice(16);
const nftData = [nftData1, nftData2, nftData3];

type NftData = (typeof nftData)[0];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(imgUrls[0]);

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);

  const getActiveDisplay = () => {
    const displayValue = searchParams.get("display");
    if (displayValue === "collection") {
      return displayValue;
    }
    return "single";
  };

  const changeDisplay = () => {
    setSearchParams({
      display: getActiveDisplay() === "single" ? "collection" : "single",
    });
  };

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
            return '<span class="' + currentClass + '"></span>' + " of " + '<span class="' + totalClass + '"></span>';
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
      <main className="home-page main-container nav-padding">
        <div className="left-container">
          <div>
            <h1 className="gradient-text">Mountain Cliffs NFT</h1>

            <div className="nft-desc-container">
              <img
                src={selectedImage}
                className="img-item"
              />

              <p className="gradient-text">
                A dramatic coastal scene where towering white cliffs meet the restless ocean. The cliffs rise steeply from the narrow strip of beach, their faces streaked with earthy tones and patches of greenery. breaking into white foam
                {/* as waves lap onto the sand. The coastline curves gracefully into the distance, giving a sense of both grandeur and solitude, as if this rugged place belongs more to nature than to people. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. A recusandae facilis beatae porro consequatur accusamus fugiat maxime ut ab, quos aliquam modi iusto non quae obcaecati sint provident, laborum, consequuntur eligendi. Velit deserunt sequi,
                doloribus ipsa odit ea maiores mollitia sapiente atque ex. Laborum tempora natus cupiditate veritatis assumenda, omnis ratione quae voluptatem consectetur numquam voluptatum. Facilis, iusto delectus quaerat earum voluptatum
                cumque quasi. Accusamus harum natus odio, sit pariatur dignissimos, exercitationem quos labore aut ipsum officiis, porro corporis vero facilis fugiat error voluptatibus ea laudantium illum. Id commodi sint similique unde
                tempore quidem, molestiae fugiat aliquam voluptatem quia quis! */}
              </p>
            </div>
          </div>

          <Link to="/purchase/1123123">
            <button className="btn">Detail</button>
          </Link>
        </div>

        <div className="right-container">
          <h1 className="gradient-text">Check our NFT product</h1>

          <div className="type-container">
            <p className="gradient-text">Display : {getActiveDisplay()}</p>
            <button
              className="btn"
              onClick={changeDisplay}
            >
              {getActiveDisplay() === "single" ? "Collections" : "Single"}
            </button>
          </div>

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
              //@ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              //@ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current;
              //@ts-ignore
              swiper.params.pagination.el = paginationRef.current;
            }}
          >
            {nftData.map((nftList) => {
              return (
                <SwiperSlide>
                  <div
                    className="img-container"
                    // style={{
                    //   backgroundColor: getActiveDisplay() === "collection" ? "salmon" : "blue",
                    // }}
                  >
                    {nftList.map((data) => {
                      return (
                        <div
                          className="nft-card"
                          key={data.nft_details.image_url}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "smooth",
                              });
                            }
                            setSelectedImage(data.nft_details.image_url);
                          }}
                        >
                          <div className="img-item">
                            <img
                              src={data.nft_details.image_url}
                              className="real-img"
                            />
                          </div>

                          <p>{data.nft_details.title}</p>
                        </div>
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
      </main>
    </>
  );
}
