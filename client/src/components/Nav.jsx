import { Link, useLocation } from "react-router-dom";
import "./styles/nav.css";
import logo from "../assets/images/logo.png";
// import { Link, useLocation } from "react-router-dom";

import Auth from "../utils/auth";

function Nav() {
  const activePage = useLocation().pathname;

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <nav className="nav">
        <Link to="/">
          <img src={logo} alt="soccer logo" />
        </Link>

        <Link to="/" className={activePage === "/" && "active"}>
          Home
        </Link>

        {Auth.loggedIn() && (
          <>
            {console.log(Auth.getUser().username)}
            <Link
              to="/dashboard"
              className={activePage === "/dashboard" && "active"}
            >
              Dashboard
            </Link>
          </>
        )}
        {Auth.loggedIn() ? (
          <Link className="logout" onClick={logout}>
            logout : {Auth.getUser().username}
          </Link>
        ) : (
          <Link
            to="/login"
            className={activePage === "/login" ? "login active" : "login"}
          >
            login
          </Link>
        )}
      </nav>
    </>
  );
}

export default Nav;
