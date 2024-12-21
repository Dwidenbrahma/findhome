import React, { useState, useEffect } from "react";
import axios from "axios";

const Fetch = () => {
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/test");
        setHomes(response.data);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchHomes();
  }, []);

  return (
    <div>
      <h1>{homes.message}</h1>
    </div>
  );
};

export default Fetch;
