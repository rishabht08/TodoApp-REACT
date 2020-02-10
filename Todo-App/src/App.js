import React, { Component } from 'react';
import './App.css';
import Input from "./components/Inputs";
import TodoList from "./components/TodoList";
import Select from "./components/Select";

class App extends Component {
  state = {
    todoList: [],
    defaultType: "All",
    isEdit: false,
    editData: "",
    editIndex: ""
  }
  addTodoToState(todo) {
    let todoList = this.state.todoList.slice();

    if (this.state.isEdit) {
      todoList[this.state.editIndex] = todo;
    }
    else {
      todoList.push(todo);
    }
    this.setState({
      todoList: todoList,
      isEdit: false
    })
  }
  checkBoxStatus(check, index) {
    let todoList = this.state.todoList.slice();
    todoList[index].completed = check;
    this.setState({
      todoList: todoList
    })
  }
  changeType(type) {
    this.setState({
      defaultType: type
    })
  }
  loadingListType() {
    if (this.state.defaultType == "All") {
      let list = []
      for (let i = 0; i < this.state.todoList.length; i++) {
        list.push([this.state.todoList[i], i])
      }
      return list;
    }
    if (this.state.defaultType == "Completed") {
      let list = []
      for (let i = 0; i < this.state.todoList.length; i++) {
        if (this.state.todoList[i].completed == true) {
          list.push([this.state.todoList[i], i])
        }
      }
      return list;
    }
    if (this.state.defaultType == "Not Completed") {
      let list = []
      for (let i = 0; i < this.state.todoList.length; i++) {
        if (this.state.todoList[i].completed == false) {
          list.push([this.state.todoList[i], i])
        }
      }
      return list;
    }
  }

  deleteTodo(index) {
    let todoList = this.state.todoList.slice();
    todoList.splice(index, 1)
    this.setState({
      todoList: todoList
    })
  }
  changeToEdit(dataIndex) {
    this.setState({
      isEdit: true,
      editData: this.state.todoList[dataIndex],
      editIndex: dataIndex
    })
  }
  render() {
    return (
      <div className="main">
        <div className="header">
          <h3>TODO APP</h3>
        </div>
        <Input addTodoToApp={(todo) => { this.addTodoToState(todo) }} toEditdata={[this.state.editData, this.state.isEdit]} />
        <Select todoType={(type) => this.changeType(type)} />
        <TodoList loadTodo={this.loadingListType()} onChecked={(check, index) => this.checkBoxStatus(check, index)}
          deleteTodo={(index) => this.deleteTodo(index)} changeToEdit={(dataIndex) => this.changeToEdit(dataIndex)} />
      </div>
    )
  }
}



export default App;
