import { useParams } from "react-router";
import "./purchase.scss";

// const nftProperty = {
//     idToken: "12313123123",
//     alamatPemilik:"0xe123123123",

// }

const nftProperties = [
  {
    displayName: "token id",
    value: "0xe12313139182391",
  },
  {
    displayName: "owner's address",
    value: "0xe12313134442391",
  },
  {
    displayName: "creator's address",
    value: "0xe12313139182391",
  },
  {
    displayName: "address contract",
    value: "0xe12313139182391",
  },
];

export default function Purchase() {
  const { nftId } = useParams();
  return (
    <main className="purchase-page nav-padding">
      <p>nft id : {nftId}</p>

      <div className="main-container">
        <div className="left-container">
          <img
            src="/2.jpg"
            className="img-item"
          />

          <div>
            {nftProperties.map((property) => {
              return (
                <div key={property.displayName}>
                  <p>{property.displayName}</p>
                  <p>{property.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="right-container">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum magnam nisi recusandae tempore rerum commodi consectetur deserunt nihil, tenetur ratione.</p>

          <button>Add to cart</button>
        </div>
      </div>
    </main>
  );
}
