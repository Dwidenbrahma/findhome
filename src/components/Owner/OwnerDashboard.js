import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { OwnerAuthContext } from "../OwnerContextAuth";
//import OwnerHeader from "../header/OwnerHeader";
//import OwnerFooter from "../footer/OwnerFooter";
import OwnerDash from "./OwnerDashboard.module.css";
import axios from "axios";
import url from "../../url";

const OwnerDashboard = () => {
  const { ownerToken, loading } = useContext(OwnerAuthContext);
  const [ownerData, setOwnerData] = useState("");

  // fetch Data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}owner/dash`, {
          headers: {
            Authorization: `Bearer ${ownerToken}`,
          },
        });

        setOwnerData(response.data);
        console.log(response.data); // log response data immediately here, not after setOwnerData
      } catch (error) {
        setOwnerData("Error: " + error.message); // better error handling
      }
    };

    if (ownerToken) {
      fetchData();
    }
  }, [ownerToken]);

  if (loading) return null;

  if (!ownerToken) return <Navigate to="/owner/login" replace />;

  return (
    <>
      <header className={OwnerDash.header}>
        <ul className={OwnerDash.ul}>
          <li className={OwnerDash.li}>{ownerData.name}</li>
          <li className={OwnerDash.li}>Notification</li>
          <li className={OwnerDash.li}>logout</li>
          <li className={OwnerDash.li}>
            <img
              src={`http://localhost:4000/${ownerData?.profileImage}`}
              alt="owner-profile"
            />
          </li>
        </ul>
      </header>
      <main className={OwnerDash.main}>
        <div className={OwnerDash.left_container}>
          <div className={OwnerDash.inside_left_container}>
            <h1>Dashbhord</h1>
          </div>
          <button className={OwnerDash.btn}>Analysis</button>
          <button className={OwnerDash.btn}>Manage Property</button>
          <button className={OwnerDash.btn}>
            <Link to="/Owner/dash/posthome">Post Property</Link>
          </button>
          <button className={OwnerDash.btn}>Feedback</button>
          <button className={OwnerDash.btn}>Edit Property</button>
          <button className={OwnerDash.btn}>Manage Customer</button>
          <div className={OwnerDash.error}>
            <h1>Report Error</h1>
          </div>
        </div>
        <div className={OwnerDash.right_container}>
          <h1>Features is in Development .......</h1>
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default OwnerDashboard;
