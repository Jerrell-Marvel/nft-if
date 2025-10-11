import { Link, useParams } from "react-router";
import { useRef, useState } from "react";
import "./purchaseCollection.scss";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import jsonCollectionNftData from "../../nft-collection-data.json";

// const nftProperty = {
//     idToken: "12313123123",
//     alamatPemilik:"0xe123123123",

// }
type NftCollectionData = (typeof jsonCollectionNftData)[0];
type NftData = {
  id: number;
  nft_details: {
    title: string;
    description: string;
    image_url: string;
    status: string;
    price: string | null;
    creator: string | null;
    owner: string | null;
  };
  is_auction: boolean;
  auction_info: {
    current_bid: string | null;
    bid_by: string | null;
    time: string | null;
  } | null;
};

const firstGroup: NftCollectionData = jsonCollectionNftData[0];
const nftData1 = firstGroup.items[0];
const nftData2 = firstGroup.items[1];
const nftData3 = firstGroup.items[2];
const nftDataShow = [nftData1, nftData2, nftData3];

const nftProperties = [
  {
    displayName: "Token ID",
    value: "0xe12313139182391",
  },
  {
    displayName: "Owner's Address",
    value: "0xe12313134442391",
  },
  {
    displayName: "Creator's Address",
    value: "0xe12313139182391",
  },
  {
    displayName: "Address Contract",
    value: "0xe12313139182391",
  },
];

// const nftProperties = [
//   {
//     displayName: "Collection ID",
//     value: "0xe12313139182391",
//   },
//   {
//     displayName: "Owner's Address",
//     value: "0xe12313134442391",
//   },
//   {
//     displayName: "Creator's Address",
//     value: "0xe12313139182391",
//   },
//   {
//     displayName: "Address Contract",
//     value: "0xe12313139182391",
//   },
// ];

export default function PurchaseCollection() {
  const { nftId } = useParams();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
  // const [selectedNft, setSelectedNft] = useState<NftData | null>(
  //   firstGroup?.items?.[0] ?? null
  // );
  const [description, setDescription] = useState<string>(
    nftDataShow[0].nft_details.description
  );
  const [title, setTitle] = useState<string>(nftDataShow[0].nft_details.title);
  const [creator, setCreator] = useState<string | null>(
    nftDataShow[0].nft_details.creator
  );
  return (
    <>
      <main className="purchase-page main-container nav-padding">
        {/* <h3>NFT ID : {nftId}</h3> */}

        <div className="left-container">
          <h2>Collection 1</h2>
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
            onSlideChange={(swiper) => {
              const currentIndex = swiper.activeIndex;
              const currentData = nftDataShow[currentIndex];
              if (currentData) {
                setDescription(currentData.nft_details.description);
                setTitle(currentData.nft_details.title);
                setCreator(currentData.nft_details.creator);
              }
            }}
          >
            {nftDataShow.map((data: NftData) => {
              // console.log(data);
              const nft_details = data.nft_details;
              // console.log(nft_details);
              const auction_info = data.auction_info;
              // setDescription(nft_details.description);
              return (
                <SwiperSlide>
                  <div className="img-container">
                    {/* {nftList.map((data: NftData) => { */}
                    {/* return ( */}
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
                        // setSelectedNft(data);
                        // console.log(data);
                      }}
                    >
                      <div className="img-item">
                        <img
                          src={data.nft_details.image_url}
                          className="real-img"
                        />
                      </div>
                    </div>
                    <div className="details">
                      {/* <h2>{nft_details.title}</h2> */}
                      {/* <p>{nft_details.description}</p> */}
                      <h2>Token Details</h2>

                      <div className="details-content">
                        {nftProperties.map((property) => {
                          return (
                            <div
                              key={property.displayName}
                              className="categories"
                            >
                              <span className="labels">
                                {property.displayName}
                              </span>
                              <span className="values">{property.value}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* <div className="details-content">
                        <div className="categories">
                          <span className="labels">Status:</span>
                          <span className="values">{nft_details.status}</span>
                        </div>
                        <div className="categories">
                          <span className="labels">Creator:</span>
                          <span className="values">{nft_details.creator}</span>
                        </div>
                        <div className="categories">
                          <span className="labels">Owner:</span>
                          <span className="values">{nft_details.owner}</span>
                        </div>

                        {data.is_auction ? (
                          <>
                            <div className="categories">
                              <span className="labels">Current Bid:</span>
                              <span className="values">
                                {auction_info?.current_bid || "N/A"}
                              </span>
                            </div>
                            <div className="categories">
                              <span className="labels">Bid By:</span>
                              <span className="values">
                                {auction_info?.bid_by || "N/A"}
                              </span>
                            </div>
                            <div className="categories">
                              <span className="labels">Time Left:</span>
                              <span className="values">
                                {auction_info?.time || "N/A"}
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="categories">
                            <span className="labels">Price:</span>
                            <span className="values">{nft_details.price}</span>
                          </div>
                        )}
                      </div> */}
                    </div>
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
          {/* <div className="img-frame">
            <img src="/2.jpg" className="img-item" />
          </div> */}

          {/* <div className="details">
            <h2>Token Details</h2>
            <div className="details-content">
              {nftProperties.map((property) => {
                return (
                  <div key={property.displayName} className="categories">
                    <span className="labels">{property.displayName}</span>
                    <span className="values">{property.value}</span>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>

        <div className="right-container">
          <div className="title">
            <span className="creator">Made by: {creator}</span>
            <h1>{title}</h1>
            <span className="creator">Owned by: The Heritage Store</span>
          </div>

          <div className="price-container">
            <span className="price">Price: 1.000 USD</span>

            <Link to={"/cart"}>
              <button className="btn">Add to cart</button>
            </Link>
          </div>

          <div className="description">
            <h3>Description</h3>
            {/* <p>
              This comb is meticulously hand-carved from ethically sourced
              obsidian, prized for its smooth texture and grounding properties.
              The spine is inlaid with a single line of sterling silver,
              offering a balanced weight and a touch of elegance. Designed to
              glide effortlessly through hair, it stimulates the scalp and
              distributes natural oils for a vibrant, healthy shine.
            </p> */}
            <p>{description}</p>
          </div>

          <div className="history">
            <h2>History Transaction</h2>
            <div className="list-header">
              <span>From</span>
              <span>To</span>
              <span>Price</span>
              <span>Date</span>
            </div>

            <div className="list-item-container">
              <div className="list-item">
                <span>Artisan Combs</span>
                <span>Elysian Artisans</span>
                <span>900 USD</span>
                <span>19-09-2025</span>
              </div>

              <div className="list-item">
                <span>Elysian Artisans</span>
                <span>The Heritage Store</span>
                <span>950 USD</span>
                <span>29-09-2025</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
