import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//import Loading from "./components/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Loading /> */}
  </React.StrictMode>
);
