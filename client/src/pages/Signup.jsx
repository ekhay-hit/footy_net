import { useState } from "react";
import "./styles/singup.css";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

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

      localStorage.setItem("isNewUser", "true"); // when user signup set a isNewUser to true to use to navigate to updateProfile instead of home
      Auth.login(data.createUser.token);
      navigate("/updateProfile");
      // callign refetch from query me
    } catch (err) {
      console.log("failed to add user");
    }
  };
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
        {error && <div className="error">{error.message}</div>}
        <button>Signup</button>
      </form>
    </main>
  );
}

export default Signup;
