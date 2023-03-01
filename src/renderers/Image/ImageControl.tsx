import React, { useState } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Image } from "./Image";

/**
 * Handle the attributes passed into this control render
 */
interface ImageControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  label: any;
  schema?: any;
  uischema?: any;
}

/****************************************************************************
 * <b>Title:</b> ImageControl.tsx
 * <b>Project:</b> schema-display-ui
 * <b>Description:</b> Defines the rendering layout for the custom image render
 * <b>Copyright:</b> Copyright (c) 2023
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 3.0
 * @since Feb 17, 2023
 * <b>updates:</b>
 * 
 ****************************************************************************/
const ImageControl = ({
  data,
  handleChange,
  path,
  label,
  schema,
  uischema
}: ImageControlProps) => {
  return (
    <Image
      id={path}
      value={data}
      updateValue={(ev: any) => handleChange(path, Number(ev))}
      label={label}
      schema={schema}
      uischema={uischema}
    />
  );
};

export default withJsonFormsControlProps(ImageControl);
