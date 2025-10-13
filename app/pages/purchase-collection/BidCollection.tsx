import { Link, useNavigate, useParams } from "react-router";
import { useRef, useState } from "react";
import "./bidCollection.scss";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import jsonCollectionNftData from "../../nft-collection-data.json";
import BidModal from "~/components/bid-modal/BidModal";
import { toast } from "react-toastify";
import { retriveCart } from "utils/cart";

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

// const firstGroup: NftCollectionData = jsonCollectionNftData[0];
// const nftData1 = firstGroup.items[0];
// const nftData2 = firstGroup.items[1];
// const nftData3 = firstGroup.items[2];
// const nftDataShow = [nftData1, nftData2, nftData3];

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

export default function BidCollection() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { groupId } = useParams();

  const [currentBid, setCurrentBid] = useState<number>(0.5);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const navigate = useNavigate();

  const firstGroup: NftCollectionData = jsonCollectionNftData.find((n) => n.group_id === parseInt(groupId!))!;
  console.log(firstGroup);
  const nftData1 = firstGroup.items[0];
  const nftData2 = firstGroup.items[1];
  const nftData3 = firstGroup.items[2];
  const nftDataShow = [nftData1, nftData2, nftData3];

  const handleBidSuccess = (newBidAmount: number) => {
    console.log(`New bid placed: ${newBidAmount} ETH`);
    setCurrentBid(newBidAmount);

    const newCart = retriveCart();

    newCart.unshift({
      id: null,
      name: firstGroup.group_name,
      image_url: firstGroup.items[0].nft_details.image_url,
      price: firstGroup.price,
      is_auction: true,
      group_id: firstGroup.group_id,
      current_bid: newBidAmount,
      your_bid: newBidAmount,
      time: firstGroup.auction_details?.ending_soonest,
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Item has been added to the cart.");

    setTimeout(() => {
      navigate("/cart");
    }, 1000);
    closeModal();
  };

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
  // const [selectedNft, setSelectedNft] = useState<NftData | null>(
  //   firstGroup?.items?.[0] ?? null
  // );
  const [description, setDescription] = useState<string>(nftDataShow[0].nft_details.description);
  const [title, setTitle] = useState<string>(nftDataShow[0].nft_details.title);
  const [creator, setCreator] = useState<string | null>(nftDataShow[0].nft_details.creator);
  const [index, setIndex] = useState<number>(1);
  return (
    <>
      <main className="bid-collection-page main-container nav-padding">
        {/* <h3>NFT ID : {nftId}</h3> */}

        <div className="left-container">
          {/* <h2>Collection 1</h2> */}
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
            onSlideChange={(swiper) => {
              const currentIndex = swiper.activeIndex;
              const currentData = nftDataShow[currentIndex];
              if (currentData) {
                setDescription(currentData.nft_details.description);
                setTitle(currentData.nft_details.title);
                setCreator(currentData.nft_details.creator);
                setIndex(currentIndex + 1);
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
                    <span className="labels">{property.displayName}</span>
                    <span className="values">{property.value}</span>
                  </div>
                );
              })}
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
          <div className="collection-title-container">
            <div className="title">
              <h1 className="collection">{firstGroup.group_name}</h1>
            </div>
            <div className="index">
              #{index}/{nftDataShow.length}
            </div>
          </div>

          <div className="price-container">
            <div className="bid-container">
              <div className="left-wrapper">
                <h2>Current Highest Bid</h2>
                <p className="price">Price: {firstGroup.auction_details?.highest_bid}</p>
                <span className="creator">by: The Authentic</span>
              </div>

              <div className="right-wrapper">
                <h2>Auction Ends In</h2>
                <p>01d 12h 45m 05s</p>
              </div>
            </div>

            <button
              className="btn"
              onClick={openModal}
            >
              Place a bid
            </button>
            <BidModal
              show={isModalOpen}
              onClose={closeModal}
              currentBid={+firstGroup.auction_details?.highest_bid.split(" ")[0]!}
              onBidSubmit={handleBidSuccess}
            />
          </div>

          <div className="title">
            <span className="creator">Made by: {creator}</span>
            <h1>{title}</h1>
            <span className="creator">Owned by: The Heritage Store</span>
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
                <span>3 ETH</span>
                <span>19-09-2025</span>
              </div>

              <div className="list-item">
                <span>Elysian Artisans</span>
                <span>The Heritage Store</span>
                <span>2.7 ETH</span>
                <span>29-09-2025</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
