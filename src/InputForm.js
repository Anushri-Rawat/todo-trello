import "./InputForm.css";
import { v4 } from "uuid";

const InputForm = (props) => {
  const addItem = (e) => {
    e.preventDefault();
    props.setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [{ id: v4(), name: props.text }, ...prev.todo.items],
        },
      };
    });
    props.setText("");
  };

  return (
    <form className="todoform">
      <input
        type="text"
        value={props.text}
        onChange={(e) => {
          props.setText(e.target.value);
        }}
      ></input>
      <button type="submit" onClick={addItem}>
        Add Todo
      </button>
    </form>
  );
};
export default InputForm;
