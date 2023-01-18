import React, { useEffect } from "react";

//Material UI
import IconButton from "@mui/material/IconButton";

//Icons
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

//Functions
import { calculateSum } from "../../../functions/TableFunctions";

export default function OilTransactionTableModal(props) {
  const [sumY, setSumY] = React.useState([]);
  const [isCheckedY, setIsCheckedY] = React.useState([]);

  useEffect(() => {
    preparePriceList();
    checkSum();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const preparePriceList = () => {
    if (props.selectedRow?.length === 1 && props.isEdit) {
      const toEditArr = JSON.parse(JSON.stringify(props.selectedRow[0].arr));
      props.setPriceListArr([...toEditArr]);
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

  const onChangeValue = async (event, xAxis, index) => {
    props.priceListArr.filter((obj) => obj.name === xAxis)[0].value[index] =
      Number(event.target.value);
  };

  const onChangeRowKey = (event, index) => {
    props.priceListArr[index].name = event.target.value;
  };

  const checkSum = () => {
    calculateSumY();
  }

  const checkSumY = (event, index) => {
    isCheckedY[index] = Number(event.target.value);
    setIsCheckedY([...isCheckedY]);

    checkSumAll();
  }

  const calculateSumY = () => {
    let tempYArr = [];
    props.priceListArr[0].value.map((obj, index) => {
      let tempArr = [];
      props.priceListArr.map((obj, xIndex) => {
        tempArr[xIndex] = obj.value[index];

        return tempArr;
      })

      tempYArr[index] = calculateSum(tempArr)

      return tempYArr;
    });

    setSumY(tempYArr);
  }

  const checkSumAll = () => {
    props.setIsSumCorrect(calculateSum(sumY) === calculateSum(isCheckedY));
  }

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
            <th
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <IconButton
                aria-label="add-button"
                onClick={() => {
                  handleAddColumn();
                }}
              >
                <AddBoxRoundedIcon />
              </IconButton>
            </th>
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
                    fontWeight: "bold"
                  }}
                >
                  <input
                    type="string"
                    defaultValue={obj.name}
                    onChange={(event) => {
                      onChangeRowKey(event, index);
                    }}
                    onBlur={checkSum}
                    style={{
                      width: "60px",
                      textAlign: "center",
                      borderColor: "transparent",
                      fontWeight: "bold",
                    }}
                  />
                </td>

                {/*======= ROW =======*/}
                {obj.value.map((value, index) => {
                  return (
                    <td
                      key={`rowY-${index}`}
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                      }}
                    >
                      <input
                        type="string"
                        defaultValue={value}
                        onChange={(event) => {
                          onChangeValue(event, obj.name, index);
                        }}
                        onBlur={checkSum}
                        style={{
                          width: "60px",
                          textAlign: "end",
                          borderColor: "transparent",
                        }}
                      />
                    </td>
                  );
                })}
                <td
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    textAlign: "center",
                    fontWeight: "bold",
                    minWidth: "60px",
                  }}
                />
              </tr>
            );
          })}

          <tr
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
              <IconButton aria-label="add-button" onClick={handleAddRow}>
                <AddBoxRoundedIcon />
              </IconButton>
            </td>
          </tr>

          <tr
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
                disabled
                type="string"
                defaultValue="Total"
                style={{
                  width: "60px",
                  textAlign: "center",
                  borderColor: "transparent",
                  fontWeight: "bold"
                }}
              />
            </td>

            {/*======= ROW =======*/}
            {props.priceListArr[0].value.map((value, rYIndex) => {
              return (
                <td
                  key={`totalrow-${rYIndex}`}
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    textAlign: "right",
                    width: "60px",
                  }}
                >
                  <input
                    type="string"
                    onBlur={(event) => {
                      checkSumY(event, rYIndex);
                    }}
                    style={{
                      width: "60px",
                      textAlign: "end",
                      borderColor: "transparent",
                      backgroundColor: isCheckedY[rYIndex] ? (isCheckedY[rYIndex] === sumY[rYIndex] ? "white" : "red") : "",
                      color: isCheckedY[rYIndex] ? (isCheckedY[rYIndex] === sumY[rYIndex] ? "" : "white") : ""
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
