import { useState } from "react";
import "./styles/singup.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
function Signup() {
  // declairing state for signup input
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  // add muations here
  const [createUser, { error }] = useMutation(CREATE_USER);
  // handel signup input data
  const handleSignupInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // handle submit form
  const handelSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createUser({ variables: { ...userFormData } });
      console.log("this is the signup data ***********************");
      console.log(data.createUser);
      navigate("/");
    } catch (err) {
      console.log("failed to add user");
    }
  };

  console.log("user input");
  console.log(userFormData);
  return (
    <main className="signup-main">
      <form className="form form-control" onSubmit={handelSubmitForm}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={userFormData.username}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>email:</label>
        <input
          type="text"
          name="email"
          placeholder="your email address"
          value={userFormData.email}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="enter a password"
          value={userFormData.password}
          onChange={handleSignupInput}
          className="form-control"
        ></input>
        <button>Signup</button>
      </form>
    </main>
  );
}

export default Signup;
