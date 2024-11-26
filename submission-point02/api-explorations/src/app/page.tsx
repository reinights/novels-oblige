
"use client"
import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Slate, Editable, withReact, useSlate, useFocused } from 'slate-react'
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Descendant,
  Range,
  BaseEditor
} from 'slate'
// TypeScript users only add this code
import { ReactEditor } from 'slate-react'
import Link from 'next/link';

type CustomElement = { type: 'paragraph'; children: CustomText[] } //starting code for Slate.js: https://docs.slatejs.org/walkthroughs/01-installing-slate
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

const initialValue: Descendant[] = [ //Unimplemented, but starting point of the hovering toolbar example: https://github.com/ianstormtaylor/slate/blob/main/site/examples/ts/hovering-toolbar.tsx
  {
    type: 'paragraph',
    children: [
      {
        text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
      },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', or anything else you might want to do!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try it out yourself! Just ' },
      { text: 'select any piece of text and the menu will appear', bold: true },
      { text: '.' },
    ],
  },
]

export default function Home() {
  const [editors, setEditors] = useState([{ id: 1, editor: withReact(createEditor()), value: initialValue }]); //Starting code modified for my usecase

  const addEditor = () => {
    setEditors(prevEditors => [
      ...prevEditors, //spread operator, represents the current values of the array
      { // creates a new editor.
        id: prevEditors.length + 1, 
        editor: withReact(createEditor()), 
        value: initialValue,
      },
    ]);
  };  
  const deleteEditor = (editorIdToDelete) => { //buggy at the moment, keys not totally unique
    setEditors((prevEditors) => { //creates new editors array with the specified id taken out using the filter function.
      const updatedEditors = prevEditors.filter(
        (editor) => editor.id !== editorIdToDelete
      );
      return updatedEditors; 
    });
  };
  return (
    <div className={"max-w-screen-lg m-auto"}>
      {/*Header*/}
      <div className={"mb-9"}>
        <h1 className={"text-3xl font-bold"}>Submission Point 2 - Text Editor</h1>
        <h2>Slate.js in Next.js. Tailwind practice also included</h2>
        <Link className={"text-red-600 text-2xl font-bold"}  href="page-viewer">Switch to Page Viewer (Joker Murray Scene)</Link>
        <p className={"font-bold text-xl text-red-400"}>VOLUME WARNING! Youtube Player will be maxed out, I do not know how to change its properties</p>
        <h2 className='font-bold'>Dependency used (Page Editor)</h2>
        <ul>
          <li>slate (yarn add slate slate-react)</li>
          <li>slate-react</li>
        </ul>
        <h2 className='font-bold'>Dependency used (Text)</h2>
        <ul>
          <li>howler.js (npm install howler)</li>
          <li>[temporary] youtube video api (npm install react-youtube)</li>
        </ul>
      
      </div>
      {/*Map for editors*/}
      <div className="flex flex-col gap-6">
        {editors.map(({ id, editor, value }) => (
          <div key={id}>
            {/*Slate components typically made up of a Slate component and the Editable component */}
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
              {/*Indicators, and close button */}
              <div className={"flex justify-between"}>
                <p>Page {id}</p> 
                <button  
                  onClick={() => deleteEditor(id)}
                  className={"text-white bg-red-500 p-0.5 w-10"}>
                    X
                </button>
              </div>
              <Editable 
                className="border-2 border-black rounded-md p-2"/>
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
