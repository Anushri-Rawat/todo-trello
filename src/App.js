import Header from "./Header.js";
import InputForm from "./InputForm.js";
import { Fragment, useEffect, useState, useReducer } from "react";
import TodoList from "./TodoList.js";
import React from "react";

function App() {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(false);
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: JSON.parse(localStorage.getItem("todos")) || [],
    },
    "in-progress": {
      title: "In progress",
      items: JSON.parse(localStorage.getItem("in-progress")) || [],
    },
    completed: {
      title: "Completed",
      items: JSON.parse(localStorage.getItem("completed")) || [],
    },
  });

  const clearCompletedTaskHandler = () => {
    setState((prev) => {
      return {
        ...prev,
        completed: {
          title: "Completed",
          items: [],
        },
      };
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todo.items));
    localStorage.setItem(
      "in-progress",
      JSON.stringify(state["in-progress"].items)
    );
    localStorage.setItem("completed", JSON.stringify(state.completed.items));
  }, [state]);

  return (
    <Fragment>
      <Header />
      <InputForm
        text={text}
        setText={setText}
        state={state}
        setState={setState}
        setEditId={setEditId}
        editId={editId}
      />
      <TodoList
        state={state}
        setState={setState}
        setText={setText}
        setEditId={setEditId}
      />
      <button
        onClick={clearCompletedTaskHandler}
        style={{
          display: "flex",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          background: "#00a8ff",
          border: "none",
          color: "white",
          position: "absolute",
          right: "45px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    </Fragment>
  );
}

export default App;
