import "./styles/global.scss"
import { RouterProvider } from "react-router-dom"
import routes from "./Route"
import { AuthContextProvider } from "./context/AuthContext"
import { FilterContextProvider } from "./context/FilterContext"

const App = () => {
  return (
    <AuthContextProvider>
      <FilterContextProvider>
        <RouterProvider router={routes} />
      </FilterContextProvider>
    </AuthContextProvider>
  )
}

export default App
