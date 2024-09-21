import("../components/styles/field.css");
function Field({ image }) {
  return (
    <div className="field-card">
      <img src={image} alt="field image" />
      <h2>Winter Garden</h2>
      <span>2343 Winter Garder, Orlando Florida</span>
      <button className="remove_field">Remove Field</button>
    </div>
  );
}
export default Field;
