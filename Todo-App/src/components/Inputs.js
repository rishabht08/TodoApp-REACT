import React, { Component } from 'react';

class Input extends Component {
    state = {
        todo: "",
        deadline: "",
        completed: false
    }
    handleInputChange(event) {
        this.setState({
            todo: event.target.value
        })
    }
    handleDateChange(event) {
        this.setState({
            deadline: event.target.value
        })
    }
    addTodoToApp() {
        if (this.state.todo && this.state.deadline) {
            this.props.addTodoToApp(this.state);
            this.setState({
                todo: "",
                deadline: "",
                completed: false
            })

        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.toEditdata[0] != prevProps.toEditdata[0]) {
            this.setState({
                todo: this.props.toEditdata[0].todo,
                deadline: this.props.toEditdata[0].deadline
            })
        }
    }
    render() {
        return (
            <div className="user-inputs">
                <input className="form-control" placeholder="Input Todo" type="text" value={this.state.todo} onChange={(e) => this.handleInputChange(e)} />
                <input className="form-control" type="date" value={this.state.deadline} onChange={(e) => this.handleDateChange(e)} />
                {!this.props.toEditdata[1] && <button className="btn btn-success" onClick={() => this.addTodoToApp()}>Save</button>}
                {this.props.toEditdata[1] && <button className="btn btn-info" onClick={() => this.addTodoToApp()}>Update</button>}
            </div>
        )
    }
}

export default Input;