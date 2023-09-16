import "./home.scss"

const Home = ({ theme }: any) => {
  return (
    <div className="home" app-theme={theme}>
      <div className="content">
        <h2 className="header">Truck Manager</h2>
        <h4>Transportation Service Portal</h4>
        <p>
          We provided <p className="hightlight">high-quality</p> service with a
          prompt and <p className="hightlight">professional</p> driver.
        </p>
        <div className="icons">
          <i className="fa-solid fa-truck-fast"></i>
          <i className="fa-solid fa-building-shield"></i>
          <i className="fa-regular fa-face-smile"></i>
        </div>
      </div>
    </div>
  )
}

export default Home
