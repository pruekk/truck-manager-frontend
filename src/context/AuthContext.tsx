import { createContext, useEffect, useReducer, useContext } from "react";

interface Action {
  type: string;
  payload?: any;
}

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
  dispatch: React.Dispatch<Action>;
}

const INITIAL_STATE: AuthState = {
  user: localStorage.getItem("user") || null,
  loading: false,
  error: null,
  dispatch: () => {}
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

const AuthReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    state.user && localStorage.setItem("user", state.user);
    localStorage.setItem("loading", state.loading.toString());
    state.error && localStorage.setItem("error", state.error);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
