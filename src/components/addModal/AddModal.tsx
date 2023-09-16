import { GridColDef } from "@mui/x-data-grid"
import "./addModal.scss"
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  slug: string
  columns: GridColDef[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Add = (props: Props) => {
  // TEST THE API

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return fetch(`http://localhost:8800/api/${props.slug}s`, {
  //       method: "post",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: 111,
  //         img: "",
  //         lastName: "Hello",
  //         firstName: "Test",
  //         email: "testme@gmail.com",
  //         phone: "123 456 789",
  //         createdAt: "01.02.2023",
  //         verified: true,
  //       }),
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries([`all${props.slug}s`]);
  //   },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //add new item
    // mutation.mutate();
    props.setOpen(false)
  }

  const handleClose = () => {
    props.setOpen(false)
    document.body.style.overflowY = "unset"
  }

  document.body.style.overflowY = "hidden"
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={handleClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "editBy"
            )
            .map((column) => (
              <div className="item">
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Add
