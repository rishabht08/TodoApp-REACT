const Title = () => {
    return (
        <div className = "border">
        <h1 className="display-4 font-italic centred">Todo App</h1>
        </div>
    )
}

//Input Compponent
class Input extends React.Component {
    state = {
        title: "",
        deadline: "",
        isCompleted: false
    }

    onInputChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    onDateChange = (event) => {
        this.setState({
            deadline: event.target.value
        })

    }
    sendsateToWrapper() {
        this.props.setTodofromInput(this.state)
        this.setState({
            title: "",
            deadline: ""
        })
    }

    //Lifecycle method(REACT Inbuilt)
    componentDidUpdate(prevProp, prevState) {
        if (prevProp.currentState.editData != this.props.currentState.editData) {
            this.setState({
                title: this.props.currentState.editData.title,
                deadline: this.props.currentState.editData.deadline
            })
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="main-todo-input-wrap">
                        <div className="main-todo-input fl-wrap">
                            <div className="main-todo-input-item"> <input type="text" id="todo-list-item" onChange={(event) => this.onInputChange(event)}
                                value={this.state.title} placeholder="What will you do today?"></input> </div>
                            {!this.props.currentState.isEdit && <button onClick={() => this.sendsateToWrapper()} className="add-items main-search-button">ADD</button>}
                            {this.props.currentState.isEdit && <button onClick={() => this.sendsateToWrapper()} className="add-items main-search-button edit">Edit</button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//TodoList Component
class Todolist extends React.Component {
    render() {
        return (

            <div className="row">
                <div className="col-md-12">
                    <div className="main-todo-input-wrap">
                        {this.props.todoData.map((item, index) =>
                            <div className="main-todo-input fl-wrap todo-listing">
                                <ul id="list-items">{item.title}</ul>
                                <button onClick={() => this.props.editTodo(index)} className="add-items main-search-button edit"  >Edit</button>
                                <button onClick={() => this.props.deleteTodo(index)} className="add-items main-search-button-delete">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

//Wrapper Component(Wrapping todoList and Input fields)
class Wrapper extends React.Component {
    state = {
        todos: [],
        isEdit: false,
        editIndex: "",
        editData: ""
    }
    updateWrapperState(todo) {
        let todoList = this.state.todos.slice();
        todoList[this.state.editIndex] = todo;
        if (!this.state.isEdit) {
            this.setState({
                todos: [...this.state.todos, todo]
            })
        }
        else {
            this.setState({
                todos: todoList,
                isEdit: false
            })
        }
    }

    deleteTodoFromState(index) {
        let todoList = this.state.todos.slice();
        todoList.splice(index, 1);
        this.setState({
            todos: todoList
        })
    }

    editTodoList(index) {
        this.setState({
            isEdit: true,
            editIndex: index,
            editData: this.state.todos[index]
        })

    }

    render() {
        return (
            <div>
                <Title /><br></br>
                <Input setTodofromInput={(todo) => this.updateWrapperState(todo)} currentState={this.state} /><br></br>
                <Todolist todoData={this.state.todos} deleteTodo={(index) => this.deleteTodoFromState(index)}
                    editTodo={(index) => this.editTodoList(index)} />
            </div>
        )
    }
}

//Render DOM
ReactDOM.render(<Wrapper />, document.getElementById("root"));

