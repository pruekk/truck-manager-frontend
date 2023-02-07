import React from "react";

//Material UI
import IconButton from "@mui/material/IconButton";

//Icons
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

export default function OilDeliveryInfoTableModal(props) {
    const handleAddColumn = () => {
        props.oilInfoArr.push({
            name: "",
            value: ""
        });

        props.setOilInfoArr([...props.oilInfoArr]);
    }

    const onChangeOilInfo = (event, index) => {
        props.oilInfoArr[index][`${event.target.name}`] = event.target.value;

        props.setOilInfoArr(props.oilInfoArr);
    }

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
                    {props.oilInfoArr?.map((obj, index) => {
                        return (
                            <tr
                                key={`tr-${obj.name}-${obj.value}-${index}`}
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
                                    }}
                                >
                                    <input
                                        name="name"
                                        type="string"
                                        defaultValue={obj.name}
                                        style={{
                                            width: "100px",
                                            textAlign: "center",
                                            borderColor: "transparent",
                                        }}
                                        onChange={(event) => { onChangeOilInfo(event, index) }}
                                    />
                                </td>
                                <td
                                    key={`${obj.name}-${obj.value}`}
                                    style={{
                                        border: "1px solid black",
                                        borderCollapse: "collapse",
                                        textAlign: "center",
                                    }}
                                >
                                    <input
                                        name="value"
                                        type="string"
                                        defaultValue={obj.value}
                                        style={{
                                            width: "100px",
                                            textAlign: "center",
                                            borderColor: "transparent",
                                        }}
                                        onChange={(event) => { onChangeOilInfo(event, index) }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    <tr
                        key="table-add-button"
                        style={{
                            border: "1px solid black",
                            borderCollapse: "collapse",
                            height: "30px"
                        }}
                    >
                        <td
                            key="add-button"
                            style={{
                                border: "1px solid black",
                                borderCollapse: "collapse",
                                textAlign: "center",
                            }}
                            colSpan="2"
                        >
                            <IconButton
                                aria-label="add-button"
                                onClick={() => {
                                    handleAddColumn();
                                }}
                            >
                                <AddBoxRoundedIcon />
                            </IconButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    );
}
