import React, { useEffect } from "react";

export default function InfoTable(props) {
  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <table
        style={{
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr
            key="table-header"
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
                fontWeight: "bold"
              }}
            >
              รหัสน้ำมัน
            </td>
            <td
              style={{
                border: "1px solid black",
                borderCollapse: "collapse",
                textAlign: "center",
                fontWeight: "bold"
              }}
            >
              ข้อมูลน้ำมัน
            </td>
          </tr>
          {props.priceListArr?.map((obj, index) => {
            return (
              <tr
                key={`tr-${obj.name}-${obj.value}`}
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  height: "30px",
                }}
              >
                <td
                  key={`${obj.name}`}
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    width: "100px",
                  }}
                >
                  {obj.name}
                </td>
                <td
                  key={`${obj.name}-${obj.value}`}
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    width: "100px",
                  }}
                >
                  {obj.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
}
