import { Link, useLocation } from "react-router-dom";
import "./styles/nav.css";
import logo from "../assets/images/logo.png";
import logo1 from "../assets/images/logo1.png";
// import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

function Nav() {
  const activePage = useLocation().pathname;

  const { loading, data } = useQuery(GET_ME);

  const username = data?.me.username;
  const avatar = data?.me?.avatar;

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <nav className="nav">
        {/* if user has a vatar uplaoded use it if not do the else default one */}
        <Link to="/updateProfile">
          {Auth.loggedIn() ? (
            avatar ? (
              <img src={avatar} alt="user logo" />
            ) : (
              <img src={logo} alt="user logo" />
            )
          ) : (
            <img src={logo1} alt="user logo" />
          )}

          {Auth.loggedIn() && ` Welcome ${username}`}
        </Link>

        <Link to="/" className={activePage === "/" ? "active item" : "item"}>
          Home
        </Link>

        {Auth.loggedIn() && (
          <>
            {console.log(username)}
            <Link
              to="/dashboard"
              className={activePage === "/dashboard" ? "active item" : "item"}
            >
              Dashboard
            </Link>
          </>
        )}
        {Auth.loggedIn() ? (
          <Link className="logout item" onClick={logout}>
            logout
          </Link>
        ) : (
          <Link
            to="/login"
            className={
              activePage === "/login item" ? "login active" : "login item"
            }
          >
            login
          </Link>
        )}
      </nav>
    </>
  );
}

export default Nav;
