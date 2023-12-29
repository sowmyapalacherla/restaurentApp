import './index.css'

const CategoryDishes = props => {
  const {category, isActive, setActiveTabId} = props

  const onClickTabItem = () => {
    setActiveTabId(category)
  }
  const activeButtonClass = isActive ? 'active-btn' : ''

  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-button ${activeButtonClass}`}
        onClick={onClickTabItem}
      >
        {category}
      </button>
    </li>
  )
}
export default CategoryDishes
