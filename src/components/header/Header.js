import homeImage from "../../img/house.png";
import menu from "../../img/menus.png";
import close from "../../img/close.png";
import Header from "./Header.module.css";

import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

const Nav = () => {
  const [show, setShow] = useState(false);
  const { token } = useContext(AuthContext);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <nav className={Header.nav}>
        <Link to="/">
          <div className={Header.right}>
            <img className={Header.logo} src={homeImage} alt="Home_image" />
          </div>
        </Link>

        <div className={`${Header.left} ${show ? Header.show : ""}`}>
          <div className={Header.close}>
            <img
              onClick={handleClose}
              className={Header.closelogo}
              src={close}
              alt="Close_menu"
            />
          </div>

          <ul className={Header.ul}>
            <li className={Header.li}>
              <Link className={Header.link} to="/">
                Home
              </Link>
            </li>
            {token ? (
              <li className={Header.li}>
                <Link className={Header.link} to="/user/dashbord">
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li className={Header.li}>
                  <Link className={Header.link} to="/login">
                    Login
                  </Link>
                </li>
                <li className={Header.li}>
                  <Link className={Header.link} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className={Header.line}>
          <img
            onClick={handleClick}
            className={Header.hamberger}
            src={menu}
            alt="Menu"
          />
        </div>

        <div className={Header.toShow}>
          <ul className={Header.uli}>
            <li className={Header.lii}>
              <Link className={Header.link} to="/">
                Home
              </Link>
            </li>
            {token ? (
              <li className={Header.lii}>
                <Link className={Header.link} to="/user/dashbord">
                  profile
                </Link>
              </li>
            ) : (
              <>
                <li className={Header.lii}>
                  <Link className={Header.link} to="/login">
                    Login
                  </Link>
                </li>
                <li className={Header.lii}>
                  <Link className={Header.link} to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
