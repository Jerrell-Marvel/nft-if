import { useState } from "react";
import type { Route } from "./+types/Home";
import "./home.scss";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

const imgUrls = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(imgUrls[0]);
  const [displayMode, setDisplayMode] = useState("normal");

  return (
    <main className="main-container">
      <div className="left-container">
        <div>
          <p>Lorem ipsum dolor sit amet consectetur.</p>

          <img
            src={selectedImage}
            className="img-item"
          />

          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam tempora sit consequuntur. Dignissimos numquam ullam eos autem doloremque, suscipit beatae.</p>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, cum!</p>
        </div>

        <button>Detail</button>
      </div>
      <div className="right-container">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, rem.</p>
        <div className="img-container">
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
