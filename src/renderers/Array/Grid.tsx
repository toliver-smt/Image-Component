import React, { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface GridProps {
  id?: string;
  value: string;
  updateValue: (newValue: string) => void;
  label: any;
  schema: any;
  uischema: any;
}
let ctr = 0;
export const Grid: React.FC<GridProps> = ({
  id,
  value,
  updateValue,
  label,
  schema,
  uischema
}) => {

  const [rowData, setRowData] = useState(() => [
    { id: ctr++, startDate: '01/01/2023', message: "Hello World", selection: "foo" },
    { id: ctr++, startDate: '01/02/2023', message: "James Camire", selection: "foo" },
    { id: ctr++, startDate: '01/03/2023', message: "Billy Larsen", selection: "bar" }
  ]);
  const [columnDefs] = useState(getColumns())
  /**
   * Takes the items from the schema definition and creates an editable column
   * for each.  
   * @returns 
   */
  function getColumns() {
    let fields = []
    fields.push({ field: 'id', headerName: 'ID', hide: true, width:50 });

    let keys = Object.keys(schema.items.properties);
    keys.forEach(function (key: string) {
      let col = schema.items.properties[key];
      let valueOptions = [];
      if (col.enum) {
        col.format = "singleSelect";
        valueOptions = col.enum;
      }
      fields.push({
        field: key,
        headerName: col.label ? col.label : key,
        type: col.format ? col.format : col.type,
        valueOptions : valueOptions,
        editable: true,
        flex: 1
      });
    });
    console.log(fields);
    return fields;
  }

  /**
   * Adds a row to the data set
   */
  function addRow() {
    let row: any = { id: ctr++ };
    let keys = Object.keys(schema.items.properties);
    keys.forEach(function (key: string) {
      row[key] = null;
    });
    
    setRowData((prevRows) => [...prevRows, row]);
  }

  return (
    <div style={{paddingTop: "25px"}}>
      <Button style={{marginBottom: "10px"}} variant="outlined" onClick={addRow}>Add Row</Button>
      <Button style={{marginBottom: "10px", marginLeft: "5px"}} variant="outlined" onClick={addRow}>Delete Selected</Button>
      <Box sx={{ height: 400, width: '100%', display: 'flex' }}>
        <DataGrid
          rows={rowData}
          columns={columnDefs}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
};
