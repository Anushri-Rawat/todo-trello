import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./TodoList.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import _ from "lodash";

export default function TodoItem(props) {
  const el = props.el;
  const index = props.index;
  let mergedObj = {};

  const removeTodoItem = (e) => {
    _.map(props.state, (data, key) => {
      const updatedItems = data.items.filter(
        (val) => val.id !== e.target.parentElement.parentElement.id
      );
      mergedObj = _.merge(mergedObj, {
        [key]: {
          title: (key[0].toUpperCase() + key.slice(1)).replace("-", " "),
          items: updatedItems,
        },
      });
    });
    props.setState((prev) => {
      return { ...prev, ...mergedObj };
    });
  };

  const updateTodoItem = (e) => {
    _.map(props.state, (data, key) => {
      data.items.map((todo) => {
        if (todo.id === e.target.parentElement.parentElement.id) {
          props.setEditId(todo.id);
          props.setText(todo.name);
        }
      });
    });
  };

  return (
    <Draggable index={index} draggableId={el.id}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="item"
            id={el.id}
          >
            {el.name}
            <div className="control-buttons">
              <i
                className="bi bi-pencil-square"
                style={{ color: "#777" }}
                onClick={updateTodoItem}
              ></i>
              <i
                className="bi bi-trash3-fill"
                style={{ color: "#777" }}
                onClick={removeTodoItem}
              ></i>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
