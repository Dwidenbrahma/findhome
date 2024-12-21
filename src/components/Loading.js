import React from "react";
import loading from "./loading.module.css";
import loadingImg from "../img/house.png";

const Loading = () => {
  return (
    <>
      <img className={loading.img} src={loadingImg} alt="icon" />
    </>
  );
};

export default Loading;
