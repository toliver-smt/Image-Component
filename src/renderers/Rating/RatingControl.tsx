import React, { useState } from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Rating } from "./Rating";

/**
 * Interface to be used to determin e if the rating renderer will be used
 */
interface RatingControlProps {
  data: any;
  handleChange(path: string, value: any): void;
  path: string;
  label: any;
  schema?: any;
}

/****************************************************************************
 * <b>Title:</b> ratingControlTester.tsx
 * <b>Project:</b> schema-display-ui
 * <b>Description:</b> Class and interface to determine if the rating custom renderer
 * will be used for this field
 * <b>Copyright:</b> Copyright (c) 2021
 * <b>Company:</b> Silicon Mountain Technologies
 * 
 * @author James Camire
 * @version 3.0
 * @since Feb 17, 2023
 * <b>updates:</b>
 * 
 ****************************************************************************/
const RatingControl = ({
  data,
  handleChange,
  path,
  label,
  schema,
}: RatingControlProps) => {
  return (
    <Rating
      id={path}
      value={data}
      updateValue={(ev: any) => handleChange(path, Number(ev))}
      label={label}
      schema={schema}
    />
  );
};

export default withJsonFormsControlProps(RatingControl);
