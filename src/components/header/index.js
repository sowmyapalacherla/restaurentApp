import './index.css'

const Header = props => {
  const {quantity} = props
  console.log(quantity)
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <h1 className="heading" key="restaurant_name">
          UNI Resto Cafe
        </h1>
        <div className="container">
          <p className="order">My Orders</p>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              alt="nav cart"
              className="nav-bar-img"
            />
            {quantity.length > 0 ? (
              <span className="cart-count-badge">{quantity.length}</span>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Header
