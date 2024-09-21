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

    const { fieldName, location, image } = fieldFormData;

    // Log the values to confirm they are extracted correctly
    console.log({ fieldName, location, image });

    try {
      // if there is an image convert it to base64 first
      let imageBase64 = null;
      if (image) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(image);
        });
      }
      const { data } = await addField({
        variables: { fieldName, location, image: imageBase64 },
      });
      console.log("Added the field successfully ");
    } catch (err) {
      console.log("failed to add field");
      console.error(err);
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
