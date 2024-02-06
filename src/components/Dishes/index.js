import {useState} from 'react'
import CartContext from '../../Context/CartContext'

import './index.css'

const Dishes = props => {
  const [quantity, setQuantity] = useState(0)
  const {incrementCartItemQuantity, decrementCartItemQuantity, details} = props

  const {
    dishName,
    dishId,
    currency,
    price,
    calories,
    description,
    dishImage,
    availability,
    addOnArray,
  } = details

  const onClickIncrement = () => {
    setQuantity(prev => prev + 1)
    incrementCartItemQuantity(dishId)
  }
  const onClickDecrement = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1)
      decrementCartItemQuantity(dishId)
    }
  }

  const dishAvailability = availability ? '' : 'Not available'
  const customization = addOnArray.length > 0 ? 'Customizations available' : ''

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...details, quantity})
          console.log(details)
        }
        return (
          <>
            <li className="dish" key={dishId}>
              <div className="dish-details">
                <div className="name-container">
                  <h1 className="name">{dishName}</h1>
                  <div className="currency-container">
                    <p className="currency">
                      {currency} {price}
                    </p>
                  </div>
                  <p className="description">{description}</p>
                  {availability ? (
                    <div className="add-cart-container">
                      <div className="quantity-container">
                        <button
                          type="button"
                          className="quantity-controller-button"
                          onClick={onClickDecrement}
                        >
                          -
                        </button>
                        <p className="quantity">{quantity}</p>
                        <button
                          type="button"
                          className="quantity-controller-button"
                          onClick={onClickIncrement}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className=" add-to-cart-btn"
                        onClick={onClickAddToCart}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  ) : null}

                  <p className="availability">{dishAvailability}</p>
                  <p className="availability">{customization}</p>
                </div>
                <div className="calories-container">
                  <p className="calories">{calories} calories</p>
                </div>
                <div className="image-container">
                  <img
                    src={dishImage}
                    alt="product"
                    className="product-image"
                  />
                </div>
              </div>
            </li>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Dishes
