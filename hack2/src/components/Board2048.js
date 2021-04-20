import Row from './Row'

export default function Board2048 ({ board }) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";

    let to_pass = []
    for(let i = 0 ; i < board.length ; i++)
        {
            to_pass.push(<Row row_id = {i} row_content={board[i]} key = {'row'+String(i)} />)  
        }
        

    return (
        <>
        <table className={boardClassName} id="board-full">
            <tbody>
                {/* {board.map( (row_vector, row_idx) => (<Row key={row_idx} />) )} */}
                {
                    to_pass
                }
            </tbody>
        </table>
        <div className={infoClassName} id="game-over-info">
            <span id="game-over-text">{outSentence}</span>
            <div className="button" id="game-over-button">Try again</div>
        </div>
        </>
    );
};