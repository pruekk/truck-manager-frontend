import "./login.scss"
import CompanyLogo from "/company_logo.png";

import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { GOOGLE } from "../../data";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    dispatch({ type: "LOGIN_START" });
    const customToken = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentialResponse)
    }).then(res => {
      return res.json();
    }).catch((err) => {
      console.error(err);
    })

    if (customToken) {
      dispatch({ type: "LOGIN_SUCCESS", payload: customToken });
      navigate("/");
    }
  }

  const handleLoginFailed = () => {
    dispatch({ type: "LOGIN_FAILURE", payload: "Error: Login Failed" });
    console.error('Login Failed!');
}

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">
          <img src={CompanyLogo} />
          <p>Truck Manager</p>
        </span>
        <span className="title">Login</span>
        <GoogleOAuthProvider clientId={GOOGLE.clientId}>
          <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailed}
              // type="icon"
              width={250}
          />
        </GoogleOAuthProvider>
        <p>You don't have an account? <Link className="link" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
