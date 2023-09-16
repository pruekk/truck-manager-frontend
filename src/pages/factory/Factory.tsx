import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import "./factory.scss"

const dummyFactory = {
  _id: "64c894f4ad30b662c42beb7b",
  factoryId: "FC272",
  name: "Nong Yai",
  factoryCode: "F272",
  startDate: "2020-01-26T01:00:00.000Z",
  address: "30 M1 Nong Yai Nong Yai Chonburi 20190",
  editBy: "pruekanw@gmail.com",
}

const dummyChart = {
  dataKeys: [
    { name: "visits", color: "#82ca9d" },
    { name: "clicks", color: "#8884d8" },
  ],
  data: [
    {
      name: "Sun",
      visits: 4000,
      clicks: 2400,
    },
    {
      name: "Mon",
      visits: 3000,
      clicks: 1398,
    },
    {
      name: "Tue",
      visits: 2000,
      clicks: 3800,
    },
    {
      name: "Wed",
      visits: 2780,
      clicks: 3908,
    },
    {
      name: "Thu",
      visits: 1890,
      clicks: 4800,
    },
    {
      name: "Fri",
      visits: 2390,
      clicks: 3800,
    },
    {
      name: "Sat",
      visits: 3490,
      clicks: 4300,
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

const Factory = () => {
  //Fetch data and send to Single Component
  const excludedProperties = ["_id", "editBy"]

  return (
    <div className="factory">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{dummyFactory.name}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(dummyFactory)
              .filter(([key]) => !excludedProperties.includes(key))
              .map((item) => (
                <div className="item" key={item[0]}>
                  <span className="itemTitle">{item[0]}</span>
                  <span className="itemValue">{item[1]}</span>
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

export default Factory
