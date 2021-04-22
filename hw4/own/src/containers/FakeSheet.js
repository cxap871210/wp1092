import React, { Component } from "react";
// import Table from '../components/Table'


class FakeSheet extends Component {
    constructor(props) {
        super(props);
        this.state = { selected_x: '',
                       selected_y: '',
                       edit_x:'',
                       edit_y:'',
                       grid:{},
                       X : 26,
                       Y : 100 };
    
        this.prevent = false ;
        this.timer = 0 ;
        

        this.handleSelect = this.handleSelect.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        this.handleColAdd = this.handleColAdd.bind(this);
        this.handleColDe = this.handleColDe.bind(this);
        this.handleRowAdd = this.handleRowAdd.bind(this);
        this.handleRowDe = this.handleRowDe.bind(this);
    }
    
    handleSelect(event)
    {    
        if (event.target.id.split('-')[0] !== '0' && event.target.id.split('-')[1] !== '0')
        {
            
            this.timer = setTimeout(function() {
                if (!this.prevent) {
                    this.setState({selected_x : event.target.id.split('-')[0], 
                       selected_y : event.target.id.split('-')[1]}) ;
                }
                this.prevent = false;
              }.bind(this), 300);
        }
        
    }
    handleDoubleClick(event)
    {
        if (event.target.id.split('-')[0] !== '0' && event.target.id.split('-')[1] !== '0')
        {
        clearTimeout(this.timer);
        this.prevent = true;
        this.setState({selected_x : event.target.id.split('-')[0], 
                       selected_y : event.target.id.split('-')[1],
                       edit_x : event.target.id.split('-')[0], 
                       edit_y : event.target.id.split('-')[1]}) ;
        }
    }

    handleChange(event)
    {
        let copyGrid =  {...this.state.grid};
        copyGrid[event.target.id] = event.target.value ;
        this.setState({grid:copyGrid}, function(){
            // console.log(this.state.grid) ;
        }) ;
    }

    handleKeydown(event)
    {
        
        if (event.key === 'Enter') {
            if (parseInt(this.state.selected_y, 10) < this.state.Y)
            {
                this.setState({selected_y : String(parseInt(this.state.selected_y, 10)+1)})
            }
        }
        if (event.key === 'Tab') {
            event.preventDefault() 
            if (parseInt(this.state.selected_y, 10) < this.state.Y)
            {
                this.setState({selected_y : String(parseInt(this.state.selected_y, 10)+1)})
            }
        }
        if (event.key === 'Backspace' || event.key === 'Delete') {
            let copyGrid =  {...this.state.grid};
            copyGrid[event.target.id] = "" ;
            this.setState({grid:copyGrid}, function(){
                // console.log(this.state.grid) ;
            }) ;
        }   
        if (event.key === 'ArrowUp') {
            event.preventDefault() 
            if (parseInt(this.state.selected_y, 10) > 1)
            {
                this.setState({selected_y : String(parseInt(this.state.selected_y, 10)-1)})
            }
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault() 
            if (parseInt(this.state.selected_y, 10) < this.state.Y)
            {
                this.setState({selected_y : String(parseInt(this.state.selected_y, 10)+1)})
            }
        }
        if (event.key === 'ArrowLeft') {
            if (parseInt(this.state.selected_x, 10) > 1)
            {
                this.setState({selected_x : String(parseInt(this.state.selected_x, 10)-1)})
            }
        }
        if (event.key === 'ArrowRight') {
            if (parseInt(this.state.selected_x, 10) < this.state.X)
            {
                this.setState({selected_x : String(parseInt(this.state.selected_x, 10)+1)})
            }
        }

    }

    handleBlur(event)
    {
        // console.log('unblur') ;
    

        setTimeout(function() {
            this.setState({selected_x:'', selected_y : ''}) ;    
          }.bind(this), 120);

    }

    handleColAdd(event)
    {
        let s_x = this.state.selected_x ;
        // let s_y = this.state.selected_y ;
        this.setState({X:this.state.X+1}, function(){
            if(this.state.selected_x !== '' && this.state.selected_y !=='')
            {
                let copyGrid =  {...this.state.grid};
                for(let i = 1 ; i <= this.state.Y ; i++)
                {
                    for(let j = this.state.X ; j > parseInt(s_x) ; j--)
                    {
                        copyGrid[String(j) + '-' + String(i)] = copyGrid[String(j-1) + '-' + String(i)] 
                    }
                    copyGrid[String(s_x) + '-' + String(i)] = '' ;
                }
                
                this.setState({grid:copyGrid}) ;
            }
        }) ;
    }

    handleColDe(event)
    {
        let s_x = this.state.selected_x ;
        // let s_y = this.state.selected_y ;
        if(this.state.selected_x !== '' && this.state.selected_y !=='')
            {
    
                let copyGrid =  {...this.state.grid};

                for(let i = 1 ; i <= this.state.Y ; i++)
                {
                    for(let j = parseInt(s_x) ; j <= this.state.X ; j++)
                    {
                        copyGrid[String(j) + '-' + String(i)] = copyGrid[String(j+1) + '-' + String(i)]
                    }
                }
                this.setState({grid:copyGrid, X:this.state.X-1}) ;
            }
    }

    handleRowAdd(event)
    {
        // let s_x = this.state.selected_x ;
        let s_y = this.state.selected_y ;
        this.setState({Y:this.state.Y+1}, function(){
            if(this.state.selected_x !== '' && this.state.selected_y !=='')
            {
                let copyGrid =  {...this.state.grid};
                for(let i = 1 ; i <= this.state.X ; i++)
                {
                    for(let j = this.state.Y ; j > parseInt(s_y) ; j--)
                    {
                        copyGrid[String(i) + '-' + String(j)] = copyGrid[String(i) + '-' + String(j-1)] 
                    }
                    copyGrid[String(i) + '-' + String(s_y)] = '' ;
                }
                
                this.setState({grid:copyGrid}) ;
            }
        }) ;
    }

    handleRowDe(event)
    {
        // let s_x = this.state.selected_x ;
        let s_y = this.state.selected_y ;
        if(this.state.selected_x !== '' && this.state.selected_y !=='')
            {
                let copyGrid =  {...this.state.grid};

                for(let i = 1 ; i <= this.state.X ; i++)
                {
                    for(let j = parseInt(s_y) ; j <= this.state.Y ; j++)
                    {
                        copyGrid[String(i) + '-' + String(j)] = copyGrid[String(i) + '-' + String(j+1)]
                    }
                }
                this.setState({grid:copyGrid, Y:this.state.Y-1}) ;
            }
    }


    calculateCss = (x,y) => {
        const css = {
          width: '80px',
          padding: '4px',
          margin: '0',
          height: '25px',
          boxSizing: 'border-box',
          position: 'relative',
          display: 'inline-block',
          color: 'black',
          border: '1px solid #cacaca',
          textAlign: 'left',
          verticalAlign: 'top',
          fontSize: '14px',
          lineHeight: '15px',
          overflow: 'hidden',
        }

        if (x === 0 || y === 0) {
            css.textAlign = 'center'
            css.backgroundColor = '#f0f0f0'
            css.fontWeight = 'bold'
          }
        
        if (String(x) === this.state.selected_x || String(y) === this.state.selected_y)
        {
            css.backgroundColor = 'rgba(0, 128, 128, 0.2)'
        }
        
        return css
    }
    render() {
        let table = [] ;
        for (let y = 0; y < this.state.Y + 1; y += 1) {
            let row = [] ;
            for (let x = 0; x < this.state.X + 1; x += 1) 
            {
                let css = this.calculateCss(x,y) ;
                if(String(x) === this.state.edit_x && String(y) === this.state.edit_y)
                {
                    let temp = <input 
                                    type="text" 
                                    id = {String(x) + '-' + String(y)} 
                                    key = {String(x) + '-' + String(y)} 
                                    autoFocus 
                                    style={css} 
                                    onChange = {this.handleChange} 
                                    onKeyDown = {this.handleKeydown}
                                    onBlur = {this.handleBlur}
                                    value = {this.state.grid[String(x) + '-' + String(y)]}
                                /> ;
                    row.push(temp) ;
                }
                else if (String(x) === this.state.selected_x && String(y) === this.state.selected_y)
                {
                    let temp = <input 
                                    type="text" 
                                    id = {String(x) + '-' + String(y)} 
                                    key = {String(x) + '-' + String(y)} 
                                    autoFocus 
                                    style={css} 
                                    onChange = {this.handleChange} 
                                    onKeyDown = {this.handleKeydown}
                                    onBlur = {this.handleBlur}
                                    placeholder= {this.state.grid[String(x) + '-' + String(y)]}
                                /> ;
                    row.push(temp) ;
                } 
                else
                {
                    let word = '' ;
                    if(x === 0)
                    {
                        word = String(y) ;
                    }
                    else if(y === 0)
                    {
                        if (x <= 26)
                        {
                            const alpha = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') ;
                            word = alpha[x] ;
                        }
                        else
                        {
                            let T = x - 27;
                            let a = parseInt(T/26);
                            let b = T%26;

                            const alpha2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') ;
                            word = alpha2[a] + alpha2[b] ;
                        }
                    }
                    else
                    {
                        word = this.state.grid[String(x) + '-' + String(y)] ;
                    }
                    let temp = <span 
                                    onClick = {this.handleSelect} 
                                    onDoubleClick = {this.handleDoubleClick}
                                    style={css} id = {String(x) + '-' + String(y)} 
                                    key = {String(x) + '-' + String(y)}>{word}</span> ;
                    row.push(temp) ;
                }         
            }
            let temp2 = <div key = {'row' + String(y)}>{row}</div> ;
            table.push(temp2)
        }

        return (
            <>  
                <div className = 'a' style = {{border:'5px', borderColor : 'black' }}>
                    <button type="button" style = {{width : '100px', height : '40px'}} onClick={this.handleColAdd}>column +</button>
                    <button type="button" style = {{width : '100px', height : '40px'}} onClick={this.handleColDe}>column -</button>
                </div>
                <div className = 'b'>
                    <button type="button" style = {{width : '100px', height : '40px'}} onClick={this.handleRowAdd}>row +</button>
                    <button type="button" style = {{width : '100px', height : '40px'}} onClick={this.handleRowDe}>row -</button>
                </div>
                
                <div style={{ width: 'max-content', float: 'left'}} className ='c'>
                    {/* <Table x={28} y={100} /> */}
                    <div>{table}</div>
                </div>
                
            </>
        );
    }
}

export default FakeSheet;

