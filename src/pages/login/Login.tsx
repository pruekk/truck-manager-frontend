import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE } from "../../data";

import CompanyLogo from "/company_logo.png";
import "./login.scss"

const Login = () => {
  const navigate = useNavigate();

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
              onSuccess={async credentialResponse => {
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

                localStorage.setItem('user', customToken);
                navigate("/");
              }}
              onError={() => {
                  console.log('Login Failed');
              }}
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
