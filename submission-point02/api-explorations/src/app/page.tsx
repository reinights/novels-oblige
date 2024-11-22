
"use client"

import React, {useState} from 'react';

import { createEditor } from 'slate';

import {Slate, Editable, withReact} from 'slate-react'


// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

export default function Home() {
  const [editors, setEditors] = useState([{ id: 1, editor: withReact(createEditor()), value: initialValue }]);

  const addEditor = () => {
    setEditors(prevEditors => [
      ...prevEditors, //spread operator, represents the current values of the array
      {
        id: prevEditors.length + 1, 
        editor: withReact(createEditor()), 
        value: initialValue,
      },
    ]);
  };  
  const deleteEditor = (editorIdToDelete) => { //buggy at the moment, keys not totally unique
    setEditors((prevEditors) => {
      const updatedEditors = prevEditors.filter(
        (editor) => editor.id !== editorIdToDelete
      );
      return updatedEditors; 
    });
  };
  return (
    <div className={"max-w-screen-lg m-auto"}>
      <div className={"mb-9"}>
        <h1 className={"text-3xl font-bold"}>Submission Point 2 - Text Editor</h1>
        <h2>Slate.js in Next.js. Tailwind practice also included</h2>
      </div>
      <div className="flex flex-col gap-6">
        {editors.map(({ id, editor, value }) => (
          <div key={id}>
            <Slate 
              editor={editor} 
              initialValue={value}
              onChange={newValue => {
                setEditors(prevEditors => {
                  return prevEditors.map(ed => {
                    if (ed.id === id) { //makes the changes on each editor secure to its editor
                      return { ...ed, value: newValue };
                    }
                    return ed;
                  });
                });
              }}
            >
              <div className={"flex justify-between"}>
                <p>Page {id}</p> 
                <button  
                  onClick={() => deleteEditor(id)}
                  className={"text-white bg-red-500 p-0.5 w-10"}>
                    X
                </button>
              </div>
              <Editable className="border-2 border-black rounded-md p-2"/>
            </Slate>
          </div>
        ))}
        <button
          onClick={addEditor}
          className="border-2 border-black rounded-md p-2 text-3xl w-12 self-center"
        >
          +
        </button>
      </div>

      <button onClick={() => console.log(editors)} className={"bg-slate-600 p-3 text-white font-bold rounded-md mt-9"}>Submit</button>
    </div>
  );
}
