import React from "react";
import {LengthOfList, addToList} from "../data";


function handleKeyDown(e){
    if(e.keyCode === 13){
        console.log(e.target.value);
        addToList();
        console.log(LengthOfList);
    }
};

function Input(props){
    return(
        <input className="todo-app__input" onKeyDown={handleKeyDown}></input>
    )
}

// class Input extends Component{
//     handleKeyDown = function(e){
//         if(e.keyCode === 13){
//             console.log(e.target.value);
//         }
//     };
//     render(){
//         return(
//             <input className="todo-app__input" onKeyDown={this.handleKeyDown}></input>
//         )
//     }
// }

export default Input;