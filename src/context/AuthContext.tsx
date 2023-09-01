import { createContext, useEffect, useReducer, useContext } from "react"
import {
  checkAdminPermission,
  getAllowedFactories,
  getAllowedFeatures,
} from "../utils/handleJwt"

interface Action {
  type: string
  payload?: any
}

export interface Factories {
  factoryId: string
  factoryName: string
}

export interface Features {
  name: string
  view: boolean
  add: boolean
  edit: boolean
  delete: boolean
}

export interface User {
  token: string
  email: string
  picture: string
  displayName: string
  isAdmin: boolean
  allowedFactories: Factories[]
  allowedFeatures: Features[]
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  dispatch: React.Dispatch<Action>
}

const noUser = {
  token: "",
  email: "",
  picture: "",
  displayName: "",
  isAdmin: false,
  allowedFactories: [],
  allowedFeatures: [],
}
const token = sessionStorage.getItem("customToken") ?? ""
const email = sessionStorage.getItem("email") ?? ""
const picture = sessionStorage.getItem("picture") ?? ""
const displayName = sessionStorage.getItem("displayName") ?? ""
const isAdmin = checkAdminPermission(token)
const allowedFactories = getAllowedFactories(token)
const allowedFeatures = getAllowedFeatures(token)

const INITIAL_STATE: AuthState = {
  user: sessionStorage.getItem("customToken")
    ? {
        token: token,
        email: email,
        picture: picture,
        displayName: displayName,
        isAdmin: isAdmin,
        allowedFactories: allowedFactories,
        allowedFeatures: allowedFeatures,
      }
    : null,
  loading: false,
  error: null,
  dispatch: () => {},
}

export const AuthContext = createContext<AuthState>(INITIAL_STATE)

const AuthReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const user = authState.user ?? noUser

  useEffect(() => {
    sessionStorage.setItem("customToken", user.token)
    sessionStorage.setItem("email", user.email)
    sessionStorage.setItem("picture", user.picture)
    sessionStorage.setItem("displayName", user.displayName)
  }, [authState])

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
