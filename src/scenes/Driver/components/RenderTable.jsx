import React from "react";

//Tables
import DataGridTable from '../../../components/DataGridTable';

//Others
import moment from "moment";

//Constants
import { driverColumns } from "../constants/Constants";

export default function DriverTable({ dataRows, onSelectionModelChange, isLoading }) {
    const calculateAge = (birthdate) => {
        const birthDate = moment(birthdate);
        const now = moment();
        const age = moment.duration(now.diff(birthDate));

        const years = age.years();
        const months = age.months();
        const days = age.days();

        return `${years} ปี ${months} เดือน ${days} วัน`;
    }

    const displayDate = (date) => {
        if (!date) {
            return
        }
        return moment(date, moment.defaultFormat).add(0, 'year').format('DD/MM/YYYY')
    }

    const formattedData = dataRows ? dataRows.map(item => {
        return {
          ...item,
          telephone: item.telephone?.replace(/(.{3})(.{3})(.{4})/, "$1-$2-$3"),
          startDate: displayDate(item.startDate),
          birthDate: displayDate(item.birthDate),
          idCard: item.idCard.replace(/(.{1})(.{4})(.{5})(.{2})(.{1})/, "$1-$2-$3-$4-$5"),
          age: calculateAge(item.birthDate),
          ssoStartDate: displayDate(item.ssoStartDate),
          endDate: displayDate(item.endDate),
          ssoEndDate: displayDate(item.ssoEndDate)
        }
    }) : [];

    return (
        <DataGridTable 
            dataRows={formattedData} 
            columns={driverColumns} 
            onSelectionModelChange={onSelectionModelChange} 
            checkboxSelection={true}
            isLoading={isLoading}
        />
    );
}
