import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../components/dataTable/DataTable"
import Add from "../../components/add/Add"
import DateFormat from "../../utils/DateFormat"
import { cars } from "../../data"

import "./cars.scss"

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
        <button onClick={() => setOpen(true)}>Add New Cars</button>
      </div>
      <DataTable slug="cars" columns={columns} rows={cars} customId="carId" />
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
