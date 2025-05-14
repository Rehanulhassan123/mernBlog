import { Editor } from "@tinymce/tinymce-react";
import React, { memo, useCallback, useState } from "react";
import { Spinner } from "../common";
import { editorInitialState } from "../../constants";
const editorApi = import.meta.env.VITE_TINYMCE_API_KEY;

const MemoEditor = memo(({ onChange, value }) => {
  const [loaded, setLoaded] = useState(false);
  const handleEditorChange = useCallback(
    (value) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <>
      {!loaded && <Spinner size={40} cssOverride={{ margin: "0 auto" }} />}
      <Editor
        style={{ display: loaded ? "block" : "none" }}
        apiKey={editorApi}
        value={value}
        onEditorChange={handleEditorChange}
        onInit={() => {
          setLoaded(true);
        }}
        init={editorInitialState}
      />
    </>
  );
});

const RTE = ({
  value = "",
  onChange = () => {},
  defaultValues = "",
  className = "",
}) => {
  return (
    <MemoEditor
      defaultValues={defaultValues}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
};

export default RTE;
