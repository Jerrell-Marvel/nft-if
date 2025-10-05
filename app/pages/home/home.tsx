import { useState } from "react";
import type { Route } from "./+types/Home";
import "./home.scss";
import { Link, useSearchParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

const imgUrls = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(imgUrls[0]);

  const getActiveDisplay = () => {
    const displayValue = searchParams.get("display");
    if (displayValue === "Collection") {
      return displayValue;
    }
    return "Single";
  };

  const changeDisplay = () => {
    setSearchParams({
      display: getActiveDisplay() === "Single" ? "Collection" : "Single",
    });
  };

  return (
    <main className="home-page main-container nav-padding">
      <div className="left-container">
        <div>
          <h1 className="gradient-text">Mountain Cliffs NFT</h1>

          <div className="nft-desc-container">
            <img
              src={selectedImage}
              className="img-item"
            />

            <p className="gradient-text">A dramatic coastal scene where towering white cliffs meet the restless ocean. The cliffs rise steeply from the narrow strip of beach, their faces streaked with earthy tones and patches of greenery. 
              {/* A soft mist hangs over the scene, partially veiling the cliff tops and lending the landscape a mysterious, almost ethereal quality. The sea below rolls gently against the shore, its dark blue surface  */}
              breaking into white foam as waves lap onto the sand. The coastline curves gracefully into the distance, giving a sense of both grandeur and solitude, as if this rugged place belongs more to nature than to people.</p>
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
          <button className="btn" onClick={changeDisplay}>{getActiveDisplay() === "Single" ? "Collections" : "Single"}</button>
        </div>

        <div
          className="img-container"
          style={{
            backgroundColor: getActiveDisplay() === "Collection" ? "salmon" : "blue",
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
        </div>

        <div className="page-container">
          <p className="gradient-text">Page: 10/50</p>

          <div className="btn-container">
            <button className="btn">&lt;</button>
            <button className="btn">&gt;</button>
          </div>
        </div>
      </div>
    </main>
  );
}
