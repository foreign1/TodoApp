import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    todoText: "",
    notDoneOnly: false,
    itemIndex: 0,
    todos: [],
  };
  constructor() {
    super();
    this.handleTodoTextChange = this.handleTodoTextChange.bind(this);
    this.handleNotDoneOnly = this.handleNotDoneOnly.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSetToDone = this.handleSetToDone.bind(this);
  }
  handleTodoTextChange(todoText) {
    this.setState({ todoText: todoText });
  }
  handleNotDoneOnly(notDoneOnly) {
    this.setState({
      notDoneOnly: notDoneOnly,
    });
  }
  handleSubmit(e) {
    let tempTodo = this.state.todos;
    tempTodo.push({
      todo: this.state.todoText,
      done: false,
      index: this.state.itemIndex,
    });
    this.setState({ todos: tempTodo });
    this.setState({ itemIndex: this.state.itemIndex + 1 });
    e.preventDefault();
  }
  handleSetToDone(e) {
    // Create array to reflect task completion, iterate over all element of array and foreach element
    // check if element index matches event trigger box id. If true, update and add to updatedTodo
    // else add to updatedTodo
    let tempTodo = this.state.todos;
    let updatedTodo = [];
    tempTodo.forEach((todo) => {
      if (todo.index == e.target.id) {
        todo.done = !todo.done;
        updatedTodo.push(todo);
        return;
      }
      updatedTodo.push(todo);
    });
    this.setState({ todos: updatedTodo });
  }

  render() {
    return (
      <div id="container">
        <div id="banner">My Todo App</div>
        <TodoInputBar
          todoText={this.state.todoText}
          notDoneOnly={this.state.notDoneOnly}
          handleTodoTextChange={this.handleTodoTextChange}
          handleNotDoneOnly={this.handleNotDoneOnly}
          handleSubmit={this.handleSubmit}
        />
        <TodoTable
          handleTodoTextChange={this.handleTodoTextChange}
          todos={this.state.todos}
          notDoneOnly={this.state.notDoneOnly}
          handleSetToDone={this.handleSetToDone}
        />
      </div>
    );
  }
}

export default App;

class TodoInputBar extends Component {
  state = {};
  constructor() {
    super();
    this.handleTodoTextChange = this.handleTodoTextChange.bind(this);
    this.handleNotDoneOnly = this.handleNotDoneOnly.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTodoTextChange(e) {
    this.props.handleTodoTextChange(e.target.value);
  }
  handleNotDoneOnly(e) {
    this.props.handleNotDoneOnly(e.target.value);
  }
  handleSubmit(e) {
    this.props.handleSubmit(e);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            // value={"this.state.value"}
            onChange={this.handleTodoTextChange}
            placeholder="Enter todo text..."
            id="todoTextInput"
            //value={this.props.todoText}
            //onKeyUp={this.handleTodoTextChange}
            // onChange={this.handleTodoTextChange}
          ></input>
        </label>
        <input id="submit" type="submit" value="Submit" />
      </form>
    );
  }
}

class TodoTable extends Component {
  state = {};
  constructor() {
    super();
    this.handleSetToDone = this.handleSetToDone.bind(this);
  }

  handleSetToDone(e) {
    this.props.handleSetToDone(e);
  }
  render() {
    let rows = [];
    this.props.todos.forEach((todo) => {
      rows.push(
        <tr>
          <td>{todo.todo} </td>
          <td>
            <input
              type="checkbox"
              onChange={this.handleSetToDone}
              id={todo.index}
            />
          </td>
        </tr>
      );
    });
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Todo item</th>
              <th>Completed</th>
            </tr>{" "}
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
