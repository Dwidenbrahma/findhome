import React from "react";
import "./App.module.css";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/Main";
import Footer from "./components/footer/Footer";

function Home() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        <Main />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Home;
