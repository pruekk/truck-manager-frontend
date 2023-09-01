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
      {filteredMenu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Menu
