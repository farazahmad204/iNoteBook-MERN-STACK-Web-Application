import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from 'react-router-dom';

export default function Notes() {

  const  navigate=useNavigate();

  const context = useContext(noteContext);
  //destruct the NoteContext object
  const { notes, fetchnotes, editnote } = context;

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      fetchnotes();
    }
    else
    {
      navigate("/login");
    }
    
  }, []);

  const [note,setnote]=useState({id: "default", etitle:"default",edescription:"default",etag:"default"})
  const ref = useRef(null);
  const refclose=useRef(null);

  const updatenote = (editnote) => {
    ref.current.click();
    setnote({id:editnote._id, etitle:editnote.title,edescription:editnote.description,etag:editnote.tag});
  };

      const handleClick=(e)=>{
              refclose.current.click();
    
              editnote(note.id, note.etitle,note.edescription, note.etag);
      }
  
      const handleOnChange=(e)=>{
       
          setnote({...note , [e.target.name]: e.target.value})
      }


  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note: Title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                
            <form htmlFor="row g-3">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={note.etitle}
              placeholder="add a title"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="edescription"
              name="edescription"
              rows="3"
              placeholder="add some descriptio here"
              value={note.edescription}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              placeholder="add a tag"
              value={note.etag}
              onChange={handleOnChange}
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>
           
              Update Note
            </button>

            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h2>Your Notes</h2>
        <div className="row my-3 text-center bold">
          {notes.length === 0 && 'No, notes to display'}
          {notes.map((note) => {
            return (
              <Noteitem note={note} updatenote={updatenote} key={note._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}
