import ButtonComponent from "~/components/Button";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export default function Home() {
  const [ctr, setCtr] = useState(5);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setCtr((prev) => prev + 1);
  }, [theme]);

  return (
    <div className={`${theme === "light" ? "bg-white text-black" : "bg-dark text-white"}`}>
      <p>{ctr}</p>

      <button
        onClick={() => {
          setCtr((prev) => {
            return prev + 1;
          });
        }}
      >
        Increment
      </button>

      <button
        onClick={() => {
          if (theme == "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        Change theme
      </button>
      <h1 className="home-header">HELLO WORLD</h1>
    </div>
  );
}
