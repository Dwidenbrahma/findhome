import login from "./Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import url from "../../url";

const Login = () => {
  const [response, setResponse] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessasge] = useState(null);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleValue = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${url}login`, {
        email: formData.email,
        password: formData.password,
      });

      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      setResponse(response.data.message);
      navigate("/user/dashbord"); // Navigate after setting the token
    } catch (error) {
      console.log("Login error" + error);
      setToken(null);
      localStorage.removeItem("token");

      if (error.response && error.response.data) {
        setErrorMessasge(error.response.data.message || "An error occurred");
      } else {
        setErrorMessasge("An unexpected error occurred. Please try again");
      }
    }
  };

  return (
    <>
      <Link className={login.topLink} to="/">
        <FaHome size={30} />
      </Link>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className={login.container}>
          <h1 className={login.h1}>Sign in</h1>
          <div className={login.container_2}>
            <input
              className={login.input}
              value={formData.email} // Change username to email
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleValue}
            />
            <input
              className={login.input}
              value={formData.password}
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleValue}
            />
            <button className={login.button}>Login</button>
          </div>
          <div className={login.container_1}>
            <span className={login.span2}>Login with</span>
            <span className={login.span}>
              <FcGoogle size={40} />
            </span>
            <span className={login.span}>
              <BsFacebook size={35} />
            </span>
            <div className={login.forgot}>
              <Link className={login.link} to={"/forgot"}>
                Forgot password
              </Link>
              <Link className={login.link2} to={"/register"}>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </form>
      <p>{response}</p> {/* This will display the success message */}
    </>
  );
};

export default Login;
