import React, { useState } from "react";
import { DefaultEditor } from 'react-simple-wysiwyg';

interface HtmlProps {
  id?: string;
  value: string;
  updateValue: (newValue: string) => void;
  label: any;
  schema: any;
  uischema: any;
}

export const Html: React.FC<HtmlProps> = ({
  id,
  value,
  updateValue,
  label,
  schema,
  uischema
}) => {
  
  const [html, setHtml] = React.useState(value ? value : 'my <b>HTML</b>');
  
  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <DefaultEditor value={html} onChange={onChange} />
  );
};
