import "./styles/nav.css";
import logo from "../assets/images/logo.png";
// import { Link, useLocation } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="nav">
        <img src={logo} alt="soccer logo" />
        <a>Home</a>
        <a>Dashboard</a>
        <a>login</a>
      </nav>
    </>
  );
}

export default Nav;
