import styled from 'styled-components';

export const TableInternal = styled.div`
  .table.table-condensed.table-striped {
      margin-bottom: 0px;
  }
  .BI_tablehead {
      background-color: #7F56D9;
      color: #fff;
  }
  .table-condensed>thead.BI_tablehead>tr>th {
      padding: 20px 10px 20px 20px;
      text-transform: uppercase;
      font-weight: 400;
      font-size: 14px;
  }
  .table-striped>tbody>tr:nth-of-type(odd) {
      background-color: #f6f6f6;
  }
  .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
      border-top: none;
      border-bottom: 2px solid #fff;
  }
  .table-condensed>tbody.BI_tablebody>tr>td {
      padding: 15px 10px 15px 20px;
      text-transform: capitalize;
      font-weight: 400;
      font-size: 14px;
      color: #4d4d4f;
  }

  .fixed_header{
      table-layout: fixed;
      border-collapse: collapse;
  }

  .fixed_header tbody{
    display:block;
    width: 100%;
    overflow: auto;
    max-height: 80vh;
  }

  .fixed_header thead tr {
    display: block;
  }

  .fixed_header th, .fixed_header td {
    padding: 5px;
    text-align: left;
    width: 200px;
  }
`;