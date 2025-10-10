import { useRef, useState } from "react";
import type { Route } from "./+types/Home";

import { Link, useSearchParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./home.scss";
import jsonNftData from "../../nft-data.json";
import jsonCollectionNftData from "../../nft-collection-data.json";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const imgUrls = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

const nftData1 = jsonNftData.slice(0, 8);
const nftData2 = jsonNftData.slice(8, 16);
const nftData3 = jsonNftData.slice(16);
const nftData = [nftData1, nftData2, nftData3];

const nftCollectionData = [jsonCollectionNftData, jsonCollectionNftData, jsonCollectionNftData];
type NftData = (typeof nftData)[0][0];
type NftCollectionData = (typeof nftCollectionData)[0][0];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedNft, setSelectedNft] = useState<NftData | null>(nftData[0][0]);
  const [selectedCollectionNft, setSelectedCollectionNft] = useState<NftCollectionData | null>(nftCollectionData[0][0]);

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        className="mySwiper"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        pagination={{
          el: paginationRef.current,
          type: "fraction",
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
        <div className="left-container">
          <div>
            <h1 className="gradient-text">{selectedNft?.nft_details.title}</h1>

            <div className="nft-desc-container">
              {/* <img
                src={selectedNft?.nft_details.image_url}
                className="img-item"
              /> */}
              <img
                src={getActiveDisplay() === "single" ? selectedNft?.nft_details.image_url : selectedCollectionNft?.items[0].nft_details.image_url}
                className="img-item"
              />

              <div className="detail-wrapper">
                <div className="detail-item">
                  <p>Creator :</p>
                  <p>{selectedNft?.nft_details.creator}</p>
                </div>

                {getActiveDisplay() === "collection" ? (
                  <div className="detail-item">
                    <p>Number of NFTs :</p>
                    <p>{selectedCollectionNft?.items.length}</p>
                  </div>
                ) : null}

                <div className="detail-item">
                  <p>Status :</p>
                  <p>{selectedNft?.nft_details.status}</p>
                </div>

                {selectedNft?.is_auction ? (
                  <>
                    <p className="auct-text">Auction Info</p>
                    <div className="auct-wrapper">
                      <div className="detail-item">
                        <p>Current bid :</p>
                        <p>{selectedNft?.auction_info?.current_bid}</p>
                      </div>

                      <div className="detail-item">
                        <p>Bid by :</p>
                        <p>{selectedNft?.auction_info?.bid_by}</p>
                      </div>

                      <div className="detail-item">
                        <p>Time :</p>
                        <p>{selectedNft?.auction_info?.time}</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

          <div className="type-container">
            <p
              onClick={changeDisplay}
              className={`${getActiveDisplay() === "single" && "type-active"}`}
            >
              Single
            </p>
            <p
              onClick={changeDisplay}
              className={`${getActiveDisplay() === "collection" && "type-active"}`}
            >
              Collection
            </p>
            {/* <p className="gradient-text">Display : {getActiveDisplay()}</p>
            <button
              className="btn"
              onClick={changeDisplay}
            >
              {getActiveDisplay() === "single" ? "Collections" : "Single"}
            </button> */}
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
            {getActiveDisplay() === "single"
              ? nftData.map((nftList) => {
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
                                setSelectedNft(data);
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
                })
              : nftCollectionData.map((nftCollectionDataPage) => {
                  return (
                    <SwiperSlide>
                      <div
                        className="img-container"
                        // style={{
                        //   backgroundColor: getActiveDisplay() === "collection" ? "salmon" : "blue",
                        // }}
                      >
                        {nftCollectionDataPage.map((group) => {
                          return (
                            <div
                              className="nft-card"
                              key={group.group_name}
                              onClick={() => {
                                if (window.innerWidth < 768) {
                                  window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                  });
                                }
                                // setSelectedNft(group);
                                setSelectedCollectionNft(group);
                              }}
                            >
                              <div className="img-item">
                                <img
                                  src={group.items[0].nft_details.image_url}
                                  className="real-img"
                                />
                              </div>

                              <p>{group.group_name}</p>
                            </div>
                            // group.items.map((nftData)=>{

                            // })
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
