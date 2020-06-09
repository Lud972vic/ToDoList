import React from "react";
import "materialize-css/dist/css/materialize.css";

function TodoForm(props) {
  const formValue = props.todo;

  return (
    <form className="col s12" onSubmit={props.onHandleSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <input
            placeholder="Todo title"
            id="todoTitle"
            name="todoTitle"
            type="text"
            className="validate"
            value={formValue.todoTitle}
            onChange={(even) => props.onHandleInputChange(even)}
          />
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <input
            placeholder="Todo dueDate"
            id="todoDueDate"
            name="todoDueDate"
            type="date"
            className="validate"
            value={formValue.todoDueDate}
            onChange={(even) => props.onHandleInputChange(even)}
          />
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <label>
            <input
              type="checkbox"
              className="filled-in"
              checked={formValue.todoCompleted}
              id="todoCompleted"
              name="todoCompleted"
              onChange={(even) => props.onHandleInputChange(even)}
            />
            <span>Valider</span>
          </label>
        </div>
      </div>

      <div className="row">
        <button
          className="btn-floating btn-large waves-effect waves-light green"
          type="submit"
          name="action"
        >
          <small>Ajouter</small>
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
