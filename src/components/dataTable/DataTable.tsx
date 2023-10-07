import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid"
import "./dataTable.scss"
import { Link } from "react-router-dom"
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[]
  rows: object[]
  slug: string
  customId?: string
  disabledEdit?: boolean
}

const DataTable = (props: Props) => {
  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   },
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]);
  // //   }
  // // });

  const handleDelete = (id: any) => {
    //delete the item
    // mutation.mutate(id)
    console.log(id)
  }

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    headerAlign: 'center',
    width: 70,
    align: "center",
    renderCell: (params) => {
      const id = props.customId ? params.row[props.customId] : params.id
      return (
        <div className="action">
          {props.disabledEdit ? (
            <></>
          ) : (
            <Link to={`/${props.slug}/${id}`}>
              <img src="/view.svg" alt="" />
            </Link>
          )}
          <div className="delete" onClick={() => handleDelete(id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      )
    },
  }

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[actionColumn, ...props.columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        getRowId={(row) => row._id || row.id}
      />
    </div>
  )
}

export default DataTable
