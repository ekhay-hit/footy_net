/* eslint-disable react/prop-types */
import "../components/styles/completeProfile.css";
function CompleteProfile({ setAvatar, onUpload, onSkip }) {
  return (
    <form className="about-me ">
      <h3>Let's complete your profile</h3>
      <label>Upload or update your profile photo:</label>
      <input
        type="file"
        name="avatar"
        onChange={(e) => setAvatar(e.target.files[0])}
        className="form-control"
        accept="image/*"
      />
      {/* <label>About Me</label>
      <textarea className="form-control"></textarea> */}

      <button className="update" onClick={onUpload}>
        Update
      </button>
      <button className="skip" onClick={onSkip}>
        Skip
      </button>
    </form>
  );
}

export default CompleteProfile;
