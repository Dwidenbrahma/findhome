import React, { useState, useContext, useMemo } from "react";
import axios from "axios";
import housePost from "./HousePost.module.css";
import { Link, Navigate } from "react-router-dom";
import { OwnerAuthContext } from "../OwnerContextAuth";
import url from "../../url";

const HousePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    city: "",
    state: "",
    country: "",
    type: "Apartment", // Default value
    price: 0,
    rating: 0,
    numReviews: 0,
    bedrooms: 0,
    bathrooms: 0,
    guests: 0,
    amenities: "",
    images: [],
    availability: "",
    reviews: [],
  });

  const { ownerToken, loading } = useContext(OwnerAuthContext);
  const owner_id = useMemo(() => {
    if (ownerToken) {
      const payload = ownerToken.split(".")[1];
      return JSON.parse(atob(payload)).userId;
    }
    return null;
  }, [ownerToken]);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;

    if (type === "file") {
      if (files) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files), // Keep as an array for files
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // Store input as a string directly
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        // Handle multiple images as an array
        formData[key].forEach((file) => {
          data.append("images", file); // Append each file separately
        });
      } else {
        data.append(key, formData[key]); // Append single values directly
      }
    });
    data.append("owner_id", owner_id);
    try {
      const response = await axios.post(`${url}owner/dash/posthome`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response);
      setFormData({
        title: "",
        description: "",
        location: "",
        city: "",
        state: "",
        country: "",
        price: 0,
        rating: 0,
        numReviews: 0,
        bedrooms: 0,
        bathrooms: 0,
        guests: 0,
        amenities: "",
        images: [],
        owner_id,
        availability: "",
        reviews: [],
      }); // Reset form
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return null;
  }

  if (!ownerToken) {
    return <Navigate to="/owner/login" replace />;
  }

  return (
    <>
      <Link to="/">Home</Link>
      <form className={housePost.form} onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type:
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required>
            <option value="Apartment">Apartment</option>
            <option value="Flat">Flat</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Rating:
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </label>
        <label>
          Number of Reviews:
          <input
            type="number"
            name="numReviews"
            value={formData.numReviews}
            onChange={handleChange}
          />
        </label>
        <label>
          Bedrooms:
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Guests:
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          amenities:
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
        </label>
        <label>
          Choose image:
          <input type="file" name="images" multiple onChange={handleChange} />
        </label>
        {/* <label>
        Owner ID:
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
        />
      </label> */}
        <label>
          Availability:
          <input
            type="date"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          />
        </label>

        {/* <label>
        Coordinates (comma-separated):
        <input
          type="text"
          name="coordinates"
          value={formData.coordinates}
          onChange={handleChange}
        />
      </label> */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default HousePost;
