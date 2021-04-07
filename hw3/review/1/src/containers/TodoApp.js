import React, { Component } from "react";
import Header from "../components/Header";
import x_img from "../img/x.png"

class TodoApp extends Component {
    state ={
        todoCount: 0,
        todoContent: [],
        todoChecked: [],
        underdoneCount: 0
    };

    style_not_checked = {
        fontWeight: 300,
        overflowWrap: "break-word",
        width: "90%",
        transition: "opacity 0.3s",
        height: "100%"
    }
    style_checked = {
        fontWeight: 300,
        overflowWrap: "break-word",
        width: "90%",
        transition: "opacity 0.3s",
        height: "100%",
        textDecoration: "line-through",
        opacity: 0.5
    }

    renderStyle = (e) => {
        if(this.state.todoContent[e].checked===true)return this.style_checked;
        else return this.style_not_checked;
    }

    renderFooter = () => {
        if(this.state.todoCount === 0) return null;
        return(
            <footer className="todo-app__footer" id="todo-footer">
                <div className="todo-app__total">{this.state.underdoneCount} left</div>
                <ul className="todo-app__view-buttons">
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </ul>
                <div className="todo-app__clean">
                    <button>Clear completed</button>
                </div>
            </footer>
        )
    }

    checked = (e) => {
        var newContent = this.state.todoContent;
        if(newContent[e.target.id].checked===true){
            newContent[e.target.id].checked = false;
            this.setState({underdoneCount: this.state.underdoneCount + 1})
        }
        else{
            newContent[e.target.id].checked = true;
            this.setState({underdoneCount: this.state.underdoneCount - 1})
        }
        this.setState({newContent})

    }

    // delete = (e) => {
    //     if(this.state.todoContent[e.target.id].checked === false) this.setState({underdoneCount: this.underdoneCount - 1});
    //     this.setState({todoCount: this.todoCount - 1})
    //     var newContent = this.state.todoContent;
    //     newContent[e.target.id] = {};
    //     console.log(newContent);
    //     this.setState({todoContent: newContent})
    // }

    renderTodoList = () => {
        if(this.state.todoCount === 0) return null;
        return(
            <ul className="todo-app__list" id="todo-list">
                {this.state.todoContent.map(content=>
                    <li key={content.id} className="todo-app__item">
                        <div className="todo-app__checkbox">
                            <input type="checkbox" id={content.id} checked={content.checked} onChange={this.checked} ></input>
                            <label for={content.id}></label>
                        </div>
                        <h1 className="todo-app__item-detail" id={content.id} style={this.renderStyle(content.id)}>{content.content}</h1>
                        <img alt="" src={x_img} className="todo-app__item-x" onClick={this.delete} id={content.id}></img>
                    </li>    
                )}
            </ul>
        )
    }

    handleKeyDown = (e) => {
        if(e.keyCode === 13){
            this.state.todoContent.push({id: this.state.todoCount, content: e.target.value, checked:false});
            this.setState({todoContent: this.state.todoContent});
            this.setState({todoCount: this.state.todoCount + 1});
            this.setState({underdoneCount: this.state.underdoneCount + 1})
            e.target.value = "";
        }
    }

    render() {
        return (
            <>
                <Header text="todos" />
                <section className="todo-app__main">
                    <input className="todo-app__input" onKeyDown={this.handleKeyDown}></input>
                    {this.renderTodoList()}
                </section>
                {this.renderFooter()}
            </>
        );
    }
}

export default TodoApp;
