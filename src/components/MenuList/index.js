import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Dishes from '../Dishes'
import Header from '../header'

import CategoryDishes from '../categoryDishes'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MenuList extends Component {
  state = {
    menuList: {},
    categoryList: [],
    activeCategory: '',
    apiStatus: apiStatusConstants.initial,
    cartList: [],
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    name: data.dish_name,
    dishId: data.dish_id,
    currency: data.dish_currency,
    price: data.dish_price,
    calories: data.dish_calories,
    availability: data.dish_Availability,
    description: data.dish_description,
    imageUrl: data.dish_image,
    addOnArray: data.addonCat,
  })

  getProductData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const reqObj = fetchedData[0]
      const addData = {}
      reqObj.table_menu_list.forEach(each => {
        const key = each.menu_category
        const data = each.category_dishes
        const value = data.map(e => this.getFormattedData(e))
        addData[key] = value
      })

      const finalList = Object.keys(addData)

      this.setState({
        menuList: addData,
        categoryList: finalList,
        activeCategory: finalList[0],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
    </div>
  )

  clickTabItem = category => {
    this.setState({activeCategory: category})
  }

  onDecrementQuantity = dishId => {
    const {cartList} = this.state
    const cart = cartList.filter(each => each === dishId)
    const count = cart.length
    if (count > 0) {
      const index = cartList.indexOf(dishId)
      cartList.splice(index, 1)
      this.setState({cartList})
    }
  }

  onIncrementQuantity = dishId => {
    this.setState(prev => ({cartList: [...prev.cartList, dishId]}))
  }

  renderProductDetailsView = () => {
    const {menuList, categoryList, activeCategory, cartList} = this.state
    // console.log(cartList)
    return (
      <>
        <Header quantity={cartList} />
        <ul className="categories">
          {categoryList.map(each => (
            <CategoryDishes
              key={each}
              category={each}
              setActiveTabId={this.clickTabItem}
              isActive={activeCategory === each}
            />
          ))}
        </ul>

        {activeCategory && (
          <ul className="dishes">
            {menuList[activeCategory].map(each => (
              <Dishes
                key={each.dishId}
                details={each}
                incrementCartItemQuantity={this.onIncrementQuantity}
                decrementCartItemQuantity={this.onDecrementQuantity}
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-item-details-container">
        {this.renderProductDetails()}
      </div>
    )
  }
}

export default MenuList
