import React, { useState } from "react";

function Table() {
    const initailArray = () => {
        let x = new Array(26);
        for (let i = 0; i < x.length; i++) {
            x[i] = new Array(100).fill('');
        }
        return x
    }

    const [data, setData] = useState(initailArray)
    const [position, setPosistion] = useState({
      column: null,
      row: null,
      toDelete: false
    })

    function toLetters(num) {
        let mod = num % 26;
        let pow = num / 26 | 0;
        let out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');

        return pow ? toLetters(pow) + out : out;
    }

    function focusHandler(event) {
        const currentPosition = [event.target.parentElement.parentElement.parentElement.parentElement.id.charCodeAt(0)-65 ,parseInt(event.target.parentElement.id)-1];
        setPosistion({column: currentPosition[0], row: currentPosition[1], toDelete:true});
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[event.target.parentElement.id].className = 'focus';
    }

    function clearColor(event) {
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[event.target.parentElement.id].className = '';
    }

    function keyIn(event) {
        const currentPosition = [event.target.parentElement.parentElement.parentElement.parentElement.id.charCodeAt(0)-65 ,parseInt(event.target.parentElement.id)-1];
        const next = currentPosition[1]+1;
        const key = window.event ? event.keyCode : event.which;
        const inputText = String.fromCharCode(key);
        event.preventDefault();

        if(key === 13 && next < data[0].length) {
            event.target.parentElement.parentElement.children[next].children[0].focus()
            setPosistion({column: currentPosition[0], row: currentPosition[1]+1, toDelete:true})
        }

        else if(key === 8) {
            setData((data) => {
                let tmp = data.slice();
                tmp[currentPosition[0]][currentPosition[1]] = tmp[currentPosition[0]][currentPosition[1]].slice(0,tmp[currentPosition[0]][currentPosition[1]].length-1);

                return tmp
            })
        }

        else {
            if(position.column !== null && position.toDelete) {
                setData((data) => {
                    let tmp = data.slice();
                    tmp[currentPosition[0]][currentPosition[1]] = inputText;

                    return tmp
                })
                setPosistion({...position, toDelete:false});
            }

            else {
                setData((data) => {
                    let tmp = data.slice();
                    tmp[currentPosition[0]][currentPosition[1]] = tmp[currentPosition[0]][currentPosition[1]] + inputText;

                    return tmp
                })
            }
        }
    }

    function createTable(data) {
        let table = [];

        for (let i = 0 ; i < data.length ; i++) {
            let column = [];

            for (let j = 0 ; j < data[0].length ; j++) {
                column.push(
                <td id={j+1}>
                    <input
                      type="text"
                      onClick={() => setPosistion({...position, toDelete:false}) }
                      onFocus={focusHandler}
                      onBlur={clearColor}
                      onKeyDown={keyIn}
                      value={data[i][j]}
                      onChange={(e)=>{}}>
                    </input>
                </td>
                )
            }

            table.push(
                <table id={toLetters(i+1)}>
                    <thead><th>{toLetters(i+1)}</th></thead>
                    <tbody><tr>{column}</tr></tbody>
                </table>
            )
          }
          return table
    }

    function createIndexColumn(data) {
        return (Array(data[0].length).fill('').map(
                (column,index) => index > 0 ? <td>{index+1}</td> : <><th>Row/Column</th><td id={index+1}>{index+1}</td></>)
            )
    }

    let btn = document.querySelectorAll("button");
    for(let i = 0, len = btn.length ; i < len ; i++) {
        btn[i].onmousedown = (event) => {event.preventDefault()};
      }

    function addColumn() {
        if(document.activeElement.type,document.activeElement.type === 'text'){
            setData((data) => {
                let tmp = data.slice();
                tmp.splice(position.column+1, 0, Array(data[0].length).fill(''));

                return tmp
            })
        }

        else {
            setData((data) => {
                let tmp = data.slice();
                tmp.splice(data.length, 0, Array(data[0].length).fill(''));

                return tmp
            })
        }
    }

    function deleteColumn() {
        if(document.activeElement.type, document.activeElement.type === 'text' && data.length > 1){
            setData((data) => {
                let tmp = data.slice();
                tmp.splice(position.column, 1);

                return tmp
            })
        }
    }

    function addRow() {
        let tmp = data.slice();
        if(document.activeElement.type,document.activeElement.type === 'text'){
            setData((data) => {
                for(let i = 0; i < data.length ; i++){
                    let rm = tmp[i].splice(position.row+1, 0, '');
                }

                return tmp
            })
        }

        else {
            setData((data) => {
                let tmp = data.slice();
                for(let i = 0 ; i < data.length ; i++){
                    tmp[i].splice(data[0].length, 0, '');
                }

                return tmp
            })
        }

    }

    function deleteRow() {
        let tmp = data.slice();
        if(document.activeElement.type,document.activeElement.type === 'text'){
            setData((data) => {
                for(let i = 0 ; i < data.length ; i++){
                    let rm = tmp[i].splice(position.row, 1);
                }

                return tmp
            })
        }
    }

    return (
      <div>
          <div className='column_button'>
              <button onClick={addColumn}>+</button>
              <button onClick={deleteColumn}>-</button>
          </div>
          <div className="column">
              <div className='row_button'>
                  <button onClick={addRow}>+</button>
                  <button onClick={deleteRow}>-</button>
              </div>
              <div className="indexColumn">
                {createIndexColumn(data)}
              </div>
              {createTable(data)}
          </div>
      </div>
    );
}

export default Table
