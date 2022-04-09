import { TableInternal } from "./style";

function TableCustom({columns, rows}) {
  return (
    <TableInternal>
      <table className="table table-condensed table-striped fixed_header">
        <thead className="BI_tablehead">                     
          <tr>
          {
            columns.map((item, index) => 
              <th key={index}>{item.title}</th>
            )
          }
         </tr> 
        </thead>
        <tbody className="BI_tablebody">
        {
            rows && rows.map((line, index) => 
              <tr key={index}>{
                columns.map((col, indx) =>                      
                    <td key={indx}>{line[col.name]}</td>                  
                )                                  
                }</tr>
            )
          }
        </tbody>
      </table>      
    </TableInternal>
  );
}

export default TableCustom;