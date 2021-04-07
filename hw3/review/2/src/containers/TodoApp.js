import React, { Component } from "react";
import Header from "../components/Header";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoInput: "",
            todoAll: [],
            key_counter: 0,
            left: 0,
            dt_styles: [],
            mode: "All"
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAll = this.handleAll.bind(this);
        this.handleAct = this.handleAct.bind(this);
        this.handleCom = this.handleCom.bind(this);
        this.handleClearCom = this.handleClearCom.bind(this);
    }

    handleAll() {
        this.setState({ mode: "All" });
    }

    handleAct() {
        this.setState({ mode: "Act" })
    }

    handleCom() {
        this.setState({ mode: "Com" })
    }

    handleChange(event) {
        this.setState({ todoInput: event.target.value });
    }

    handleSubmit(event) {
        this.setState({
            todoAll: [...this.state.todoAll, [this.state.todoInput, this.state.key_counter, false]]
        });
        this.setState({ dt_styles: [...this.state.dt_styles, null] });
        this.setState({ todoInput: "" });
        this.setState({ key_counter: this.state.key_counter + 1 });
        this.setState({ left: this.state.left + 1 });
        event.preventDefault();
    }

    handleCheck(event) {
        let id = event.target.id;
        let todoAll = [...this.state.todoAll];
        let checked = todoAll[id][2];
        let dt_styles = [...this.state.dt_styles];
        let dt_style = dt_styles[id];
        if (!checked) {
            dt_style = { textDecoration: "line-through", opacity: 0.5 };
            todoAll[id][2] = true;
            this.setState({ left: this.state.left - 1 });
        }
        else {
            dt_style = null;
            todoAll[id][2] = false;
            this.setState({ left: this.state.left + 1 });
        }
        dt_styles[id] = dt_style;
        this.setState({ dt_styles: dt_styles });
        this.setState({ todoAll: todoAll })

        // console.log(checked)
    }

    handleDelete(event) {
        let tarID = event.target.alt;
        this.deleteByID(tarID)
    }

    handleClearCom() {
        let todoAll = [...this.state.todoAll];
        let dt_styles = [...this.state.dt_styles];
        let tarID = null;
        while (true) {
            let haveAct = false;
            for (let i = 0; i < todoAll.length; i++) {
                if (todoAll[i][2]) {
                    tarID = i;
                    haveAct = true;
                }
            }
            if (!haveAct) {
                break;
            }
            dt_styles.splice(tarID, 1);
            todoAll.splice(tarID, 1);
            for (let index = tarID; index < todoAll.length; index++) {
                todoAll[index][1] = todoAll[index][1] - 1;
            }
        }
        this.setState({ dt_styles: dt_styles });
        this.setState({ todoAll: todoAll });
        this.setState({ key_counter: todoAll.length });
    }

    deleteByID(tarID) {
        let dt_styles = [...this.state.dt_styles];
        let todoAll = [...this.state.todoAll];
        let complete = (dt_styles[tarID] != null);
        dt_styles.splice(tarID, 1);
        todoAll.splice(tarID, 1);
        for (let index = tarID; index < todoAll.length; index++) {
            todoAll[index][1] = todoAll[index][1] - 1;
        }

        if (!complete) {
            this.setState({ left: this.state.left - 1 });
        }
        this.setState({ dt_styles: dt_styles });
        this.setState({ todoAll: todoAll });
        this.setState({ key_counter: this.state.key_counter - 1 });
    }

    render() {
        let todoShow = [];
        let footerShow;
        if (this.state.mode === "All") {
            todoShow = this.state.todoAll;
        }
        else if (this.state.mode === "Act") {
            for (let i = 0; i < this.state.todoAll.length; i++) {
                if (!this.state.todoAll[i][2]) {
                    todoShow = [...todoShow, this.state.todoAll[i]]
                }
            }
        }
        else if (this.state.mode === "Com") {
            for (let i = 0; i < this.state.todoAll.length; i++) {
                if (this.state.todoAll[i][2]) {
                    todoShow = [...todoShow, this.state.todoAll[i]]
                }
            }
        }

        let show = false;
        if (this.state.left > 0) {
            show = true;
        }
        else {
            if (this.state.todoAll.length > 0) {
                show = true;
            }
        }

        let clearStyle = {visibility: "hidden"};
        for (let i = 0; i < this.state.todoAll.length; i++) {
            if (this.state.todoAll[i][2]) {
                clearStyle = {visibility: "visible"};
                break;
            }
        }

        if (show) {
            footerShow = <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{this.state.left} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={this.handleAll}>All</button>
                    <button onClick={this.handleAct}>Active</button>
                    <button onClick={this.handleCom}>Completed</button>
                </ul>
                <div className="todo-app__clean" style={clearStyle}>
                    <button onClick={this.handleClearCom}>Clear completed</button>
                </div>
            </footer>
        }
        else {
            footerShow = null;
        }

        return (
            <>
                <Header className="todos-app__header" text="todos" />
                <section className="todo-app__main">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="todo-app__input" placeholder="what needs to be done?" value={this.state.todoInput} onChange={this.handleChange} />
                    </form>
                    <ul className="todo-app__list" id="todo-list">
                        {todoShow.map(todoInput => <li className="todo-app__item" key={todoInput[1]}>
                            <div className="todo-app__checkbox">
                                <input type="checkbox" id={todoInput[1]} onChange={this.handleCheck} checked={todoInput[2]} />
                                <label htmlFor={todoInput[1]}></label>
                            </div>
                            <h1 className="todo-app__item-detail" style={this.state.dt_styles[todoInput[1]]}>{todoInput[0]}</h1>
                            <img src="./img/x.png" className="todo-app__item-x" alt={todoInput[1]} onClick={this.handleDelete} />
                        </li>)}
                    </ul>
                </section>
                {footerShow}
            </>
        );
    }
}

export default TodoApp;
