import {useState} from 'react'

import './index.css'

const Dishes = props => {
  const [quantity, setQuantity] = useState(0)
  const {incrementCartItemQuantity, decrementCartItemQuantity, details} = props

  const {
    name,
    dishId,
    currency,
    price,
    calories,
    description,
    imageUrl,
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
    <>
      <li className="dish" key={dishId}>
        <div className="dish-details">
          <div className="name-container">
            <h1 className="name">{name}</h1>
            <div className="currency-container">
              <p className="currency">
                {currency} {price}
              </p>
            </div>
            <p className="description">{description}</p>
            {availability ? (
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
            ) : null}

            <p className="availability">{dishAvailability}</p>
            <p className="availability">{customization}</p>
          </div>
          <div className="calories-container">
            <p className="calories">{calories} calories</p>
          </div>
          <div className="image-container">
            <img src={imageUrl} alt="product" className="product-image" />
          </div>
        </div>
      </li>
    </>
  )
}

export default Dishes
