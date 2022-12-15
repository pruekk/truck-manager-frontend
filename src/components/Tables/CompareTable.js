import React from "react";

//Material UI
import IconButton from "@mui/material/IconButton";

//Icons
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { generateString } from "../../functions/TableFunctions";

//CSS

export default function CompareTable(props) {
  const [xAxis, setXAxis] = React.useState([
    0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5,
    3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0,
  ]);
  const [yAxis, setYAxis] = React.useState([]);

  const handleAddColumn = () => {
    xAxis.push(xAxis[xAxis.length - 1] + 0.25);
    setXAxis([...xAxis]);
  };

  const handleAddRow = () => {
    const randomString = generateString(1);
    yAxis.push({
      name: randomString.toUpperCase(),
      value: xAxis,
    });
    setYAxis([...yAxis]);
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
          {xAxis.map((value, index) => {
            return (
              <th
                key={`col-${index}`}
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {value.toFixed(2)}
              </th>
            );
          })}
          {props.isEditable && (
            <IconButton
              aria-label="add-button"
              onClick={() => {
                handleAddColumn();
              }}
            >
              <AddBoxRoundedIcon />
            </IconButton>
          )}
        </tr>
        {!props.isEditable && (
          <tr
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
            >
              T
            </td>
            {xAxis.map((value, index) => {
              return (
                <td
                  key={`${value}-${index}`}
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  {value}
                </td>
              );
            })}
          </tr>
        )}
        {yAxis.map((obj, index) => {
          return (
            <tr
              key={`${obj.name}-${index}`}
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                {obj.name}
              </td>
              {obj.value.map((value, index) => {
                return (
                  <td
                    key={`${value}-${index}`}
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse"
                    }}
                  >
                    <input type="string" style={{ width: "30px" }} />
                  </td>
                );
              })}
            </tr>
          );
        })}
        {props.isEditable && (
          <IconButton aria-label="add-button" onClick={handleAddRow}>
            <AddBoxRoundedIcon />
          </IconButton>
        )}
      </table>
    </div>
  );
}
