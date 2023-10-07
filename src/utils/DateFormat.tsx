import dayjs from "dayjs"

const DateFormat = (date: Date | any) => {
  return dayjs(date).format("DD/MM/YYYY")
}

export default DateFormat
