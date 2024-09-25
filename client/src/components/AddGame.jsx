import { useState } from "react";
import "../components/styles/addField.css";
import { useMutation, useQuery } from "@apollo/client";
import { FIELDS_BY_USER } from "../utils/queries";
import { CREATE_GAME } from "../utils/mutations";

function AddGame() {
  // declairing state for add game input
  const [gameFormData, setGameFormData] = useState({
    fieldName: "",
    capacity: 12,
    price: 10,
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
  const [createGame, { error }] = useMutation(CREATE_GAME);
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

    const gameDatee = new Date(gameFormData.gameDate); // Convert to timestamp
    gameDatee.setUTCHours(0, 0, 0, 0);
    const gameDateTimestamp = gameDatee.getTime();
    console.log("This is the time stamp");
    console.log(gameFormData.gameDate);
    const capacityPlayer = Number(gameFormData.capacity);
    const gamePrice = Number(gameFormData.price);
    try {
      const { data } = await createGame({
        variables: {
          fieldName: gameFormData.fieldName, // Use fieldId here
          gameDate: gameDateTimestamp, // Use converted timestamp
          startTime: gameFormData.startTime,
          capacity: capacityPlayer,
          price: gamePrice,
          endTime: gameFormData.endTime,
          isRecurring: gameFormData.isRecurring,
        },
      });
    } catch (err) {
      console.log("failed to add Game");
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
          type="Number"
          name="capacity"
          placeholder="Game capacity"
          value={gameFormData.capacity}
          onChange={handleSignupInput}
          className="form-control"
        />

        <label> Price:</label>
        <input
          type="input"
          name="price"
          placeholder="Game capacity"
          value={gameFormData.price}
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
