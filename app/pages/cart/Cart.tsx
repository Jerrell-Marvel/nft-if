import "./cart.scss";

const nfts = [
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

export default function Cart() {
  return (
    <main className="cart-page nav-padding">
      {nfts.map((nft) => {
        return (
          <div className="cart-item glow-hover">
            <img src={nft.imgUrl} className="glow-hover" />

            <div className="cart-item-info">
              <p className="gradient-text">{nft.name}</p>

              <button className="delete-button glow-hover">Delete</button>
            </div>
          </div>
        );
      })}

      <div className="checkout">
        <label htmlFor="wallet">Choose a wallet:</label>
        <select
          name="wallet"
          id="wallet"
        >
          <option value="wallet 1">wallet 1</option>
          <option value="wallet 2">wallet 2</option>
          <option value="wallet 3">wallet 3</option>
          <option value="wallet 4">wallet 4</option>
        </select>
        <button className="glow-hover">Checkout</button>
      </div>
    </main>
  );
}
