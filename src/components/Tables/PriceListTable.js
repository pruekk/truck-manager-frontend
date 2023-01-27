import React from "react";

//CSS
import "./PriceListTable.css";

export default function PriceListTable(props) {
  return (
    <div>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr style={{ border: "1px solid black", borderCollapse: "collapse", backgroundColor: "#FBFBFB" }}>
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse", backgroundColor: "#FBFBFB" }}
            />
            {props.priceListArr[0].value.map((value, index) => {
              return (
                <th
                  key={`col-${index}`}
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    height: "30px",
                  }}
                >
                  {(0.25 * (index + 1)).toFixed(2)}
                </th>
              );
            })}
          </tr>

          <React.Fragment>
            {props.priceListArr.map((yValue, index) => (
              <tr
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  backgroundColor: "#FBFBFB"
                }}
                key={`${yValue.name}-${index}`}
              >
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    height: "30px",
                    minWidth: "40px",
                  }}
                >
                  {yValue.name}
                </td>
                {props.priceListArr
                  .filter((obj) => obj.name === yValue.name)[0]
                  .value.map((data, index) => {
                    return (
                      <td
                        key={`${data}-${index}`}
                        style={{
                          border: "1px solid black",
                          borderCollapse: "collapse",
                          textAlign: "right",
                          height: "30px",
                          minWidth: "70px",
                        }}
                      >
                        {data.toFixed(2)}
                      </td>
                    );
                  })}
              </tr>
            ))}
          </React.Fragment>
        </tbody>
      </table>
    </div>
  );
}
