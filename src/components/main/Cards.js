import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myCard from "./Card.module.css";
import axios from "axios";
import url from "../../url";

const Card = () => {
  const [homeData, setHomes] = useState([]);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get(`${url}`);
        setHomes(response.data);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchHomes();
  }, []);

  return (
    <div className={myCard.card}>
      {homeData.map((home) => (
        <Link className={myCard.link} key={home._id} to={`/info/${home._id}`}>
          <div className={myCard.insideCard}>
            <div className={myCard.imageContainer}>
              <img
                src={`${url}${home.images[0]}`}
                alt={`house in ${home.location}`}
              />
            </div>

            <div className={myCard.houseDetails}>
              <div className={myCard.houseDetailsTop}>
                <p className={myCard.p}>{home.location}, India</p>
                <span className={myCard.span}>{home.description}</span>
                <p className={myCard.p}>
                  {new Intl.NumberFormat("hi-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(home.price)}
                  , <span className={myCard.sp}>night</span>
                </p>
              </div>
              <div className={myCard.rating}>
                <p className={myCard.p}>{home.rating}/5</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
