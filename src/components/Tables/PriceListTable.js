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
        <tr style={{ border: "1px solid black", borderCollapse: "collapse" }}>
          <th
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          />
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
        </tr>

        <React.Fragment>
          {props.priceListArr.map((yValue, index) => (
            <tr
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
              }}
              key={`${yValue.name}-${index}`}
            >
              <td
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  textAlign: "center",
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
                        textAlign: "end",
                      }}
                    >
                      {data.toFixed(2)}
                    </td>
                  );
                })}
            </tr>
          ))}
        </React.Fragment>
      </table>
    </div>
  );
}
