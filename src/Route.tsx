import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState } from "react"

import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"

import PageNotFound from "./pages/404/404"
import Home from "./pages/home/Home"
import Dashboard from "./pages/dashboard/Dashboard"
import Login from "./pages/login/Login"

import Users from "./pages/users/Users"
import Products from "./pages/products/Products"
import Factories from "./pages/factories/Factories"
import Cars from "./pages/cars/Cars"
import Employees from "./pages/employees/Employees"
import Fuels from "./pages/fuels/Fuels"

import User from "./pages/user/User"
import Product from "./pages/product/Product"
import Car from "./pages/car/Car"
import Factory from "./pages/factory/Factory"
import Employee from "./pages/employee/Employee"

import { useAuth } from "./context/AuthContext"
import { isTokenExpired } from "./utils/handleJwt"

const queryClient = new QueryClient()

const Layout = () => {
  const { user, dispatch } = useAuth()
  const token = user?.token || ""
  const [tokenExpired, setTokenExpired] = useState(false)

  const [theme, setTheme] = useState("dark")
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    if (isTokenExpired(token)) {
      setTokenExpired(true)
      dispatch({ type: "LOGOUT" })
    }
  }, [])

  if (!user || tokenExpired) return <Navigate to="/login" />
  return (
    <div className="main" app-theme={theme}>
      <Navbar theme={theme} handleThemeChange={toggleTheme} />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound theme="dark" />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/factories",
        element: <Factories />,
      },
      {
        path: "/factories/:id",
        element: <Factory />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/cars/:id",
        element: <Car />,
      },
      {
        path: "/employees",
        element: <Employees />,
      },
      {
        path: "/employees/:id",
        element: <Employee />,
      },
      {
        path: "/fuels",
        element: <Fuels />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login theme="dark" />,
  },
])

export default routes
