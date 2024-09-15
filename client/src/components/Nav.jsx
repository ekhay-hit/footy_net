import { Link, useLocation } from "react-router-dom";
import "./styles/nav.css";
import logo from "../assets/images/logo.png";
// import { Link, useLocation } from "react-router-dom";

function Nav() {
  const activePage = useLocation().pathname;
  return (
    <>
      <nav className="nav">
        <Link to="/">
          <img src={logo} alt="soccer logo" />
        </Link>

        <Link to="/" className={activePage === "/" && "active"}>
          Home
        </Link>

        <Link
          to="/dashboard"
          className={activePage === "/dashboard" && "active"}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          className={activePage === "/login" ? "login active" : "login"}
        >
          login
        </Link>
      </nav>
    </>
  );
}

export default Nav;
