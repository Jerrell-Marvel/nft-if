import { Link, useParams } from "react-router";
import "./purchase.scss";

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

export default function Purchase() {
  const { nftId } = useParams();
  return (
    <main className="purchase-page nav-padding">
      <h3>NFT ID : {nftId}</h3>

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
            <span className="creator">Dibuat oleh ...</span>
            <h1>Sisir</h1>
            <span className="creator">Dimiliki oleh ...</span>
          </div>

          <div className="price-container">
            <span className="price">1.000 USD</span>

            <Link to={"/cart"}>
              <button className="btn">Add to cart</button>
            </Link>
          </div>

          <div className="description">
            <h3>Deskripsi</h3>
            <p>Sisir ini terbuat dari ...</p>
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
                <span>From</span>
                <span>To</span>
                <span>Price</span>
                <span>Date</span>
              </div>

              <div className="list-item">
                <span>From</span>
                <span>To</span>
                <span>Price</span>
                <span>Date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
