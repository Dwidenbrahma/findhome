import MainNav from "./Nav.module.css";

const Nav = () => {
  return (
    <>
      <div className={MainNav.mainNav}>
        <ul className={MainNav.ul}>
          <li className={MainNav.li}>All</li>
          <li className={MainNav.li}>Flat</li>
          <li className={MainNav.li}>Apartments</li>
          <li className={MainNav.li}>Homestay</li>
          <li className={MainNav.li}>Bunglows</li>
          <li className={MainNav.li}>Penthouse</li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
