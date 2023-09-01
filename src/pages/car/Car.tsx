import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

import sellCar from "/sell-car.png"
import "./car.scss"
import "react-circular-progressbar/dist/styles.css"

const trackingData = [
  {
    name: "Sat",
    km: 10,
    mt: 5,
  },
  {
    name: "Sun",
    km: 8,
    mt: 10,
  },
  {
    name: "Mon",
    km: 18,
    mt: 15,
  },
  {
    name: "Tue",
    km: 23,
    mt: 20,
  },
  {
    name: "Wed",
    km: 21,
    mt: 25,
  },
  {
    name: "Thu",
    km: 14,
    mt: 30,
  },
  {
    name: "Fri",
    km: 33,
    mt: 35,
  },
]

const cars = [
  {
    _id: "64c894f4ad30b662c42beb7b",
    carId: "A201",
    licensePlate: "xx-0000",
    carType: "รถโม่",
    initialWeight: 25000,
    buyDate: "2020-01-25T01:00:00.000Z",
    buyFrom: "Place",
    taxDate: "2020-01-26T01:00:00.000Z",
    proposalDate: "2020-01-27T01:00:00.000Z",
    insuranceDate: "2020-01-29T01:00:00.000Z",
    registrationDate: "2020-01-30T01:00:00.000Z",
    price: 1000000,
    vatPrice: 70000,
    netPrice: 1070000,
    status: "ใช้งาน",
  },
]

const formatData = (key: string, value: any) => {
  if (key.toLocaleLowerCase().includes("date")) {
    const dateObject = new Date(value)
    if (!isNaN(dateObject.getTime())) {
      return dateObject.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-US")
  }
  return value
}

const offerData = [
  {
    name: "Wirat",
    avgPrice: 16605,
    marketAvg: 16244,
    percentage: 55,
    spendAmount: 1174,
    spendTitle: "Model Spend",
  },
  {
    name: "Chairat",
    avgPrice: 11605,
    marketAvg: 11244,
    percentage: 45,
    spendAmount: 1174,
    spendTitle: "Model Spend",
  },
  {
    name: "Kanor",
    avgPrice: 11605,
    marketAvg: 11244,
    percentage: 45,
    spendAmount: 1174,
    spendTitle: "Model Spend",
  },
]

const TrackingChart = () => {
  return (
    <ResponsiveContainer width="100%">
      <LineChart>
        <CartesianGrid strokeDasharray="0" stroke="#b7ffe913" />
        <XAxis dataKey="name" stroke="#ddd" />

        <Line
          type="monotone"
          dataKey="km"
          data={trackingData}
          stroke="#e1424e"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />

        <Tooltip wrapperClassName="tooltip__style" />
      </LineChart>
    </ResponsiveContainer>
  )
}

const Car = () => {
  const excludedProperties = ["_id"]
  return (
    <div className="sell__car">
      <h2 className="sell__car-title">Car</h2>
      <div className="sell__car-top">
        <div className="sell__car-img">
          <h2>A201</h2>
          <div className="sell__car-grid">
            <div className="sell__car-grid-column">
              <img src={sellCar} />
              <img src={sellCar} />
            </div>
            <div className="sell__car-grid-column">
              <img src={sellCar} />
              <img src={sellCar} />
            </div>
          </div>
        </div>

        <div className="detail">
          <h3>Detail</h3>
          {cars.map((car) => (
            <div className="item" key={car._id}>
              <div className="normalText">
                {Object.entries(car)
                  .filter(
                    ([key]) =>
                      !excludedProperties.includes(key) &&
                      !key.toLocaleLowerCase().includes("date")
                  )
                  .map(([key, value]) => (
                    <div key={key} className="property">
                      <span className="itemTitle">{key}</span>
                      <span className="itemValue">
                        {formatData(key, value)}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="dateText">
                {Object.entries(car)
                  .filter(
                    ([key]) =>
                      !excludedProperties.includes(key) &&
                      key.toLocaleLowerCase().includes("date")
                  )
                  .map(([key, value]) => (
                    <div key={key} className="property">
                      <span className="itemTitle">{key}</span>
                      <span className="itemValue">
                        {formatData(key, value)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tracking__history">
        <h3>Cubic History</h3>
        <TrackingChart />
      </div>

      <div className="offer__wrapper">
        <div className="offer__top">
          <h2 className="sell__car-title">Employee</h2>

          {/* <div className="filter__widget-01">
            <select>
              <option value="toyota">Toyota</option>
              <option value="bmw">Bmw</option>
              <option value="audi">Audi</option>
            </select>
          </div> */}
        </div>

        <div className="offer__list">
          {offerData.map((data, index) => (
            <div className="offer__item" key={index}>
              <div className="box__01">
                <h3 className="client__name">{data.name}</h3>
                <h6 className="avg__price">
                  {data.avgPrice.toLocaleString("en-US")} <span>baht</span>
                </h6>

                <h6 className="market__price">
                  Market average is ${data.marketAvg}
                </h6>
                <span className="arrow__key">
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>

              <div className="circle__wrapper">
                <div className="box__02">
                  <CircularProgressbar
                    value={data.percentage}
                    text={`${data.percentage}%`}
                    styles={buildStyles({
                      pathColor: "#01d293",
                      textColor: "#fff",
                      trailColor: "#0b0c28",
                      textSize: "18px",
                    })}
                  />
                </div>
                <h4>Impression Share</h4>
              </div>

              <div className="box__03">
                <div className="icon_text">
                  <span className="model__spend-icon">
                    <i className="fa-solid fa-money-bill"></i>
                  </span>
                  <p className="spend__title">income</p>
                </div>
                <h6 className="spend__amount">${data.spendAmount}</h6>
                <p className="spend__title">{data.spendTitle}</p>
              </div>

              <div className="box__04">
                <div className="icon_text">
                  <span className="model__spend-icon">
                    <i className="fa-solid fa-truck-fast"></i>
                  </span>
                  <p className="spend__title">trip</p>
                </div>
                <h6 className="spend__amount">${data.spendAmount}</h6>
                <p className="spend__title">{data.spendTitle}</p>
              </div>

              <div className="box__05">
                <div className="icon_text">
                  <span className="model__spend-icon">
                    <i className="fa-solid fa-gas-pump"></i>
                  </span>
                  <p className="spend__title">fuel</p>
                </div>
                <h6 className="spend__amount">${data.spendAmount}</h6>
                <p className="spend__title">Spend Per Unit Turned</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Car
