import { Link, useParams } from "react-router";
import "./bid.scss";

// const nftProperty = {
//     idToken: "12313123123",
//     alamatPemilik:"0xe123123123",

// }

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
  const { nftId } = useParams();
  return (
    <main className="bid-page nav-padding">
      {/* <h3>NFT ID : {nftId}</h3> */}

      <div className="main-container">
        <div className="left-container">
          <div className="img-frame">
            <img src="/2.jpg" className="img-item" />
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
            <span className="creator">Made by: Artisan Combs</span>
            <h1>Sisir</h1>
            <span className="creator">Owned by: The Heritage Store</span>
          </div>

          <div className="price-container">
            <div className="left-wrapper">
              <h2>Current Highest Bid</h2>
              <p className="price">Price: 800 USD</p>
              <span className="creator">by: The Authentic</span>
            </div>

            <div className="right-wrapper">
              <h2>Auction Ends In</h2>
              <p>01d 12h 45m 05s</p>
            </div>

            <Link to={"/cart"}>
              <button className="btn">Place a bid</button>
            </Link>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>
              This comb is meticulously hand-carved from ethically sourced
              obsidian, prized for its smooth texture and grounding properties.
              The spine is inlaid with a single line of sterling silver,
              offering a balanced weight and a touch of elegance. Designed to
              glide effortlessly through hair, it stimulates the scalp and
              distributes natural oils for a vibrant, healthy shine.
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
      </div>
    </main>
  );
}
