import { useState } from 'react'
import Delete from '~/components/icons/delete/Delete'
import './cart.scss'

type Nft = {
  name: string
  imgUrl: string
}

const initialNfts: Nft[] = [
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
  const [cartItems, setCartItems] = useState<Nft[]>(initialNfts)

  const handleDeleteItem = (indexToDelete: number) => {
    const newCartItems = cartItems.filter((_, index) => index !== indexToDelete)
    setCartItems(newCartItems)
  }

  return (
    <main className="cart-page nav-padding">
      <div className="cart-container">
        <h1 className="gradient-text">CART</h1>

        {cartItems.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((nft, index) => (
              <div className="cart-item" key={nft.name}>
                <img src={nft.imgUrl} className="" alt={nft.name} />
                <div className="cart-item-info">
                  <div className="cart-item-info-left">
                    <div className="cart-item-left-top-info">
                      <h2 className="gradient-text">{nft.name}</h2>
                    </div>
                    <div className="bid-info">
                      <p>Current Bid: ~</p>
                      <p>Your Bid: ~</p>
                      <p>Time: ~</p>
                    </div>
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
          </>
        )}
      </div>
    </main>
  )
}
