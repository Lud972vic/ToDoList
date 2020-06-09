import React from "react";
import "materialize-css/dist/css/materialize.css";
import TodoList from "./TodoList.js";
import TodoForm from "./TodoForm.js";
import TodoFormik from "./TodoFormik";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todosList: { todos: [] },
      todoForm: {
        todoTitle: "Une nouvelle tâche",
        todoDueDate: new Date(),
        todoCompleted: false,
      },
    };
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadTodos() {
    fetch("http://localhost:3300/todos")
      .then((response) => response.json())
      .then((data) => this.setState({ todosList: { todos: data } }));
  }

  componentDidMount() {
    this.loadTodos();
  }

  deleteTodo(todo) {
    const url_delete = `http://localhost:3300/todos/${todo.id}`;
    //si on n'utilise pas la (Response), on met (_) =>...
    //this = > TodoList : l object de la méthode
    fetch(url_delete, { method: "DELETE" }).then((_) => this.loadTodos());
  }

  handleInputChange(event) {
    const target = event.target;
    const value =
      target.name === "todoCompleted" ? target.checked : target.value;
    const name = target.name;

    this.setState((state) => {
      const todoForm = { ...state.todoForm, [name]: value };
      return { todoForm };
    });
  }

  dateDuJour() {
    var now = new Date(this.state.todoForm.todoDueDate);
    var annee = now.getFullYear();
    var mois = ("0" + (now.getMonth() + 1)).slice(-2);
    var jour = ("0" + now.getDate()).slice(-2);
    var laDate = jour + "/" + mois + "/" + annee;

    return laDate;
  }

  handleSubmit(event) {
    event.preventDefault();
    const url_post = `http://localhost:3300/todos/`;
    const theTodo = {
      title: this.state.todoForm.todoTitle,
      dueDate: this.dateDuJour(),
      completed: this.state.todoForm.todoCompleted,
    };
    const p = fetch(url_post, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theTodo),
    });

    p.then((response) => this.loadTodos());
  }

  render() {
    const myTodos = this.state.todosList.todos;
    const myTodoForm = this.state.todoForm;

    return (
      <div className="container">
        <h1>ToDoList App</h1>

        <div className="row">
          <div className="col s6">
            <TodoList todos={myTodos} onDelete={this.deleteTodo} />
          </div>
          <div className="col s6">
            <h2>Formulaire</h2>
            <h4>TodoForm</h4>
            <TodoForm
              todo={myTodoForm}
              onHandleInputChange={this.handleInputChange}
              onHandleSubmit={this.handleSubmit}
            />
            {/* <h4>TodoFormik</h4>
            <TodoFormik /> */}
          </div>
        </div>
      </div>
    );
  }npm 
}

export default App;
//npx json-server --port 3300 todos.json