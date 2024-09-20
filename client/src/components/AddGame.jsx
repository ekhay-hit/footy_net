import { useState } from "react";
import "../components/styles/addField.css";
import { useMutation } from "@apollo/client";
// import { ADD_GAME } from "../utils/mutations";

function AddGame() {
  // declairing state for add game input
  const [gameFormData, setGameFormData] = useState({
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
    setGameFormData({ ...gameFormData, [name]: value });
  };

  // handle submit form will un comment this when game mutation done
  const handelSubmitForm = async (event) => {
    event.preventDefault();
    try {
      //   const { data } = await addGame({ variables: { ...gameFormData } });
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
          value={gameFormData.fieldName}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>Game date:</label>
        <input
          type="text"
          name="gameDate"
          placeholder="Select a date"
          value={gameFormData.gameDate}
          onChange={handleSignupInput}
          className="form-control"
        />
        <label> Capacity:</label>
        <input
          type="text"
          name="capacity"
          placeholder="Game capacity"
          value={gameFormData.capacity}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>Start Time:</label>
        <input
          type="text"
          name="startTime"
          placeholder="Start Time"
          value={gameFormData.startTime}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>end Time:</label>
        <input
          type="text"
          name="endTime"
          placeholder="end Time"
          value={gameFormData.endTime}
          onChange={handleSignupInput}
          className="form-control"
        />

        <button>Add Game</button>
      </form>
    </>
  );
}

export default AddGame;
