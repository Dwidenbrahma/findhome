import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../header/Header";
//import Footer from "../footer/Footer";
import url from "../../url";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const { id } = useParams();
  const [message, setMessage] = useState("");

  // Decode the token from localStorage and extract the userId
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}reserve/${id}`,
        {
          startDate: formData.startDate,
          endDate: formData.endDate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Use token from localStorage
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <>
      <header>
        <Nav />
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Reserve</button>
        {message && <p>{message}</p>}
      </form>
      <footer>{/* <Footer /> */}</footer>
    </>
  );
};
export default Form;
