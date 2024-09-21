import { Link, useLocation } from "react-router-dom";
import "./styles/nav.css";
import logo from "../assets/images/logo.png";
// import { Link, useLocation } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

import Auth from "../utils/auth";

function Nav() {
  const activePage = useLocation().pathname;

  const { loading, data } = useQuery(GET_ME);

  const username = data?.me.username;

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
            {console.log(username)}
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
            logout : {username}
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
