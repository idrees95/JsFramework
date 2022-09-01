import './App.scss';
import React, {useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor () {
    const [text, setText] = useState('')
    const getDatabtn = () => {
        console.log(text)
    }
    
    return (
      <><button className="btnclass" onClick={getDatabtn}>Save</button><div>
        <div className="center">
          <div className="editor">
            <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              } } />
          </div>
        </div>
      </div></>
    )
}
export default Editor;