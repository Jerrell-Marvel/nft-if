import Delete from '~/components/icons/delete/Delete'
import './cart.scss'

const nfts = [
  {
    name: 'kucing tidur',
    imgUrl: '1.jpg',
  },

  {
    name: 'kucing bangun',
    imgUrl: '2.jpg',
  },

  {
    name: 'soto kuah',
    imgUrl: '3.jpg',
  },

  {
    name: 'baso kuah',
    imgUrl: '4.jpg',
  },
]

export default function Cart() {
  return (
    <main className="cart-page nav-padding">
      <div className="cart-container">
        <h1 className="gradient-text">CART</h1>
        {nfts.map((nft) => {
          return (
            <div className="cart-item">
              <img src={nft.imgUrl} className="" />

              <div className="cart-item-info">
                <div className="cart-item-info-left">
                  <div className="cart-item-left-top-info">
                    <h2 className="gradient-text">{nft.name}</h2>
                    {/* <h3> Price: ~</h3> */}
                  </div>
                  <div className="bid-info">
                    <p>Current Bid: ~</p>
                    <p>Your Bid: ~</p>
                    <p>Time: ~</p>
                  </div>
                </div>
                <div className="delete-container">
                  <Delete />
                </div>
              </div>
            </div>
          )
        })}

        <div className="checkout">
          <label htmlFor="wallet" className="gradient-text">
            Choose a wallet:
          </label>
          <select className="explore-button" name="wallet" id="wallet">
            <option value="wallet 1">Wallet 1</option>
            <option value="wallet 2">Wallet 2</option>
            <option value="wallet 3">Wallet 3</option>
            <option value="wallet 4">Wallet 4</option>
          </select>
          <button className="btn">Checkout</button>
        </div>
      </div>
    </main>
  )
}
