
import React, { useState } from "react"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./App.scss";
import axios from "axios";

function Documents() {
  
  const [data, setData] = useState("");

  const [editor, setEditor] = useState(null);
  const getDatabtn = () => {
    console.log(editor.getData())
  }
    
  const [items, setItems] = useState([]);
  const [docTitle, setDocTitle] = useState("");

  const [id, setId] = useState("");

  var link;
  var localHost = ['localhost', '127.0.0.1']

  if (localHost.includes(window.location.hostname)) {
    link = 'http://localhost:1337'
  } else {
    link = 'https://editorbackend.azurewebsites.net/';
  }


  function postDocs() {
    console.log(editor.getData())
    setData(editor.getData());
    axios.post(link + "/add", {
      name: docTitle,
      value: editor.getData(),
    });
  }

  const handleChange = (event) => {
    setDocTitle(event.target.value);
  };

  function getDocs() {
    axios.get(link + "/items").then((res) => {
      setItems(res.data);
      console.log(items);
    });
  }
  

  function updateDocs() {
    axios.patch(`${link}/update/${id}`, {
      name: docTitle,
      value: editor.getData(),
    });
    getDocs();
  }

  function sendItems(id, docTitle, text) {
    setId(id);
    setDocTitle(docTitle);
    setData(text)
  }
  return (
    <div className="App">
      <div className="docTitle">
        Document Title: {""}
        <input type="text" name="docTitle" value={docTitle} onChange={handleChange} />
      </div>
      <div className="Editor">
        <CKEditor
          style={{ hieght: "400px" }}
          editor={ClassicEditor}
          data={data}
          onReady={(editor) => {
            setEditor(editor);
          }}
        />
      </div>
      <div className="buttons">
      <button className="Button" onClick={postDocs}>Save</button>
      <button className="Button" onClick={updateDocs}>Edit</button>
      <button className="Button" onClick={getDocs}>Show</button>
      <button className="Button" onClick={getDatabtn}>Console</button>
      </div>
      <div className="result">
        <ul>
          {items.map((item) => (
            <li key={item._id} onClick={() => sendItems(item._id, item.name, item.value)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Documents;
