
"use client"
import React, { useCallback, useState } from 'react'
import { Slate, Editable, withReact, useSlate, useFocused } from 'slate-react'
import {
  Editor,
  Transforms,
  Text,
  createEditor,
  Descendant,
  Range,
  BaseEditor,
  Element
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
const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Ctrl + B for bold text (cannot undo)' }],
  },
]
export default function Home() {
  const [editors, setEditors] = useState([{ id: 1, editor: withReact(createEditor()), value: initialValue }]); //Starting code modified for my usecase
  const [audio, setAudio] = useState([]);

  //slate.js walkthrough
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

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
        <Link className={"text-white pl-3 pr-3 bg-red-600 text-2xl font-bold"}  href="page-viewer">Switch to Page Viewer (Joker Murray Scene)</Link>
        <p className={"font-bold text-xl text-red-600"}>VOLUME WARNING! Youtube Player will be maxed out, I do not know how to change its properties</p>
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
                renderElement={renderElement} 
                renderLeaf={renderLeaf}
                className="border-2 border-black rounded-md p-2"
                onKeyDown={event => { //slate.js walkthrough
                  if (!event.ctrlKey) { //listens for ctrl key being pressed
                    return
                  }
        
                  switch (event.key) {
        
                    // When "B" is pressed, bold the text in the selection.
                    case 'b': {
                      event.preventDefault()
                      Editor.addMark(editor, 'bold', true)
                      break
                    }
                  }
                }}
                />
                
              <button onClick={() => setAudio(prevSimulator => [...prevSimulator, <AudioSimulator key={audio.length}></AudioSimulator>])} className={"w-6/12 h-10 bg-slate-700 text-white text-bold"}>Add Sound (just generates black boxes that represent audio lengths)</button>
              <div>
                {audio}
              </div>
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

      <button onClick={() => console.log(editors)} className={"bg-slate-600 p-3 text-white font-bold rounded-md mt-9"}>Submit (console.logs the editor contents)</button>
    </div>
  );
}


const AudioSimulator = () => {
  return (
    <div style={{width: `${Math.floor(Math.random() * 100) + 1}%`}} className={"bg-black h-10"}>
    </div>
  )
}

//slate.js documentation walkthroughs
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component to render leaves with bold text.
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}