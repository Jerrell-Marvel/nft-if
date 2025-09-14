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
    <main className="home-page main-container">
      <div className="left-container nav-padding">
        <div>
          <p>Lorem ipsum dolor sit amet consectetur.</p>

          <img
            src={selectedImage}
            className="img-item"
          />

          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam tempora sit consequuntur. Dignissimos numquam ullam eos autem doloremque, suscipit beatae.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, cum!</p>
        </div>

        <Link to="/purchase/1123123">
          <button>Detail</button>
        </Link>
      </div>
      <div className="right-container nav-padding">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, rem.</p>

        <p>display : {getActiveDisplay()}</p>
        <button onClick={changeDisplay}>{getActiveDisplay() === "single" ? "collections" : "single"}</button>

        <div
          className="img-container"
          style={{
            backgroundColor: getActiveDisplay() === "collection" ? "salmon" : "blue",
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
          <p>10/50</p>

          <div>
            <button>&lt;</button>
            <button>&gt;</button>
          </div>
        </div>
      </div>
    </main>
  );
}
