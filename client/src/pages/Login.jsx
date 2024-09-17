import { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';


import "./styles/login.css";


function Login() {

  const [formState, setFormState] = useState({ email: '', password: '' });
  
  return (
    <main className="login-main">
      <form className="form-login form-control">
        <label>Username:</label>
        <input className="form-control" />

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
