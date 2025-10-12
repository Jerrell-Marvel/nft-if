import { Link, useNavigate, useParams } from "react-router";
import "./purchase.scss";
import { toast } from "react-toastify";

// const nftProperty = {
//     idToken: "12313123123",
//     alamatPemilik:"0xe123123123",

// }

const data = {
  id: 2,
  nft_details: {
    title: "Cyber Cityscape #22",
    description:
      "A glimpse into the neon-drenched streets of a futuristic metropolis. This piece immerses the viewer in a world of towering skyscrapers, holographic advertisements that flicker in the perpetual twilight, and flying vehicles that weave through the canyons of steel and glass. The rain-slicked streets reflect the vibrant glow, creating a stunning visual of a high-tech, dystopian future.",
    image_url: "/images/Cyber-Cityscape.jpg",
    status: "available",
    price: "0.8 ETH",
    creator: "NeoPixel",
    owner: "NeoPixel",
  },
  is_auction: false,
  auction_info: null,
};

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

export default function Purchase() {
  const { nftId } = useParams();
  const navigate = useNavigate();
  return (
    <main className="purchase-page main-container nav-padding">
      {/* <h3>NFT ID : {nftId}</h3> */}

      <div className="left-container">
        <div className="img-frame">
          <img src={data.nft_details.image_url} className="img-item" />
        </div>

        <div className="details">
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
        </div>
      </div>

      <div className="right-container">
        <div className="title">
          <span className="creator">Made by: {data.nft_details.creator}</span>
          <h1>{data.nft_details.title}</h1>
          <span className="creator">Owned by: {data.nft_details.owner}</span>
        </div>

        <div className="price-container">
          <span className="price">Price: 0.3 ETH</span>

          <button
            className="btn"
            onClick={() => {
              toast.success("Item has been added to the cart.");

              setTimeout(() => {
                navigate("/cart"); // This runs after 1 second
              }, 1000);
            }}
          >
            Add to cart
          </button>
        </div>

        <div className="description">
          <h3>Description</h3>
          <p>{data.nft_details.description}</p>
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
  );
}
