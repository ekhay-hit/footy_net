import "./styles/nav.css";
import logo from "../assets/images/logo.png";
// import { Link, useLocation } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="nav">
        <a>
          <img src={logo} alt="soccer logo" />
        </a>
        <a>Home</a>
        <a>Dashboard</a>
        <a className="login">login</a>
      </nav>
    </>
  );
}

export default Nav;
