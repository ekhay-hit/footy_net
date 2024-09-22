import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";

import Auth from "../utils/auth";

import "./styles/login.css";

function Login() {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [login, { error }] = useMutation(LOGIN_USER);

  //update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      navigate("/");
    } catch (e) {
      console.error("failed to log in");
    }

    //clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <main className="login-main">
      <form className="form-login form-control" onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          className="form-control"
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          className="form-control"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        {error && <div className="error">{error.message}</div>}
        <div>
          <button>Login</button>
        </div>

        <Link to="/signup" className="signup">
          Not registerd: Signup
        </Link>
      </form>
    </main>
  );
}

export default Login;
