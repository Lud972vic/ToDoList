import React from "react";
import "materialize-css/dist/css/materialize.css";
import TodoItem from "./TodoItem.js";

function TodoList(props) {
  const todos = props.todos;

  return (
    <div>
      <h2>TodoListe</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>completed</th>
            <th>dueDate</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((untodo) => (
            <TodoItem key={untodo.id} todo={untodo} onDelete={props.onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
