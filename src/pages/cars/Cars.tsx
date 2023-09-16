import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../components/dataTable/DataTable"
import Add from "../../components/addModal/AddModal"
import DateFormat from "../../utils/DateFormat"
import "./cars.scss"

const dummyCars = [
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
    editBy: "pruekanw@gmail.com",
    createdAt: "2023-08-01T05:15:32.408Z",
    updatedAt: "2023-08-01T08:36:26.686Z",
  },
]

const columns: GridColDef[] = [
  {
    field: "carId",
    headerName: "carId",
    type: "string",
    width: 90,
  },
  {
    field: "licensePlate",
    headerName: "licensePlate",
    type: "string",
    width: 100,
  },
  {
    field: "carType",
    headerName: "carType",
    type: "string",
    width: 100,
  },
  {
    field: "initialWeight",
    headerName: "initialWeight",
    type: "number",
    width: 100,
  },
  {
    field: "buyDate",
    headerName: "buyDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "buyFrom",
    headerName: "buyFrom",
    type: "string",
    width: 100,
  },
  {
    field: "taxDate",
    headerName: "taxDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "proposalDate",
    headerName: "proposalDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "insuranceDate",
    headerName: "insuranceDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "registrationDate",
    headerName: "registrationDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "price",
    headerName: "price",
    type: "number",
    width: 100,
  },
  {
    field: "vatPrice",
    headerName: "vatPrice",
    type: "number",
    width: 100,
  },
  {
    field: "netPrice",
    headerName: "netPrice",
    type: "number",
    width: 100,
  },
  {
    field: "status",
    headerName: "status",
    type: "string",
    width: 100,
  },
  {
    field: "editBy",
    headerName: "editBy",
    type: "string",
    width: 100,
  },
]

const Cars = () => {
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
    <div className="cars">
      <div className="info">
        <h1>Cars</h1>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <DataTable slug="cars" columns={columns} rows={dummyCars} customId="carId" />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="cars" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="car" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Cars
