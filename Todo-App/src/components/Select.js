import React, { Component } from "react";

class Select extends Component {
    render() {
        return (
            <div>
                <select className="form-control select" id="todo-state" onChange={(e) => this.props.todoType(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                </select>
            </div>

        )
    }
}

export default Select;