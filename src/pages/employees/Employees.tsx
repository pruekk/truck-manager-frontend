import { useState } from "react"
import { GridColDef } from "@mui/x-data-grid"
import DataTable from "../../components/dataTable/DataTable"
import Add from "../../components/addModal/AddModal"
import DateFormat from "../../utils/DateFormat"
import "./employees.scss"

const dummyEmployees = [
  {
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
  },
]

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "title",
    type: "string",
    width: 90,
  },
  {
    field: "firstName",
    headerName: "firstName",
    type: "string",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "lastName",
    type: "string",
    width: 100,
  },
  {
    field: "telephone",
    headerName: "telephone",
    type: "string",
    width: 100,
  },
  {
    field: "birthDate",
    headerName: "birthDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "idCard",
    headerName: "idCard",
    type: "string",
    width: 100,
  },
  {
    field: "address",
    headerName: "address",
    type: "string",
    width: 300,
  },
  {
    field: "role",
    headerName: "role",
    type: "string",
    width: 100,
  },
  {
    field: "type",
    headerName: "type",
    type: "string",
    width: 100,
  },
  {
    field: "bases",
    headerName: "bases",
    type: "number",
    width: 100,
    valueGetter: (salary) => {
      return salary.value[0].base
    },
  },
  {
    field: "bankName",
    headerName: "bankName",
    type: "string",
    width: 100,
  },
  {
    field: "bankAccount",
    headerName: "bankAccount",
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
    field: "ssoStartDate",
    headerName: "ssoStartDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "endDate",
    headerName: "endDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "ssoEndDate",
    headerName: "ssoEndDate",
    type: "Date",
    width: 150,
    valueFormatter: (date) => DateFormat(date.value),
  },
  {
    field: "reason",
    headerName: "reason",
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

const Employees = () => {
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
    <div className="employees">
      <div className="info">
        <h1>Employees</h1>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      <DataTable
        slug="employees"
        columns={columns}
        rows={dummyEmployees}
        customId="idCard"
      />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="cars" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="employees" columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Employees
