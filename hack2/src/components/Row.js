import Grid from '../components/Grid'
export default function Row ({ row_id, row_content, key }) {
  let to_pass_2 =[];
  

  for(let i = 0 ; i < row_content.length; i++)
  {
    to_pass_2.push(<Grid row_id = {row_id} col_id = {i} cell_content={row_content[i]} key = {'col' + String(i)} />)
  }

    return (
        <tr>
          {/* <Grid />) */}
          {/* {row_content.map( (cell) => (<Grid cell_content={cell} row_id = {row_id} key = {cell} />) )} */}
          {to_pass_2}
        </tr>
    );
};