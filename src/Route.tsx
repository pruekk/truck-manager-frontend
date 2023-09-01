import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"

import Home from "./pages/home/Home"
import Users from "./pages/users/Users"
import Products from "./pages/products/Products"
import Cars from "./pages/cars/Cars"
import Login from "./pages/login/Login"
import User from "./pages/user/User"
import Product from "./pages/product/Product"
import Car from "./pages/car/Car"

import { useAuth } from "./context/AuthContext"
import { isTokenExpired } from "./utils/handleJwt"

const queryClient = new QueryClient()

const Layout = () => {
  const { user } = useAuth()
  const token = user?.token || ""

  if (!user || isTokenExpired(token)) {
    return <Navigate to="/login" />
  }

  return (
    <div className="main">
      <Navbar />
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
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/cars/:id",
        element: <Car />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default routes
