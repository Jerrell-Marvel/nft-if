import { useRef, useState } from "react";
import type { Route } from "./+types/Home";

import { Link, useSearchParams } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./home.scss";
import jsonNftData from "../../nft-data.json";
import jsonCollectionNftData from "../../nft-collection-data.json";
import Filter from "~/components/icons/filter/Filter";
import FilterModal from "~/components/filter-modal/FilterModal";
import SortDropdown from "~/components/Sort-dropdown/SortDropdown";
import type { SortOption } from "~/components/Sort-dropdown/SortDropdown";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<SortOption>("most-popular");

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);

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
            return '<span class="' + currentClass + '"></span>' + " of " + '<span class="' + totalClass + '"></span>';
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
      <FilterModal
        show={isModalOpen}
        onClose={closeModal}
      />
      <main className="home-page main-container nav-padding">
        <div className="left-container">
          <div>
            <h1 className="gradient-text">{selectedNft?.nft_details.title}</h1>

            <div className="nft-desc-container">
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
                  <>
                    <div className="detail-item">
                      <p>Number of NFTs :</p>
                      <p>{selectedCollectionNft?.items.length}</p>
                    </div>

                    {selectedCollectionNft?.is_auction ? (
                      <>
                        <p className="auct-text">Auction Info</p>
                        <div className="auct-wrapper">
                          <div className="detail-item">
                            <p>Current bid :</p>
                            <p>{selectedCollectionNft?.auction_details?.highest_bid}</p>
                          </div>

                          <div className="detail-item">
                            <p>Time :</p>
                            <p>{selectedCollectionNft?.auction_details?.ending_soonest}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="detail-item">
                        <p>Price :</p>
                        <p>{selectedCollectionNft?.price}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
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
                    ) : (
                      <div className="detail-item">
                        <p>Price :</p>
                        <p>{selectedNft?.nft_details.price}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {getActiveDisplay() === "collection" ? (
            <Link to={`/purchase/${selectedCollectionNft?.is_auction ? "bid/" : ""}collection/${selectedCollectionNft?.group_id}`}>
              <button className="btn">Detail</button>
            </Link>
          ) : (
            <Link to={`/purchase/${selectedNft?.is_auction ? "bid/" : ""}${selectedNft?.id}`}>
              <button className="btn">Detail</button>
            </Link>
          )}
        </div>

        <div className="right-container">
          <h1 className="gradient-text">Check our NFT product</h1>

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
          </div>

          {/* Updated filter container with sort dropdown */}
          <div className="filter-container">
            {searchParams.get("q") ? <span>Showing result of "{searchParams.get("q")}"</span> : <span></span>}

            <div className="controls-wrapper">
              <SortDropdown
                currentSort={currentSort}
                onSortChange={setCurrentSort}
              />
              <Filter onClick={openModal} />
            </div>
          </div>

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
                return '<span class="' + currentClass + '"></span>' + " of " + '<span class="' + totalClass + '"></span>';
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
            {getActiveDisplay() === "single"
              ? nftData.map((nftList, pageIndex) => {
                  return (
                    <SwiperSlide key={pageIndex}>
                      <div className="img-container">
                        {nftList.map((data) => {
                          return (
                            <div
                              // to={`/purchase${data.is_auction ? "/bid" : "/"}${data.id}`}
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
              : nftCollectionData.map((nftCollectionDataPage, pageIndex) => {
                  return (
                    <SwiperSlide key={pageIndex}>
                      <div className="img-container">
                        {nftCollectionDataPage.map((group) => {
                          return (
                            <div
                              className="nft-card"
                              // to={`/purchase${group.is_auction ? "/bid" : "/"}/collection/${group.group_id}`}
                              key={group.group_name}
                              onClick={() => {
                                if (window.innerWidth < 768) {
                                  window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth",
                                  });
                                }
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
              &lt;
            </div>
            <div
              ref={paginationRef}
              className="custom-pagination"
            ></div>
            <div
              ref={navigationNextRef}
              className="custom-button custom-button-next"
            >
              &gt;
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
