import React, { useState, useContext } from "react";
import axios from "axios";
import OwnerHeader from "../header/OwnerHeader";
import Ownerlogin from "./OwnerLogin.module.css";
import { OwnerAuthContext } from "../OwnerContextAuth";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import url from "../../url";

const OwnerLogin = () => {
  const { setOwnerToken } = useContext(OwnerAuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({}); // Clear errors if any
    try {
      const response = await axios.post(`${url}owner/login`, {
        email: formData.email,
        password: formData.password,
      });

      setResponseMessage("Login successful!");
      setOwnerToken(response.data.ownerToken || "No token returned");

      // Optionally, save the token to localStorage
      localStorage.setItem("ownerToken", response.data.ownerToken);
      navigate("/owner/dash");
    } catch (error) {
      setResponseMessage("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <header className={Ownerlogin.header}>
        <OwnerHeader name="SignUp" />
      </header>

      <main className={Ownerlogin.main}>
        <form onSubmit={handleSubmit} className={Ownerlogin.loginForm}>
          <h2>Login</h2>

          {/* Email Field */}
          <div>
            <input
              className={Ownerlogin.input}
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
            {errors.email && (
              <small style={{ color: "red" }}>{errors.email}</small>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div style={{ position: "relative" }}>
              <input
                className={Ownerlogin.input}
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your Password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "20%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#000",
                }}>
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <small style={{ color: "red" }}>{errors.password}</small>
            )}
          </div>

          {/* Submit Button */}
          <button className={Ownerlogin.btn} type="submit">
            Login
          </button>
        </form>

        {/* Response Message */}
        {responseMessage && <p>{responseMessage}</p>}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default OwnerLogin;
