import React from "react";

//Material UI
import IconButton from "@mui/material/IconButton";

//Icons
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { generateString } from "../../functions/TableFunctions";

//CSS
import './CompareTable.css'

export default function CompareTable(props) {
  const [xAxis, setXAxis] = React.useState([
    0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5,
    3.75, 4.0, 4.25, 4.5, 4.75, 5.0, 5.25, 5.5, 5.75, 6.0, 6.25, 6.5, 6.75, 7.0,
  ]);
  const [values, setValues] = React.useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [yAxis, setYAxis] = React.useState([
    {name: "L", value: values},
    {name: "Y", value: values},
    {name: "Z", value: values},
    {name: "1", value: values},
    {name: "2", value: values},
    {name: "3", value: values},
    {name: "4", value: values},
    {name: "5", value: values},
    {name: "6", value: values},
    {name: "7", value: values},
    {name: "8", value: values},
    {name: "A", value: values},
    {name: "B", value: values},
    {name: "C", value: values},
    {name: "D", value: values},
  ]);
  

  const handleAddColumn = () => {
    xAxis.push(xAxis[xAxis.length - 1] + 0.25);
    setXAxis([...xAxis]);
    values.push(0);
    setValues([...values]);
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
          <React.Fragment>
            {yAxis.map((yValue, index) => (
              <tr
                style={{ border: "1px solid black", borderCollapse: "collapse" }}
                key={`${yValue.name}-${index}`}
              >
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    textAlign: "center"
                  }}
                >
                  {yValue.name}
                </td>
                {yValue.value.map((data, index) => {
                  return (
                    <td
                      key={`${data}-${index}`}
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        textAlign: "end"
                      }}
                    >
                      {data.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </React.Fragment>
        )}
        {/* Modal */}
        {props.isEditable && yAxis.map((obj, index) => {
          return (
            <tr
              key={`${obj.name}-${index}`}
              style={{ border: "1px solid black", borderCollapse: "collapse", height: "30px" }}
            >
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  textAlign: "center",
                  fontWeight: "bold"
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
                      borderCollapse: "collapse",
                    }}
                  >
                    <input type="string" style={{ 
                      width: "60px", 
                      textAlign: "end",
                      borderColor: "transparent",
                    }} />
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
