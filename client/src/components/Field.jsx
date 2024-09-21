/* eslint-disable react/prop-types */
import("../components/styles/field.css");
function Field({ field, onRemove }) {
  return (
    <div className="field-card">
      <img src={field.image} alt="field image" />
      <h4>{field.fieldName}</h4>
      <span>{field.location}</span>
      <button className="remove_field" onClick={() => onRemove(field._id)}>
        Remove Field
      </button>
    </div>
  );
}
export default Field;
