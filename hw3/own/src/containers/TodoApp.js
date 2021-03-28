import React, { Component } from "react";
import Header from "../components/Header";

class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {  input_content: '',
                        all_content: [],          //item in all_content:[text, id_cnt, completed]
                        id_cnt : 0,
                        left : 0,
                        onBoard : 0,
                        mode : 0,
                        complete_cnt : 0};


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.Change_0 = this.Change_0.bind(this);
        this.Change_1 = this.Change_1.bind(this);
        this.Change_2 = this.Change_2.bind(this);
        this.handleClear = this.handleClear.bind(this);

    
        this.check = this.check.bind(this);
    }

    
    handleChange(event)
    {
        this.setState({input_content : event.target.value });
    }

    handleSubmit(event)
    {
        event.preventDefault()
        document.getElementsByClassName('todo-app__input')[0].value = "" ;

        let temp = []
        this.setState({id_cnt: this.state.id_cnt + 1, left : this.state.left + 1, onBoard : this.state.onBoard + 1}, function(){
            temp = [this.state.input_content, this.state.id_cnt, false] ;
            this.setState({all_content : [...this.state.all_content, temp]}) ; 
        });   
    }

    handleCheck(event)
    {
        let change_target =  document.getElementById("detail_" + event.target.id) ;
        let target_checked = event.target.checked ;

        if(target_checked)
        {
            this.setState({left : this.state.left - 1, complete_cnt : this.state.complete_cnt + 1}) ;
            this.setState({all_content: this.state.all_content.map(e => (e[1] == event.target.id ? [e[0], e[1], true] : e))}) ;
            
            change_target.style.textDecorationLine = "line-through";
            change_target.style.opacity = 0.5 ;
        }
        else
        {
            this.setState({left : this.state.left + 1,  complete_cnt : this.state.complete_cnt - 1}) ;
            this.setState({all_content: this.state.all_content.map(e => (e[1] == event.target.id ? [e[0], e[1], false] : e))}) ;
            
            change_target.style = '' ;
        }
    }

    handleDelete(event)
    {
        let target = event.target.id.slice(4) ;
        
        for(let i = 0 ; i < this.state.all_content.length ; i++)
        {
            if(this.state.all_content[i][1] == target && this.state.all_content[i][2] === false)
            {
                this.setState({left : this.state.left - 1}) ;
            }
        }
        
        
        this.setState({all_content: this.state.all_content.filter(function(content) {        
            return content[1] != target ;
        })});

        this.setState({onBoard : this.state.onBoard - 1})
    }
    

    Change_0(event){this.setState({mode : 0})}
    Change_1(event){this.setState({mode : 1})}
    Change_2(event){this.setState({mode : 2})}

    handleClear(event)
    {
        this.setState({all_content: this.state.all_content.filter(function(content) {        
            return content[2] === false ;
        })});

        this.setState({onBoard : this.state.onBoard - this.state.complete_cnt}, function(){
            this.setState({complete_cnt : 0}) ;
        }) ;
    }

    check(event)
    {
        for(let i = 0 ; i < this.state.all_content.length ; i++)
        {
            console.log(this.state.all_content[i][0], this.state.all_content[i][1], this.state.all_content[i][2]) ;
        }
        console.log('mode: ' + this.state.mode) ;
        console.log('com: ' + this.state.complete_cnt) ;
    }

    render() {

        let alter = this.state.all_content ;
        let list = []

        if (this.state.mode === 0)
        {
            for(let i = 0 ; i < alter.length ; i++)
            {
                list.push(
                    <li className = "todo-app__item" key = {alter[i][1]}>
                        <div className = "todo-app__checkbox">
                            <input id = {alter[i][1]} type="checkbox" onChange = {this.handleCheck} checked = {alter[i][2]}/>
                            <label htmlFor = {alter[i][1]}></label>
                        </div>
                        <h1 className = "todo-app__item-detailed" id = {"detail_" + alter[i][1]} style = {alter[i][2]? {textDecorationLine: 'line-through', opacity: 0.5} : {}}>{alter[i][0]}</h1>
                        <img id = {'img_' + alter[i][1]} src = "./img/x.png" className = "todo-app__item-x" alt = 'img missing' role = 'button' onClick = {this.handleDelete}></img>
                    </li>
                ) ;
            }
        }
        else if (this.state.mode === 1)
        {
            for(let i = 0 ; i < alter.length ; i++)
            {
                if (alter[i][2] === false)
                {
                    list.push(
                        <li className = "todo-app__item" key = {alter[i][1]}>
                            <div className = "todo-app__checkbox">
                                <input id = {alter[i][1]} type="checkbox" onChange = {this.handleCheck} checked = {alter[i][2]}/>
                                <label htmlFor = {alter[i][1]}></label>
                            </div>
                            <h1 className = "todo-app__item-detailed" id = {"detail_" + alter[i][1]} style = {alter[i][2]? {textDecorationLine: 'line-through', opacity: 0.5} : {}}>{alter[i][0]}</h1>
                            <img id = {'img_' + alter[i][1]} src = "./img/x.png" className = "todo-app__item-x" alt = 'img missing' role = 'button' onClick = {this.handleDelete}></img>
                        </li>
                    ) ;
                }
            }
        }
        else if (this.state.mode === 2)
        {
            for(let i = 0 ; i < alter.length ; i++)
            {
                if (alter[i][2] === true)
                {
                    list.push(
                        <li className = "todo-app__item" key = {alter[i][1]}>
                            <div className = "todo-app__checkbox">
                                <input id = {alter[i][1]} type="checkbox" onChange = {this.handleCheck} checked = {alter[i][2]}/>
                                <label htmlFor = {alter[i][1]}></label>
                            </div>
                            <h1 className = "todo-app__item-detailed" id = {"detail_" + alter[i][1]} style = {alter[i][2]? {textDecorationLine: 'line-through', opacity: 0.5} : {}}>{alter[i][0]}</h1>
                            <img id = {'img_' + alter[i][1]} src = "./img/x.png" className = "todo-app__item-x" alt = 'img missing' role = 'button' onClick = {this.handleDelete}></img>
                        </li>
                    ) ;
                }
            }
        }


        return (
            <>
                <Header className = "todo-app__header" text="todos" />
                <section className = "todo-app__main">
                    <form onSubmit = {this.handleSubmit}>
                        <input className = "todo-app__input" placeholder="What needs to be done?" onChange = {this.handleChange} />
                    </form>
                    {this.state.onBoard > 0 &&
                        (<ul className = "todo-app__list" id = "todo-list">
                            {list}
                        </ul>)
                    }
                </section>
                {this.state.onBoard >0 &&
                    (<footer className = "todo-app__footer" id = "todo-footer">
                        <div className = "todo-app__total">{this.state.left + " left"}</div>
                        <ul className = "todo-app__view-buttons">
                            <button type="button" onClick = {this.Change_0}>All</button>
                            <button type="button" onClick = {this.Change_1}>Active</button>
                            <button type="button" onClick = {this.Change_2}>Completed</button>
                        </ul>
                        <div className = "todo-app__clean">    
                            <button type="button" onClick = {this.handleClear} style={{visibility: this.state.complete_cnt > 0 ? 'visible' : 'hidden' }}>Clear completed</button>
                        </div>
                    </footer>)
                }
            </>
        );
    }
}

export default TodoApp;
