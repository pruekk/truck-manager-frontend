import { useState } from "react"
import { DateRange, Range, RangeFocus } from "react-date-range"
import Select from "react-select"

import "./navbar.scss"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import DateFormat from "../../utils/DateFormat"
import { Factories, useAuth } from "../../context/AuthContext"
import { useFilter } from "../../context/FilterContext"

const Navbar = () => {
  const { user, dispatch: authDispatch } = useAuth()
  const { date, factory, dispatch: filterDispatch } = useFilter()
  const [openDate, setOpenDate] = useState(false)

  const handleSetDate = (dateList: Range[]) => {
    filterDispatch({ type: "SET_DATE", payload: dateList })
  }

  const handleCloseDate = (focus: RangeFocus) => {
    if (focus[1] === 0) {
      setOpenDate(false)
    }
  }

  const factoryOptions = user?.allowedFactories || []
  const handleFactoryChanged = (fac: Factories) => {
    filterDispatch({ type: "SET_FACTORY", payload: fac })
  }

  const handleSignOut = () => {
    filterDispatch({ type: "REMOVE_FILTER_AFTER_LOGOUT" })
    authDispatch({ type: "LOGOUT" })
  }

  return (
    <div className="navbar">
      <div className="logo">
        <img src="company_logo.png" alt="" />
        <span>Truck Manager</span>
      </div>
      <div className="icons">
        <div className="headerSearchItem">
          {/* <i className="fa-regular fa-calendar-days"></i> */}
          <button
            onClick={() => setOpenDate(!openDate)}
            className="headerSearchText"
          >
            {DateFormat(date[0].startDate)}{" "}
            <i className="fa-solid fa-chevron-right"></i>{" "}
            {DateFormat(date[0].endDate)}
          </button>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              onChange={(item) => handleSetDate([item.selection])}
              onRangeFocusChange={(focus) => handleCloseDate(focus)}
            />
          )}
        </div>
        {/* <i className="fa-regular fa-building"></i> */}
        <div className="filterFactory">
          <Select
            isSearchable
            options={factoryOptions}
            defaultValue={factory}
            getOptionLabel={(option) => option.factoryName}
            getOptionValue={(option) => option.factoryId}
            onChange={(fac) => fac && handleFactoryChanged(fac)}
          />
        </div>
        {/* <img src="/search.svg" alt="" className="icon" /> */}
        {/* <img src="/app.svg" alt="" className="icon" /> */}
        {/* <img src="/expand.svg" alt="" className="icon" /> */}

        {/* <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div> */}
        <div className="user">
          <img src={user?.picture ? user.picture : undefined} alt="" />
          <span>{user?.displayName}</span>
          <i
            className="fa-solid fa-right-from-bracket"
            onClick={handleSignOut}
          ></i>
        </div>
        {/* <img src="/settings.svg" alt="" className="icon" /> */}
      </div>
    </div>
  )
}

export default Navbar
