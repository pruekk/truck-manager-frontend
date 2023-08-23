import { createContext, useEffect, useReducer, useContext } from "react"

interface Action {
  type: string
  payload?: any
}

interface User {
  token: string | null
  email: string | null
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  dispatch: React.Dispatch<Action>
}

const INITIAL_STATE: AuthState = {
  user: localStorage.getItem("customToken")
    ? {
        token: localStorage.getItem("customToken"),
        email: null,
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

  useEffect(() => {
    authState.user?.token &&
      localStorage.setItem("customToken", authState.user.token)
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
