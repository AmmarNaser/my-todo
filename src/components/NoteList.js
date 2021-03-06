import React, { useEffect, useState } from "react";
import "./NoteList.css";
import CreateNote from "../modals/CreateNote";
import ListCard from "./ListCard";

const NoteList = () => {
  const [modal, setModal] = useState(false);
  const [NoteList, setNoteList] = useState([]);

  useEffect(() => {
    const arr = localStorage.getItem("NoteList");

    if (arr) {
      const obj = JSON.parse(arr);
      setNoteList(obj);
    }
  }, []);
  const toggle = () => {
    setModal(!modal);
  };

  const updateListArray = (obj, index) => {
    let tempList = NoteList;
    tempList[index] = obj;
    localStorage.setItem("NoteList", JSON.stringify(tempList));
    setNoteList(tempList);
    window.location.reload();
  };

  const saveNote = (taskObj) => {
    let tempList = NoteList;
    tempList.push(taskObj);
    localStorage.setItem("NoteList", JSON.stringify(tempList));
    setNoteList(tempList);
    setModal(false);
  };

  const deleteNote = (index) => {
    const tempList = NoteList;
    tempList.splice(index, 1);
    localStorage.setItem("NoteList", JSON.stringify(tempList));
    setNoteList(tempList);
    window.location.reload();
  };

  return (
    <>
      <div className="header text-center">
        <h1 className="">Notes List</h1>
        <button
          onClick={() => {
            setModal(true);
          }}
          className="btn btn-outline-primary"
        >
          <strong>New</strong>
        </button>
      </div>
      <div className="card-container">
        {NoteList.map((obj, index) => (
          <ListCard
            taskObj={obj}
            index={index}
            key={index}
            deleteNote={deleteNote}
            update={updateListArray}
          />
        ))}
      </div>
      <CreateNote toggle={toggle} modal={modal} save={saveNote} />
    </>
  );
};

export default NoteList;
