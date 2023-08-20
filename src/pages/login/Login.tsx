import { useNavigate, Link } from "react-router-dom";
import CompanyLogo from "/company_logo.png";
import GoogleLogo from "/google.png";
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
        <button className="loginWithGoogle" onClick={() => navigate("/")}>
          <img src={GoogleLogo} /> 
          Sign in with Google
        </button>
        <p>You don't have an account? <Link className="link" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
