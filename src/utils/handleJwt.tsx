import jwt_decode from "jwt-decode"
import { Factories, Features } from "../context/AuthContext"

interface CustomJWT {
  id: string
  email: string
  isAdmin: boolean
  allowedFactories: Factories[]
  allowedFeatures: Features[]
  is_actived: boolean
  iat: number
  exp: number
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwt_decode<CustomJWT>(token)
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

const checkAdminPermission = (token: string): boolean => {
  try {
    const decodedToken = jwt_decode<CustomJWT>(token)
    return decodedToken.isAdmin
  } catch (error) {
    return false
  }
}

const getAllowedFactories = (token: string): Factories[] => {
  try {
    const decodedToken = jwt_decode<CustomJWT>(token)
    if (decodedToken) {
      const allowedFactories = decodedToken.allowedFactories

      return allowedFactories
    }
    return []
  } catch (error) {
    return []
  }
}

const getAllowedFeatures = (token: string): Features[] => {
  try {
    const decodedToken = jwt_decode<CustomJWT>(token)
    if (decodedToken) {
      const allowedFeatures = decodedToken.allowedFeatures

      return allowedFeatures
    }
    return []
  } catch (error) {
    return []
  }
}

export {
  isTokenExpired,
  getAllowedFactories,
  getAllowedFeatures,
  checkAdminPermission,
}
