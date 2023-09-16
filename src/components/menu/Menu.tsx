import { Link } from "react-router-dom"
import "./menu.scss"
import { menu } from "../../data"
import { useAuth } from "../../context/AuthContext"

const Menu = () => {
  const { user } = useAuth()
  const admin = user?.isAdmin || false
  const features = user?.allowedFeatures || []

  const filteredMenu = admin
    ? menu
    : menu
        .map((item) => {
          const filteredListItems = item.listItems.filter((listItem) =>
            features.some(
              (feature) =>
                feature.name.toLowerCase() === listItem.title.toLowerCase()
            )
          )

          return {
            ...item,
            listItems: filteredListItems,
          }
        })
        .filter((item) => item.listItems.length > 0)

  return (
    <div className="menu">
      {filteredMenu.map((item, mainIndex) => (
        <div className="item" key={mainIndex}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem, itemIndex) => (
            <Link to={listItem.url} className="listItem" key={itemIndex}>
              {/* <img src={listItem.icon} alt="" /> */}
              <i className={listItem.icon}></i>
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Menu
