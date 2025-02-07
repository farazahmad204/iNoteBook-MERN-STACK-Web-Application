import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


export default function Noteitem(props) {


   const { note,updatenote } = props;

  const context=useContext(noteContext);
  //destruct the deletenote from NoteContext object
  const {deletenote}=context;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          
          <div className="d-flex align-items-center">
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}  style={{ cursor: 'pointer' }}></i>
          <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deletenote(note._id)}}  style={{ cursor: 'pointer' }}></i>
          <h5 className="card-title" >{note.title}</h5> 
          </div>
        </div>

          <p className="card-text">{note.description} </p>

      </div>
    </div>
  );
}
