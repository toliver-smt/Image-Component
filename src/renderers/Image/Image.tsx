/****************************************************************************
 * <b>Title: </b> React Image Component<p/>
 * <b>Description: </b>creates a react component where you can select
 * different images from a modal and preview them with a preview button
 * <p/>
 * <b>Copyright: </b> Copyright (c) 2023<p/>
 * <b>Company: </b> Silicon Mountain Technologies<p/>
 * @author Tyler Oliver
 * @version 1.0
 * @since Feb 23, 2023
 * <b>Changes: </b>
 ****************************************************************************/

import React, { useState } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField'


interface ImageProps {
  id?: string;
  value: string;
  updateValue: (newValue: string) => void;
  label: any;
  schema: any;
  uischema: any;
}

export const Image: React.FC<ImageProps> = ({
  id,
  value,
  updateValue,
  label,
  schema,
  uischema
}) => {

  //Define variables
  let fullId = "#properties/" + id;
  let imagePath = uischema.options.imagePath;
  let imageLabel = label ? <div><label>{label}</label></div> : "";

  //Using the file path, make a request to the server to get file size
  //Runs onload to give mySize enough time to populate
  let mySize = [];
  for (let i = 0; i<imagePath.length; i++) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", imagePath[i]);
    xhr.send();
    xhr.onload = function (event) {
      mySize.push(event.loaded);
    }
  }
  
  /**
   * Convert the file size to MB and print it, will utilize when I setRowData()
   * @param x the index of the current iteration
   * @returns requested size of file converted to MB
   */
  function callMySize(x) {
    return (mySize[x] / 1000000).toFixed(1);
  }
  

  //Initialize row and column data
  const [rowData, setRowData] = useState([{ id: null, fileName: null, fileSize: null }]);
  
  const columns = [
    { field: 'fileName', headerName: 'File name', width: 200 },
    { field: 'fileSize', headerName: 'File Size', width: 130 },
  ];

  //define selectedValue (the value that will populate my input)
  const [selectedValue, setSelectedValue] = useState(imagePath[0]);

  //define 'open' as a boolean. I will use this value to determine if the modal is open or closed
  const [open, setOpen] = useState(false);

  /**
   * Initialize rowData using setRowData, open modal
   */
  const handleOpen = () => {
    setRowData(() => {
      let myArr = [];
      for (let i = 0; i < imagePath.length; i++) {
        [
          myArr.push({ id: i, fileName: imagePath[i], fileSize: callMySize(i) + " MB"}),
        ]
      }
      return (myArr);
    });
    setOpen(true);
  }

  /**
   * Close the modal
   */
  const handleClose = () => {
    setOpen(false);
  }

  /**
   * Have my input display the file path, based on row selected
   * @param event 
   */
  function rowClick(event) {
    setSelectedValue(event.row.fileName);
    setOpen(false);
  }

  /**
   * preview the image of the selected path
   */
  function previewImage() {
    window.open(selectedValue, "_blank");
  }

  /**
  * Builds all of the pieces of the image component
  * @returns Image Component
  */
  return (
    <>
      <div id={fullId}>
        {imageLabel}
        <div style={{ marginTop: "25px" }}>
          <TextField value={selectedValue} size="small"></TextField>
          <Button style={{ marginLeft: "10px" }} size="large" variant="outlined" onClick={handleOpen}>Browse Images</Button>
          <Button style={{ marginLeft: "10px" }} size="large" variant="outlined" onClick={previewImage}>Preview Image</Button>
          <Dialog
            open={open}
            onClose={handleClose}
          >
            <Box sx={{ width: 500 }}>
              <DialogTitle>Select an Image</DialogTitle>
              <DataGrid
                autoHeight
                rows={rowData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                onRowClick={event => rowClick(event)}
              />
            </Box>
          </Dialog>
        </div>
      </div>
    </>
  );
};
