import OwnerCss from "./OwnerHeader.module.css";
import { Link } from "react-router-dom";
import homeIcon from "../../img/house.png";

const OwnerHeader = (props) => {
  return (
    <>
      <nav className={OwnerCss.nav}>
        <div className={OwnerCss.right}>
          {" "}
          <Link className={OwnerCss.link} to="/">
            <img
              className={OwnerCss.img}
              src={homeIcon}
              alt={`home${homeIcon}`}
            />
          </Link>
        </div>
        <div className={OwnerCss.left}>
          <Link className={OwnerCss.link} to={`/owner/${props.name}`}>
            {props.name}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default OwnerHeader;
