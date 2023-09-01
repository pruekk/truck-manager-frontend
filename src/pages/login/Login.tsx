import "./login.scss"
import CompanyLogo from "/company_logo.png"

import { useNavigate, Link } from "react-router-dom"
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google"
import { GOOGLE } from "../../data"
import { useAuth } from "../../context/AuthContext"
import { useFilter } from "../../context/FilterContext"

const Login = () => {
  const navigate = useNavigate()
  const { loading, error, dispatch: authDispatch } = useAuth()
  const { dispatch: filterDispatch } = useFilter()

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    authDispatch({ type: "LOGIN_START" })
    const result = await fetch(import.meta.env.VITE_LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentialResponse),
    })
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        console.error(err)
      })
    // console.log(result)

    if (!result.error) {
      authDispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: result.customToken,
          email: result.email,
          picture: result.picture,
          displayName: result.displayName,
          isAdmin: result.isAdmin,
          allowedFactories: result.allowedFactories,
          allowedFeatures: result.allowedFeatures,
        },
      })
      filterDispatch({
        type: "SETUP_FILTER_AFTER_LOGIN",
        payload: {
          factory: result.allowedFactories[0],
        },
      })
      navigate("/")
    } else {
      authDispatch({
        type: "LOGIN_FAILURE",
        payload: `${result.message} ${result.email}`,
      })
    }
  }

  const handleLoginFailed = () => {
    authDispatch({
      type: "LOGIN_FAILURE",
      payload: "Error: Unexpected failed to login",
    })
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={CompanyLogo} />
          <p>Truck Manager</p>
        </span>
        <span className="title">Login</span>
        {loading ? (
          <button className="buttonLoad">
            <i className="fa fa-spinner fa-spin"></i>Loading
          </button>
        ) : (
          <GoogleOAuthProvider clientId={GOOGLE.CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailed}
              // type="icon"
              width={250}
            />
          </GoogleOAuthProvider>
        )}
        {error && <h3>{error}</h3>}
        <p>
          You don't have an account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
