import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../components/dataTable/DataTable"
import Add from "../../components/addModal/AddModal"
import DateFormat from "../../utils/DateFormat"
import "./cars.scss"

const dummyCars = [
  {
    _id: "64f80742d0b93f1f2df42bf7",
    carId: "A206",
    licensePlate: "83-5946",
    carType: "รถโ่ม่",
    initialWeight: 20000,
    taxDate: "2023-06-29T17:00:00.000Z",
    proposalDate: "2023-06-29T17:00:00.000Z",
    insuranceDate: "2023-06-29T17:00:00.000Z",
    registrationDate: "2002-09-08T17:00:00.000Z",
    buyDate: "2002-06-26T17:00:00.000Z",
    buyFrom: "บริษัท ขาว-ดำชลบุรี จำกัด",
    price: 616666.66,
    vatPrice: 330000,
    netPrice: 6166666.66,
    status: "ใช้งาน",
    editBy: "pruekanw@gmail.com",
  },
  {
    _id: "64f80742d0b93f1f2df42bf8",
    carId: "A207",
    licensePlate: "83-6414",
    carType: "รถโ่ม่",
    initialWeight: 15000,
    taxDate: "2023-12-30T17:00:00.000Z",
    proposalDate: "2023-12-30T17:00:00.000Z",
    insuranceDate: "2023-12-30T17:00:00.000Z",
    registrationDate: "2003-01-09T17:00:00.000Z",
    buyDate: "2002-10-29T17:00:00.000Z",
    buyFrom: "คุณอภิชาติ จังหวัดเชียงใหม่",
    price: 367500,
    vatPrice: 25725,
    netPrice: 367500,
    status: "ใช้งาน",
    editBy: "pruekanw@gmail.com",
  },
]

const columns: GridColDef[] = [
  {
    field: "carId",
    headerName: "carId",
    type: "string",
    width: 70,
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
    width: 70,
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
    width: 120,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "buyFrom",
    headerName: "buyFrom",
    type: "string",
    width: 150,
  },
  {
    field: "taxDate",
    headerName: "taxDate",
    type: "Date",
    width: 120,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "proposalDate",
    headerName: "proposalDate",
    type: "Date",
    width: 120,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "insuranceDate",
    headerName: "insuranceDate",
    type: "Date",
    width: 120,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "registrationDate",
    headerName: "registrationDate",
    type: "Date",
    width: 120,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "price",
    headerName: "price",
    type: "number",
    width: 120,
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
    width: 120,
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
    width: 200,
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
      <DataTable
        slug="cars"
        columns={columns}
        rows={dummyCars}
        customId="carId"
      />
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
