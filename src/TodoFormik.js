import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.todoTitle) {
    errors.todoTitle = "Obligatoire";
  } else if (values.todoTitle.length < 10) {
    errors.todoTitle = "Le titre doit contenir au minimun 10 caractères";
  }

  return errors;
};

const TodoFormik = () => {
  const formik = useFormik({
    initialValues: {
      todoTitle: "",
      todoDueDate: "",
      todoCompleted: false,
    },
    validate,
    onSubmit: (values) => {
      const url_post = `http://localhost:3300/todos/`;
      const theTodo = {
        title: values.todoTitle,
        dueDATE: new Date(values.todoDueDate).getTime(),
        completed: values.todoCompleted,
      };
      const p = fetch(url_post, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theTodo),
      });

      p.then((response) => console.log(response));
    },
  });

  return (
    <form className="col s12" onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="input-field col s12">
          <input
            placeholder="Todo title"
            id="todoTitle"
            name="todoTitle"
            type="text"
            className="validate"
            value={formik.values.todoTitle}
            onChange={formik.handleChange}
          />
          {formik.errors.todoTitle ? (
            <span
              className="helper-text red-text"
              data-error="wrong"
              data-success="right"
            >
              {formik.errors.todoTitle}
            </span>
          ) : null}
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
            value={formik.values.todoDueDate}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="input-field col s12">
          <label>
            <input
              type="checkbox"
              className="filled-in"
              checked={formik.values.todoCompleted}
              id="todoCompleted"
              name="todoCompleted"
              onChange={formik.handleChange}
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
};

export default TodoFormik;
