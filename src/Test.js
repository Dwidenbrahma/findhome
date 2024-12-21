import register from "./Register.module.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    phone: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profileImage: e.target.files[0], // Save the file object in the state
    });
  };

  return (
    <>
      <Link className={register.topLink} to="/">
        {" "}
        <FaHome size={30} />{" "}
      </Link>
      <div className={register.container}>
        <h1 className={register.h1}>Sign Up </h1>
        <div className={register.container_2}>
          <input
            className={register.input}
            type="text"
            placeholder="username"
          />

          <input className={register.input} type="email" placeholder="email" />

          <input
            className={register.input}
            type="password"
            placeholder="password"
          />
          <input
            className={register.input}
            type="password"
            placeholder="confirm password"
          />

          <input className={register.input} type="text" placeholder="Phone" />

          <button className={register.button}>Sign up</button>
        </div>
        <div className={register.container_1}>
          <span className={register.span2}>Sign up with</span>
          <span className={register.span}>
            {" "}
            <FcGoogle size={40} />
          </span>
          <span className={register.span}>
            <BsFacebook size={35} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
