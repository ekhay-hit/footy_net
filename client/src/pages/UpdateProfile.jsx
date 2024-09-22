import CompleteProfile from "../components/completeProfile";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styles/singup.css";
import { GET_ME } from "../utils/queries";

function UpdateProfile() {
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
    awaitRefetchQueries: true,
  });

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
    <main className="signup-main">
      <div className="complete-profile">
        <CompleteProfile
          setAvatar={setAvatar}
          onUpload={updateProfile}
          onSkip={skip}
        />
      </div>
    </main>
  );
}

export default UpdateProfile;
