import { useState, useContext, useEffect } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import user from "./UserDashbord.module.css";
import { AuthContext } from "../AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import url from "../../url";

const Review = ({ onSubmit }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (reviewText.trim()) {
      onSubmit(reviewText); // Pass review text to the parent component
      setReviewText(""); // Clear the textarea after submission
    }
  };

  return (
    <div className={user.review}>
      <textarea
        className={user.textarea}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}></textarea>
      <button className={user.btn} onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
  );
};

const UserDashbord = () => {
  const [showReview, setShowReview] = useState(false);
  const { token, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashbordData = async () => {
      const tokens = localStorage.getItem("token") || token; // Get token from context or localStorage if context is not available
      try {
        const response = await axios.get(`${url}user/dashboard`, {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });

        setUserData(response.data.user);
        setBookingData(response.data.bookings);
      } catch (err) {
        setError(
          err.response?.data?.message || "Error fetching dashboard data"
        );
      }
    };

    if (token) fetchDashbordData();
  }, [token]);

  if (loading) {
    return null;
  }
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (error) return <p>Error: {error}</p>;

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  const handleReviewSubmit = (reviewText) => {
    console.log("Review submitted:", reviewText); // Handle the review submission (e.g., send it to the backend)
    setShowReview(false); // Close the review form after submission
  };
  console.log(userData);
  console.log(bookingData);

  return (
    <>
      <header>
        <Header />
        <button onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div className={user.container}>
          <div className={user.profile}>
            <img
              src={`http://localhost:4000/${userData?.profileImage}`}
              alt="user-profile"
            />
            <div className={user.inside}>
              <p className={user.p3}>{userData?.name}</p>
              <p className={user.p2}>{userData?.email}</p>
              <p className={user.p2}>{userData?.phone}</p>
            </div>
          </div>

          <div className={user.recent}>
            {bookingData.length > 0 ? (
              bookingData.map((booking) => (
                <div className={user.item} key={booking._id}>
                  <img
                    className={user.img}
                    src={`http://localhost:4000/${booking.house?.images?.[0]}`} // Use actual house image or placeholder
                    alt="booking"
                  />
                  <div className={user.des}>
                    <h2>{booking.house?.title || "House Title"}</h2>
                    <span className={user.span}>
                      {new Date(booking.startDate).toLocaleDateString()}
                    </span>
                    <p className={user.p}>
                      Total{" "}
                      <span className={user.span2}>${booking.totalPrice}</span>
                    </p>
                    <button className={user.btn}>Download Invoice</button>
                    <button
                      onClick={() => setShowReview(!showReview)}
                      className={user.btn}>
                      {showReview ? "Cancel Review" : "Write Review"}
                    </button>
                  </div>
                  {showReview && <Review onSubmit={handleReviewSubmit} />}
                </div>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default UserDashbord;
