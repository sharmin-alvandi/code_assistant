import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  color: white;
  cursor: pointer;
`;

const Editor = (props) => {
  const [open, setOpen] = useState(true);

  const { language, displayName, value, onChange } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  return (
    <div className={`editor-container ${open ? "" : " collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <Button onClick={() => setOpen((prevOpen) => !prevOpen)}>
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </Button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
};
export default Editor;
