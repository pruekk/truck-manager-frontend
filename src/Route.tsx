import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import jwt_decode, { JwtPayload } from "jwt-decode"

import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"

import Home from "./pages/home/Home"
import Users from "./pages/users/Users"
import Products from "./pages/products/Products"
import Login from "./pages/login/Login"
import User from "./pages/user/User"
import Product from "./pages/product/Product"

import { useAuth } from "./context/AuthContext"

const queryClient = new QueryClient()

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwt_decode<JwtPayload>(token)
    if (decodedToken && decodedToken.exp) {
      const expirationTime = new Date(decodedToken.exp * 1000)
      const currentTime = new Date()

      return currentTime > expirationTime
    }
    return false
  } catch (error) {
    return false
  }
}

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
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
])

export default routes
