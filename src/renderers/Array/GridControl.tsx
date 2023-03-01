import React, { useState } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Grid } from "./Grid";

/**
 * Handle the attributes passed into this control render
 */
interface GridControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  label: any;
  schema?: any;
  uischema?: any;
}

/****************************************************************************
 * <b>Title:</b> HtmlControl.tsx
 * <b>Project:</b> schema-display-ui
 * <b>Description:</b> Defines the rendering layout for the custom WYSIWYG editor
 * <b>Copyright:</b> Copyright (c) 2023
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 3.0
 * @since Feb 17, 2023
 * <b>updates:</b>
 * 
 ****************************************************************************/
const GridControl = ({
  data,
  handleChange,
  path,
  label,
  schema,
  uischema
}: GridControlProps) => {
  return (
    <Grid
      id={path}
      value={data}
      updateValue={(ev: any) => handleChange(path, Number(ev))}
      label={label}
      schema={schema}
      uischema={uischema}
    />
  );
};

export default withJsonFormsControlProps(GridControl);
