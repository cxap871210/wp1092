export default function Grid ({row_id, col_id, cell_content, key}) {
    
    

    let grid_id = 'grid-' + String(row_id) + '-' + String(col_id);
    let value_id = 'value-' + String(row_id) + '-' + String(col_id);
    let temp_class_name = 'grid';
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}


    let value = '' ;
    if(cell_content !== 0)
    {
        value = cell_content ;
    }
    
    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    // #########################

    return (
        <td>
                <div className={["grid", 'level-'+String(value)].join(' ')} id={grid_id}>
                    <div className="school-name" id={value_id}>{mapping[value]}</div>
                </div>
        </td>
    );
}