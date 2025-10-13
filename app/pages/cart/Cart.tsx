import { useEffect, useState } from "react";
import Delete from "~/components/icons/delete/Delete";
import "./cart.scss";
import { retriveCart } from "utils/cart";

type Nft = {
  name: string;
  imgUrl: string;
};

const initialNfts: Nft[] = [
  {
    name: "kucing tidur",
    imgUrl: "1.jpg",
  },
  {
    name: "kucing bangun",
    imgUrl: "2.jpg",
  },
  {
    name: "soto kuah",
    imgUrl: "3.jpg",
  },
  {
    name: "baso kuah",
    imgUrl: "4.jpg",
  },
];

type CartNft = {
  id: number | null;
  name: string;
  image_url: string;
  price: number | null;
  is_auction: boolean;
  group_id: number | null;
  current_bid: number | null;
  your_bid: number | null;
  time: number | null;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartNft[]>([]);

  useEffect(() => {
    const cart = retriveCart();

    setCartItems(cart);
  }, []);

  const handleDeleteItem = (indexToDelete: number) => {
    const newCartItems = cartItems.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
  };

  return (
    <main className="cart-page nav-padding">
      <div className="cart-container">
        <h1 className="gradient-text">CART</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((nft, index) => (
              <div
                className="cart-item"
                key={nft.name}
              >
                <img
                  src={nft.image_url}
                  className=""
                  alt={nft.name}
                />
                <div className="cart-item-info">
                  <div className="cart-item-info-left">
                    <div className="cart-item-left-top-info">
                      <h2 className="gradient-text">{nft.name}</h2>
                    </div>

                    {nft.is_auction ? (
                      <div className="bid-info">
                        <p>Current Bid: {nft.current_bid} ETH</p>
                        <p>Your Bid: {nft.your_bid} ETH</p>
                        <p>Time: {nft.time}</p>
                      </div>
                    ) : (
                      <div className="bid-info">
                        <p>Price: {nft.price}</p>
                      </div>
                    )}
                  </div>
                  <div
                    className="delete-container"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <Delete />
                  </div>
                </div>
              </div>
            ))}

            <div className="checkout">
              <label
                htmlFor="wallet"
                className="gradient-text"
              >
                Choose a wallet:
              </label>
              <select
                className="explore-button"
                name="wallet"
                id="wallet"
              >
                <option value="wallet 1">Wallet 1</option>
                <option value="wallet 2">Wallet 2</option>
                <option value="wallet 3">Wallet 3</option>
                <option value="wallet 4">Wallet 4</option>
              </select>
              <button className="btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
