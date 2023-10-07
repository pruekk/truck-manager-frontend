import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../components/dataTable/DataTable"
import Add from "../../components/addModal/AddModal"
import DateFormat from "../../utils/DateFormat"
import "./fuels.scss"

const dummyFuels = [
  {
    _id: "64c894f4ad30b662c42beb7b",
    date: "2020-01-26T01:00:00.000Z",
    factoryId: "FC272",
    distanceId: "1",
    cubicId: "5.00",
    amount: "6.5",
    editBy: "pruekanw@gmail.com",
  },
  {
    _id: "64c894f4ad30b662c42beb7a",
    date: "2020-01-26T01:00:00.000Z",
    factoryId: "FC272",
    distanceId: "A",
    cubicId: "5.00",
    amount: "30.0",
    editBy: "pruekanw@gmail.com",
  },
]

const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "date",
    type: "Date",
    minWidth: 100,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "factoryId",
    headerName: "factoryId",
    type: "string",
    minWidth: 100,
  },
  {
    field: "distanceId",
    headerName: "distanceId",
    type: "string",
    minWidth: 100,
  },
  {
    field: "cubicId",
    headerName: "cubicId",
    type: "string",
    minWidth: 100,
  },
  {
    field: "amount",
    headerName: "amount",
    type: "string",
    minWidth: 100,
  },
  {
    field: "editBy",
    headerName: "editBy",
    type: "string",
    flex: 1
  },
]

const Fuels = () => {
  const [open, setOpen] = useState(false)

  // TEST THE API

  // const { isLoading, data } = useQuery({
  //   queryKey: ["allproducts"],
  //   queryFn: () =>
  //     fetch("http://localhost:8800/api/products").then(
  //       (res) => res.json()
  //     ),
  // });

  return (
    <div className="fuels">
      <div className="info">
        <h1>Fuels</h1>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <DataTable
        slug="fuels"
        columns={columns}
        rows={dummyFuels}
        disabledEdit
      />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="cars" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="factory" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Fuels
