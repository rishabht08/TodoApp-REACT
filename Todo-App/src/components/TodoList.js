import React, { Component } from 'react';

class TodoList extends Component {
    onCheckboxChange(event, index) {
        this.props.onChecked(event.target.checked, index)
    }
    render() {
        return (
            <div className="todo-list">
                {this.props.loadTodo.map((item) =>
                    <div className={item[0].completed ? "todo-wrap checked" : "todo-wrap" }>
                        <div className="list">
                            <input className="form-check-input position-static" type="checkbox" checked={item[0].completed} onChange={(e) => this.onCheckboxChange(e, item[1])} />
                            <div className="task"><span>{item[0].todo}</span></div>
                            <div className="deadline"><span>{item[0].deadline}</span></div>
                        </div>
                        <div className="list-side">
                            <button className="btn btn-info" onClick={() => this.props.changeToEdit(item[1])}>Edit</button>
                            <button className="btn btn-danger" onClick={() => this.props.deleteTodo(item[1])}>Delete</button>
                        </div>
                    </div>
                )}


            </div>
        )
    }
}

export default TodoList;