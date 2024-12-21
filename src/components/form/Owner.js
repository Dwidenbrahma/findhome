import React, { useState, useEffect } from "react";
import OwnerHeader from "../header/OwnerHeader";
import Ownercss from "./Ownercss.module.css";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import axios from "axios";
//import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import url from "../../url";

const imageCollection = [img1, img2, img3];

const style = {
  color: "red",
};
const style2 = {
  color: "green",
};

const Owner = () => {
  const [index, setRandomIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [formData, setFormData] = useState({
    fName: "",
    email: "",
    password: "",
    profileImage: "", // Will hold the file object
    phone: "",
  });

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Password strength logic
    if (name === "password") {
      if (value.length < 6) {
        setPasswordStrength("Weak");
      } else if (value.length >= 6 && value.length < 10) {
        setPasswordStrength("Moderate");
      } else {
        setPasswordStrength("Strong");
      }
    }
  };

  // Handle file input change for profile image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0], // Save the file object in the state
    });
  };

  useEffect(() => {
    const randomNumber = setInterval(() => {
      setRandomIndex(Math.floor(Math.random() * 3));
    }, 8000);

    return () => clearInterval(randomNumber);
  }, []);

  useEffect(() => {
    if (index != null) {
      console.log(index);
    }
  }, [index]);

  const backgroundStyle = {
    backgroundImage: `url(${imageCollection[index]})`,
    backgroundSize: "cover", // To make the image cover the entire element
    backgroundPosition: "center", // To center the image
    height: "100vh", // Full viewport height
    opacity: 1, // Fade effect
    transition: "opacity 1.5s ease-in-out",
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object to send to the backend
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.fName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("profileImage", formData.profileImage); // Append the file
    formDataToSend.append("phone", formData.phone);

    try {
      // Send the form data via Axios
      const response = await axios.post(`${url}list/register`, formDataToSend, {
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
      <header className={Ownercss.header}>
        <OwnerHeader name="Login" />
      </header>

      <main style={backgroundStyle} className={Ownercss.main}>
        <div className={Ownercss.rightContainer}>
          <h1 className={Ownercss.h1}>
            Register to List Your Property Findhome
          </h1>
          <h3 className={Ownercss.h3}>Why Register with Us? </h3>
          <ul className={Ownercss.ul}>
            <li className={Ownercss.li}>
              <span className={Ownercss.span}>
                Reach More Renters & Buyers:
              </span>{" "}
              <br />
              Gain access to thousands of people looking for homes like yours.
            </li>
            <li className={Ownercss.li}>
              <span className={Ownercss.span}>Quick and Simple Process:</span>{" "}
              <br />
              Register and list your property in just a few easy steps.
            </li>
            <li className={Ownercss.li}>
              <span className={Ownercss.span}>Manage Listings Anytime:</span> :
              <br />
              Edit or remove your property listings whenever needed.
            </li>
          </ul>
        </div>
        <form className={Ownercss.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Full Name "
            value={formData.fName}
            name="fName"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Enter your Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />
          <div>
            {isFocused && (
              <label style={passwordStrength === "Strong" ? style2 : style}>
                Password Strength: {passwordStrength}
              </label>
            )}
          </div>
          <input type="file" name="profileImage" onChange={handleFileChange} />
          <input
            type="phone"
            placeholder="Enter your Phone"
            value={formData.phone}
            name="phone"
            onChange={handleChange}
            required
          />

          <button className={Ownercss.btn} type="Submit">
            Submit
          </button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </main>

      <footer className={Ownercss.footer}>
        <Footer />
      </footer>
    </>
  );
};

export default Owner;
