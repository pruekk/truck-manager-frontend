import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../components/dataTable/DataTable"
import Add from "../../components/addModal/AddModal"
import DateFormat from "../../utils/DateFormat"
import "./factories.scss"

const dummyFactories = [
  {
    _id: "64c894f4ad30b662c42beb7b",
    factoryId: "FC272",
    name: "Nong Yai",
    factoryCode: "F272",
    startDate: "2020-01-26T01:00:00.000Z",
    address: "30 M1 Nong Yai Nong Yai Chonburi 20190",
    editBy: "pruekanw@gmail.com",
  },
  {
    _id: "64c894f4ad30b662c42beb7a",
    factoryId: "FC256",
    name: "Ban Bueng",
    factoryCode: "F256",
    startDate: "2020-01-26T01:00:00.000Z",
    address: "Ban Bueng Chonburi 20190",
    editBy: "pruekanw@gmail.com",
  },
]

const columns: GridColDef[] = [
  {
    field: "factoryId",
    headerName: "factoryId",
    type: "string",
    width: 90,
  },
  {
    field: "name",
    headerName: "name",
    type: "string",
    width: 100,
  },
  {
    field: "factoryCode",
    headerName: "factoryCode",
    type: "string",
    width: 100,
  },
  {
    field: "startDate",
    headerName: "startDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "address",
    headerName: "address",
    type: "string",
    width: 300,
  },
  {
    field: "editBy",
    headerName: "editBy",
    type: "string",
    width: 100,
  },
]

const Factories = () => {
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
    <div className="factories">
      <div className="info">
        <h1>Factories</h1>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <DataTable
        slug="factories"
        columns={columns}
        rows={dummyFactories}
        customId="factoryId"
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

export default Factories
