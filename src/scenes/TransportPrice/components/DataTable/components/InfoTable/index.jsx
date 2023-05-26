import React from "react";
import './highlight.css';

export default function InfoTable(props) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th />
            {props.priceListArr[0].value.map((value, index) => {
              return (
                <th key={`col-${index}`}>
                  {(0.25 * (index + 1)).toFixed(2)}
                </th>
              );
            })}
          </tr>

          <React.Fragment>
            {props.priceListArr.map((yValue, index) => (
              <tr key={`${yValue.name}-${index}`}>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  {yValue.name}
                </th>
                {props.priceListArr
                  .filter((obj) => obj.name === yValue.name)[0]
                  .value.map((data, index) => {
                    return (
                      <td key={`${data}-${index}`}>
                        {data === 0 ? "-" : data.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
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
