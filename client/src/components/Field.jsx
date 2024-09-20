import { useState } from "react";
import "../components/styles/field.css";
import { useMutation } from "@apollo/client";
import { ADD_FIELD } from "../utils/mutations";

function Field() {
  // declairing state for add field input
  const [userFormData, setUserFormData] = useState({
    fieldName: "",
    location: "",
    image: null,
  });

  // add muations here
  const [addField, { error }] = useMutation(ADD_FIELD);
  // handel add field input data
  const handleAddFieldInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  // this to add the image to data
  const handleAddImage = (event) => {
    setUserFormData({ ...userFormData, image: event.target.files[0] });
  };
  // handle submit form
  const handelSubmitForm = async (event) => {
    event.preventDefault();
    // append those data from the input to formField
    const formData = new FormData();

    formData.append("fieldName", userFormData.fieldName);
    formData.append("location", userFormData.location);
    formData.append("image", userFormData.image);

    try {
      const { data } = await addField({ variables: formData });
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
          onChange={handleAddFieldInput}
          className="form-control"
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Field loaction"
          value={userFormData.email}
          onChange={handleAddFieldInput}
          className="form-control"
        />

        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleAddImage}
          className="form-control"
          accept="image/*"
        />

        <button>Add Field</button>
      </form>
    </>
  );
}

export default Field;
