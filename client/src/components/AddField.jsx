import { useState } from "react";
import "../components/styles/addField.css";
import { useMutation } from "@apollo/client";
import { ADD_FIELD } from "../utils/mutations";

function AddField() {
  // declairing state for add field input
  const [fieldFormData, setFieldFormData] = useState({
    fieldName: "",
    location: "",
    image: null,
  });

  // add muations here
  const [addField, { error }] = useMutation(ADD_FIELD);
  // handel add field input data
  const handleAddFieldInput = (event) => {
    const { name, value } = event.target;
    setFieldFormData({ ...fieldFormData, [name]: value });
  };
  // this to add the image to data
  const handleAddImage = (event) => {
    setFieldFormData({ ...fieldFormData, image: event.target.files[0] });
  };
  // handle submit form
  const handelSubmitForm = async (event) => {
    event.preventDefault();
    // append those data from the input to formField
    const formData = new FormData();
    console.log("I am in the add field section");
    formData.append("fieldName", fieldFormData.fieldName);
    formData.append("location", fieldFormData.location);
    formData.append("image", fieldFormData.image);

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
          value={fieldFormData.fieldName}
          onChange={handleAddFieldInput}
          className="form-control"
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          placeholder="Field loaction"
          value={fieldFormData.email}
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

export default AddField;
