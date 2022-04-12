import "./TodoList.css";
import _ from "lodash";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    const itemCopy = { ...props.state[source.droppableId].items[source.index] };
    props.setState((prev) => {
      prev = { ...prev };
      prev[source.droppableId].items.splice(source.index, 1);
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    });
  };

  return (
    <div className="todo-list-type">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(props.state, (data, key) => {
          return (
            <div className="column" key={key}>
              <h3 className={key}>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-col"
                    >
                      {data.items.map((el, index) => {
                        return (
                          <TodoItem
                            el={el}
                            index={index}
                            key={el.id}
                            state={props.state}
                            setState={props.setState}
                            setUpdate={props.setUpdate}
                          />
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};
export default TodoList;
