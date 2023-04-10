import "./Input.css";
const Input = ({ text, type, value, handleChange }) => {
  return (
    <div className="action-input-wrapper">
      <h4>{text}</h4>
      <input
        type="text"
        value={value}
        pattern={type == "numbers" ? `[0-9]*` : ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
