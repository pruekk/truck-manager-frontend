import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import "./employee.scss"

const dummyEmployee = {
  _id: "64c894f4ad30b662c42beb7b",
  title: "นาย",
  firstName: "ธงชัย",
  lastName: "เดชพละ",
  telephone: "0909199218",
  birthDate: "2020-01-26T01:00:00.000Z",
  idCard: "1234567890123",
  address: "30 m.1 Nong Yai Chonburi",
  role: "คนขับรถโม่",
  type: "fulltime",
  bases: [
    {
      date: "2020-01-26T01:00:00.000Z",
      base: 5000,
    },
  ],
  bankName: "ไทยพาณิชย์",
  bankAccount: "0123456789",
  startDate: "2020-01-26T01:00:00.000Z",
  ssoStartDate: "2020-01-26T01:00:00.000Z",
  editBy: "pruekanw@gmail.com",
}

const dummyChart = {
  dataKeys: [{ name: "base", color: "#82ca9d" }],
  data: [
    {
      name: "01/01/2020",
      base: 4000,
    },
    {
      name: "01/01/2021",
      base: 5000,
    },
    {
      name: "01/01/2022",
      base: 6000,
    },
    {
      name: "01/01/2023",
      base: 7000,
    },
  ],
}

const dummyActivities = [
  {
    text: "John Doe purchased Playstation 5 Digital Edition",
    time: "3 day ago",
  },
  {
    text: "John Doe added 3 items into their wishlist",
    time: "1 week ago",
  },
  {
    text: "John Doe purchased Sony Bravia KD-32w800",
    time: "2 weeks ago",
  },
  {
    text: "John Doe reviewed a product",
    time: "1 month ago",
  },
  {
    text: "John Doe added 1 items into their wishlist",
    time: "1 month ago",
  },
  {
    text: "John Doe reviewed a product",
    time: "2 months ago",
  },
]

const Employee = () => {
  //Fetch data and send to Single Component
  const excludedProperties = ["_id", "editBy", "bases"]

  return (
    <div className="factory">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>
              {dummyEmployee.firstName} {dummyEmployee.lastName}
            </h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(dummyEmployee)
              .filter(([key]) => !excludedProperties.includes(key))
              .map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}</span>
                  <span className="itemValue">{item[1].toString()}</span>
                </div>
              ))}
          </div>
        </div>
        <hr />
        {dummyChart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={dummyChart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {dummyChart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {dummyActivities && (
          <ul>
            {dummyActivities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Employee
