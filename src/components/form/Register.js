import React, { useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import register from "./Register.module.css";
import { Link } from "react-router-dom";
import url from "../../url";

const Register = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "", // Will hold the file object
    phone: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input change for profile image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0], // Save the file object in the state
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send to the backend
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profileImage", formData.profileImage); // Append the file
    formDataToSend.append("phone", formData.phone);

    try {
      // Send the form data via Axios
      const response = await axios.post(`${url}register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      setResponseMessage("Profile created successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      setResponseMessage("Error creating profile.");
      console.error("There was an error!", error);
    }
  };

  return (
    <>
      <header>
        {" "}
        <Header />
      </header>{" "}
      <main>
        {" "}
        <div className={register.middle}>
          <div className={register.ll}>
            <h2 className={register.h2}>Welcome to Findhome!</h2>
            <p className={register.p}>
              Join our community to explore and book your dream home today!
              Creating an account is quick and easy — just fill out the details
              below. Already registered?{" "}
              <Link className={register.link} to="/login">
                Login here
              </Link>
            </p>
          </div>

          <form className={register.form} onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Profile Image:</label>
              <input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <button className={register.button} type="submit">
              Sign Up
            </button>
          </form>

          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </main>
      <footer>
        {" "}
        <Footer />{" "}
      </footer>
    </>
  );
};

export default Register;
