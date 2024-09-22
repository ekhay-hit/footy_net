import { useState } from "react";
import "./styles/singup.css";
import CompleteProfile from "../components/completeProfile";
import { useMutation } from "@apollo/client";
import { CREATE_USER, UPDATE_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [showSignup, setShowSignup] = useState(true);
  const [showUpdateUser, setUpdateUser] = useState(false);
  // declairing state for signup input
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState();

  const navigate = useNavigate();
  // add muations here
  const [createUser, { error }] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
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
      setShowSignup(false);
      setUpdateUser(true);
    } catch (err) {
      console.log("failed to add user");
    }
  };

  function skip() {
    // if user skip navigate home
    navigate("/");
  }
  const updateProfile = async (event) => {
    event.preventDefault();
    console.log("I am here in update the profile");
    console.log(avatar);
    try {
      let avatarBase64 = null;
      if (avatar) {
        avatarBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(avatar);
        });
      }

      const { data } = await updateUser({
        variables: { avatar: avatarBase64 },
      });
      // after update navigate to home
      navigate("/");
    } catch (error) {
      console.log("failed to update the user");
      console.error(error);
    }
  };
  return (
    <>
      <main className="signup-main">
        {showUpdateUser && (
          <div className="complete-profile">
            <CompleteProfile
              setAvatar={setAvatar}
              onUpload={updateProfile}
              onSkip={skip}
            />
          </div>
        )}
        {showSignup && (
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
        )}
      </main>
    </>
  );
}

export default Signup;
