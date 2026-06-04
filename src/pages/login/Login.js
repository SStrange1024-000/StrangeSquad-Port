import React, { useState } from "react";
import "./Login.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utilities/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../Utilities/localStorage";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/slices/appConfigSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [secretKey, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location=useLocation();
  const [alert, setAlert] = useState("");
  const dispatch=useDispatch()
  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const result = await axiosClient.post("/auth/adminLogin", {
        email,
        secretKey,
        password,
      });


      setAlert(result.error);

      setTimeout(() => {
        setAlert("");
      }, 5000);


      // ✅ FIXED: Store token and redirect properly
      if (result.statusCode === 200 && result.message?.accessToken) {
        // Store the token
        setItem(KEY_ACCESS_TOKEN, result.message?.accessToken);
        
        // Smart redirect: go back where user came from, or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }

      console.log(result);

    } catch (er) {
      console.log("Login message", er);
      
      setAlert(er);
      setTimeout(() => {
        setAlert("");
      }, 5000);
    }finally{
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="Login center">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Secret Code"
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="links btn1">
          Login
        </button>
        {/* <p>{isLogged}</p> */}
        <p className="subheading">
          Registered Here <Link to="/signup">Signup</Link>{" "}
        </p>

        {alert && <p className="alert">{alert}</p>}
      </form>
    </div>
  );
}

export default Login;
