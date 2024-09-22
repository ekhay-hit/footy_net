import { useState } from "react";
import "../components/styles/addField.css";
import { useMutation, useQuery } from "@apollo/client";
import { FIELDS_BY_USER } from "../utils/queries";
// import { ADD_GAME } from "../utils/mutations";

function AddGame() {
  // declairing state for add game input
  const [gameFormData, setGameFormData] = useState({
    fieldName: "",
    capacity: 12,
    startTime: "",
    endTime: "",
    gameDate: "",
    isRecurring: false,
  });

  // add muations here
  const {
    loading: loadingFields,
    error: errorField,
    data: fieldsData,
  } = useQuery(FIELDS_BY_USER);
  //   const [addGame, { error }] = useMutation(ADD_GAME);
  // handel add game input data
  const handleSignupInput = (event) => {
    const { name, value, type, checked } = event.target;
    setGameFormData({
      ...gameFormData,
      [name]: type === "checkbox" ? checked : value,
    });
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
        <select
          name="fieldName"
          placeholder="Field name"
          value={gameFormData.fieldName}
          onChange={handleSignupInput}
          className="form-control"
        >
          <option value="" disabled>
            Select a field
          </option>
          {fieldsData?.fieldsByUser.map((field) => (
            <option key={field._id} value={field.fieldName}>
              {field.fieldName}
            </option>
          ))}
        </select>
        <label>Game date:</label>
        <input
          type="date"
          name="gameDate"
          placeholder="Select a date"
          value={gameFormData.gameDate}
          onChange={handleSignupInput}
          className="form-control"
        />
        <label> Capacity:</label>
        <input
          min="6"
          max="24"
          type="number"
          name="capacity"
          placeholder="Game capacity"
          value={gameFormData.capacity}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          placeholder="Start Time"
          value={gameFormData.startTime}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label>end Time:</label>
        <input
          type="time"
          name="endTime"
          placeholder="end Time"
          value={gameFormData.endTime}
          onChange={handleSignupInput}
          className="form-control"
        />
        <label>Is this game recurring over the next 30 days?</label>
        <input
          type="checkbox"
          name="isRecurring"
          checked={gameFormData.isRecurring}
          onChange={handleSignupInput}
        />
        <span> Yes, make it recurring.</span>

        <button>Add Game</button>
      </form>
    </>
  );
}

export default AddGame;
