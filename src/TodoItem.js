import React from "react";
import "materialize-css/dist/css/materialize.css";

function TodoItem(props) {
  const todo = props.todo;

  return (
    <tr className={todo.completed ? "green" : ""}>
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{todo.completed ? "terminé" : "à faire"}</td>
      <td>{todo.dueDate}</td>
      <td>
        <button
          onClick={(_) => props.onDelete(todo)}
          className="btn-floating btn-large waves-effect waves-light red"
        >
          <small>Suppr</small>
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;
