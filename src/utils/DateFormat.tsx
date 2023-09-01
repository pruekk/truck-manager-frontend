import dayjs from "dayjs"

const DateFormat = (date: Date | any) => {
  return dayjs(date).format("DD MMM YYYY")
}

export default DateFormat
