import React from "react";

function List(props){
    return(
        <ul className="todo-app__list" id="todo-list">
            {()=>{for(var i = 0; i < props.len; i++){
                <div>{props.len}</div>
            }}}
        </ul>
    )
}

export default List;