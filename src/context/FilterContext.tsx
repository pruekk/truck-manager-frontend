import { createContext, useReducer, useContext, useEffect } from "react"
import { Range } from "react-date-range"
import { Factories } from "./AuthContext"
import dayjs from "dayjs"

interface Action {
  type: string
  payload?: any
}

interface FilterState {
  date: Range[]
  factory: Factories | null
  dispatch: React.Dispatch<Action>
}

const start = dayjs()
const end = start.add(10, "hour")
const INIT_DATE: Range[] = [
  { startDate: start.toDate(), endDate: end.toDate(), key: "selection" },
]

const factory = sessionStorage.getItem("factory") ?? "{}"
const localDate = sessionStorage.getItem("date")
let date: Range[]
if (localDate) {
  const parseLocalDate = JSON.parse(localDate)
  date = [
    {
      startDate: dayjs(parseLocalDate[0]?.startDate).toDate(),
      endDate: dayjs(parseLocalDate[0]?.endDate).toDate(),
      key: "selection",
    },
  ]
} else {
  date = INIT_DATE
}

const INITIAL_STATE: FilterState = {
  date: date,
  factory: JSON.parse(factory),
  dispatch: () => {},
}

export const FilterContext = createContext<FilterState>(INITIAL_STATE)

const FilterReducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case "SETUP_FILTER_AFTER_LOGIN":
      return {
        ...state,
        date: INITIAL_STATE.date,
        factory: action.payload.factory,
      }
    case "SET_DATE":
      return {
        ...state,
        date: action.payload,
      }
    case "SET_FACTORY":
      return {
        ...state,
        factory: action.payload,
      }
    case "REMOVE_FILTER_AFTER_LOGOUT":
      return {
        ...state,
        date: [],
        factory: null,
      }
    case "RESET_FILTER":
      return INITIAL_STATE
    default:
      return state
  }
}

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(FilterReducer, INITIAL_STATE)

  useEffect(() => {
    sessionStorage.setItem("factory", JSON.stringify(state.factory))
    sessionStorage.setItem("date", JSON.stringify(state.date))
  }, [state])

  return (
    <FilterContext.Provider
      value={{
        date: state.date,
        factory: state.factory,
        dispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = (): FilterState => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilter must be used within an AuthProvider")
  }
  return context
}
