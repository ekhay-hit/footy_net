/* eslint-disable react/prop-types */
function Button({ children, handleBtnClick }) {
  return (
    <button className="button" onClick={handleBtnClick}>
      {children}
    </button>
  );
}

export default Button;
