import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import config from "../../config/config";
import { useSelector } from "react-redux";

function RTE({ name, control, label, defaultValue = "" }) {
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode);

  return (
    <div >
      {label && <label className="mb-3">{label}</label>}
      <Controller
        name={name || "content"} rules={{required:"Required"}}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor 
            key={isDarkMode} // Key to force re-rendering of Editor component
            id="editor"
            apiKey={config.tinyMceApiKey}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
                'anchor',
              ],
              toolbar: 'ltr | undo redo | blocks | image | bold italic forecolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
              content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",
              skin: isDarkMode ? "oxide-dark" : "oxide",
              content_css: isDarkMode ? 'dark' : 'default',
            }}
          />
        )}
      />
    </div>
  );
}

export default RTE;
