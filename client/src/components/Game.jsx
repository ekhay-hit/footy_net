import { useState } from "react";
import "../components/styles/field.css";
import { useMutation } from "@apollo/client";
// import { ADD_GAME } from "../utils/mutations";

function Game() {
  // declairing state for add game input
  const [userFormData, setUserFormData] = useState({
    fieldName: "",
    capacity: "",
    startTime: "",
    endTime: "",
    gameDate: "",
  });

  // add muations here
  //   const [addGame, { error }] = useMutation(ADD_GAME);
  // handel add game input data
  const handleSignupInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // handle submit form
  const handelSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addGame({ variables: { ...userFormData } });
    } catch (err) {
      console.log("failed to add user");
    }
  };

  return (
    <>
      <form className="main form-control" onSubmit={handelSubmitForm}>
        <label> Field name:</label>
        <input
          type="text"
          name="fieldName"
          placeholder="Field name"
          value={userFormData.fieldName}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>Game date:</label>
        <input
          type="text"
          name="gameDate"
          placeholder="Select a date"
          value={userFormData.gameDate}
          onChange={handleSignupInput}
          className="form-control"
        />
        <label> Capacity:</label>
        <input
          type="text"
          name="capacity"
          placeholder="Game capacity"
          value={userFormData.capacity}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>Start Time:</label>
        <input
          type="text"
          name="startTime"
          placeholder="Start Time"
          value={userFormData.startTime}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>end Time:</label>
        <input
          type="text"
          name="endTime"
          placeholder="end Time"
          value={userFormData.endTime}
          onChange={handleSignupInput}
          className="form-control"
        />

        <button>Add Game</button>
      </form>
    </>
  );
}

export default Game;
