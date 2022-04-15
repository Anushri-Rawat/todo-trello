import "./InputForm.css";
import { v4 } from "uuid";
import _ from "lodash";

const InputForm = (props) => {
  let updatedTodo = {};

  const addItem = (e) => {
    e.preventDefault();
    if (props.text.length === 0) return;
    else {
      props.setState((prev) => {
        return {
          ...prev,
          todo: {
            title: "Todo",
            items: [{ id: v4(), name: props.text }, ...prev.todo.items],
          },
        };
      });
    }
    props.setText("");
  };
  const updatedItem = (e) => {
    e.preventDefault();
    if (props.text.length === 0) {
      props.setEditId(false);
      return;
    } else {
      _.map(props.state, (data, key) => {
        const Item = {
          [key]: {
            title: (key[0].toUpperCase() + key.slice(1)).replace("-", " "),
            items: data.items.map((todo) => {
              if (todo.id === props.editId) {
                todo.name = props.text;
              }
              return todo;
            }),
          },
        };
        updatedTodo = Object.assign(updatedTodo, Item);
      });
      props.setState(updatedTodo);
      props.setEditId(false);
      props.setText("");
    }
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
      <button className={props.editId ? "hide" : ""} onClick={addItem}>
        Add Todo
      </button>
      <button className={props.editId ? "" : "hide"} onClick={updatedItem}>
        Edit Todo
      </button>
    </form>
  );
};
export default InputForm;
