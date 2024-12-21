import info from "./Info.module.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import ImgGallery from "./ImgGallery";
import { FaBed, FaWifi, FaCity } from "react-icons/fa6";
import { FaCoffee, FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import url from "../../url";

const Info = () => {
  const [homeData, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const response = await axios.get(`${url}info/${id}`);
        setData(response.data); // Use response.data to get the home data
        //console.log(homeData.images[0]);
      } catch (error) {
        console.error("Error fetching homes:", error);
      }
    };

    fetchHomes();
  }, [id]);

  if (!homeData) {
    return <p>Loading...</p>; // Show loading message if homeData is not yet loaded
  }

  return (
    <>
      <header>
        {" "}
        <Header />
      </header>{" "}
      <main>
        {" "}
        <div className={info.top}>
          <ImgGallery src={homeData.images} />
        </div>
        <div className={info.middle}>
          <div className={info.tt}>
            <h3>{homeData.title}</h3>{" "}
            <Link to={`/reserve/${id}`}>
              <button className={info.pBtn}>Book</button>
            </Link>
          </div>

          <div className={info.bedInfo}>
            <span className={info.span1}>{homeData.location}</span> <br />
            <span className={info.span2}>
              {homeData.guests} guest | {homeData.bedrooms} bedroom |{" "}
              {homeData.bathrooms} bathroom
            </span>
          </div>

          <h3 className={info.h3}>What this place offers</h3>
          <div className={info.features}>
            <div className={info.features1}>
              <p className={info.p2}>
                <FaBed size={23} />
              </p>
              <p className={info.p2}>Wonderful sleep</p>
            </div>
            <div className={info.features1}>
              <p className={info.p2}>
                <FaWifi size={23} />
              </p>
              <p className={info.p2}>Wifi</p>
            </div>
            <div className={info.features1}>
              <p className={info.p2}>
                <FaCoffee size={23} />
              </p>
              <p className={info.p2}>Coffee</p>
            </div>
            <div className={info.features1}>
              <p className={info.p2}>
                <FaCity size={23} />
              </p>{" "}
              <p className={info.p2}>Beautiful City View</p>
            </div>
          </div>

          <h3 className={info.h3}>Reviews</h3>
          <div className={info.review}>
            {/* Render reviews dynamically if available */}
            {homeData.reviews?.map((review, index) => (
              <div key={index} className={info.reviews}>
                <div className={info.reviewProfile}>
                  <CgProfile size={50} />
                </div>
                <div className={info.reviewBlog}>
                  <div className={info.start}>
                    {[...Array(5)].map((_, idx) => (
                      <FaStar key={idx} />
                    ))}
                  </div>
                  <div className={info.article}>{review.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        {" "}
        <Footer />
      </footer>
    </>
  );
};

export default Info;
