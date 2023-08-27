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

const Login = () => {
  const navigate = useNavigate()
  const { loading, error, dispatch } = useAuth()

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    dispatch({ type: "LOGIN_START" })
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

    if (!result.error) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          token: result.customToken,
          email: result.email,
        },
      })
      navigate("/")
    } else {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: `${result.message} ${result.email}`,
      })
    }
  }

  const handleLoginFailed = () => {
    dispatch({
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
