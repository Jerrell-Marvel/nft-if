import { Link, useNavigate, useParams } from "react-router";
import "./bid.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BidModal from "~/components/bid-modal/BidModal";
import jsonNftData from "../../../nft-data.json";
import { retriveCart } from "utils/cart";

// const nftProperty = {
//     idToken: "12313123123",
//     alamatPemilik:"0xe123123123",

// }

// const data = {
//   id: 2,
//   nft_details: {
//     title: "Cyber Cityscape #22",
//     description:
//       "A glimpse into the neon-drenched streets of a futuristic metropolis. This piece immerses the viewer in a world of towering skyscrapers, holographic advertisements that flicker in the perpetual twilight, and flying vehicles that weave through the canyons of steel and glass. The rain-slicked streets reflect the vibrant glow, creating a stunning visual of a high-tech, dystopian future.",
//     image_url: "/images/Cyber-Cityscape.jpg",
//     status: "available",
//     price: "0.8 ETH",
//     creator: "NeoPixel",
//     owner: "NeoPixel",
//   },
//   is_auction: false,
//   auction_info: null,
// };

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

export default function Bid() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [currentBid, setCurrentBid] = useState<number>(0.5);

  const openModal = (): void => setIsModalOpen(true);
  const closeModal = (): void => setIsModalOpen(false);
  const navigate = useNavigate();

  const { nftId } = useParams();
  const [data, setData] = useState<(typeof jsonNftData)[0]>();

  useEffect(() => {
    const nftData = jsonNftData.find((nftData) => nftData.id === parseInt(nftId!));

    setData(nftData);
  }, []);

  if (!data) {
    return null;
  }

  const handleBidSuccess = (newBidAmount: number) => {
    console.log(`New bid placed: ${newBidAmount} ETH`);
    setCurrentBid(newBidAmount);

    const newCart = retriveCart();

    newCart.unshift({
      id: data.id,
      name: data.nft_details.title,
      image_url: data.nft_details.image_url,
      price: data.nft_details.price,
      group_id: null,
      is_auction: true,
      current_bid: newBidAmount,
      your_bid: newBidAmount,
      time: data.auction_info?.time,
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Item has been added to the cart.");

    setTimeout(() => {
      navigate("/cart");
    }, 1000);
    closeModal();
  };

  return (
    <>
      <main className="bid-page main-container nav-padding">
        <div className="back-button-container">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            &lt; Back
          </button>
        </div>
        {/* <h3>NFT ID : {nftId}</h3> */}
        <div className="left-container">
          <div className="img-frame">
            <img
              src={data.nft_details.image_url}
              className="img-item"
            />
          </div>

          <div className="details">
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
        </div>

        <div className="right-container">
          <div className="title">
            <span className="creator">Made by: {data.nft_details.creator}</span>
            <h1>{data.nft_details.title}</h1>
            <span className="creator">Owned by: {data.nft_details.owner}</span>
          </div>

          <div className="price-container">
            <div className="bid-container">
              <div className="left-wrapper">
                <h2>Current Highest Bid</h2>
                <p className="price">Price: 0.3 ETH</p>
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
              currentBid={0.3}
              onBidSubmit={handleBidSuccess}
            />
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>
              This comb is meticulously hand-carved from ethically sourced obsidian, prized for its smooth texture and grounding properties. The spine is inlaid with a single line of sterling silver, offering a balanced weight and a touch
              of elegance. Designed to glide effortlessly through hair, it stimulates the scalp and distributes natural oils for a vibrant, healthy shine.
            </p>
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
