import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const editorConfiguration = {
  placeholder: "Nội dung",
};

class PluginUploadFile {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const srcImage = "https://storage.googleapis.com/banhcomdemo/slide.jpg"
        return Promise.resolve({ default: srcImage });
      } catch (error) {
        return Promise.resolve({ default: "" });
      }
    });
  }

  abort() { }
}

function PostEditer(props) {
  const { data, onEdit, onFocus } = props || {};
  const onChange = (event, editor) => {
    const value = editor.getData();
    onEdit({ target: { name: "content", value } });
  };
  return (
    <div className="PostEditer" style={{ background: "#fff", border: "1px solid #d0bebe", borderTop: "0px" }}>
      <CKEditor
        editor={DocumentEditor}
        config={editorConfiguration}
        data={data}
        onInit={(editor) => {
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
          editor.plugins.get("FileRepository").createUploadAdapter = (
            loader
          ) => {
            return new PluginUploadFile(loader);
          };
        }}
        // config={{ placeholder: "Nội dung" }}
        onChange={onChange}
        onFocus={(event, editor) => {
          onFocus();
        }}
      />
    </div>
  );
}

export default PostEditer;
