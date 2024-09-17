import { useState } from "react";
import { Link } from "react-router-dom";
// import { useMutation } from '@apollo/client';

import "./styles/login.css";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });

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
      const { data } = await Login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    //clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="login-main">
      <form className="form-login form-control" onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input 
        className="form-control"
        placeholder="username"
        
         />

        <label>Password:</label>
        <input className="form-control"></input>
        <div>
          <button>Login</button>
        </div>

        <Link to="/signup" className="singup">
          Not registerd: Signup
        </Link>
      </form>
    </main>
  );
}

export default Login;
