import React, { useEffect } from "react";

//Material UI
import IconButton from "@mui/material/IconButton";

//Icons
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

//CSS
import "./PriceListTable.css";

export default function PriceListTableModal(props) {
  useEffect(() => {
    preparePriceList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const preparePriceList = () => {
    if (props.selectedRow.length === 1) {
      props.setPriceListArr([...props.selectedRow[0].arr]);
    }
  }

  const handleAddColumn = async () => {
    props.priceListArr.map(async (obj, index) => {
      props.priceListArr[index].value.push(0);
    });

    props.setPriceListArr([...props.priceListArr]);
  };

  const handleAddRow = () => {
    props.priceListArr.push({
      name: "",
      value: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0,
      ],
    });

    props.setPriceListArr([...props.priceListArr]);
  };

  const onChangeValue = (event, xAxis, index) => {
    props.priceListArr.filter((obj) => obj.name === xAxis)[0].value[index] =
      Number(event.target.value);
  };

  const onChangeRowKey = (event, index) => {
    props.priceListArr[index].name = event.target.value;
  };

  return (
    <div>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <tr style={{ border: "1px solid black", borderCollapse: "collapse" }}>
          <th
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          />

          {/*Modal table header*/}
          {props.priceListArr[0].value.map((value, index) => {
            return (
              <th
                key={`col-${index}`}
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {(0.25 * (index + 1)).toFixed(2)}
              </th>
            );
          })}
          <IconButton
            aria-label="add-button"
            onClick={() => {
              handleAddColumn();
            }}
          >
            <AddBoxRoundedIcon />
          </IconButton>
        </tr>

        {/*Modal input*/}
        {props.priceListArr?.map((obj, index) => {
          return (
            /*======= Column =======*/
            <tr
              key={`${obj.name}-${index}`}
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
                height: "30px",
              }}
            >
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="string"
                  defaultValue={obj.name}
                  onChange={(event) => {
                    onChangeRowKey(event, index);
                  }}
                  style={{
                    width: "60px",
                    textAlign: "center",
                    borderColor: "transparent",
                    fontWeight: "bold"
                  }}
                />
              </td>

              {/*======= ROW =======*/}
              {obj.value.map((value, index) => {
                return (
                  <td
                    key={`${value}-${index}`}
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                    }}
                  >
                    <input
                      type="string"
                      defaultValue={props.isEdit ? value : ""}
                      onChange={(event) => {
                        onChangeValue(event, obj.name, index);
                      }}
                      style={{
                        width: "60px",
                        textAlign: "end",
                        borderColor: "transparent",
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
        <IconButton aria-label="add-button" onClick={handleAddRow}>
          <AddBoxRoundedIcon />
        </IconButton>
      </table>
    </div>
  );
}
