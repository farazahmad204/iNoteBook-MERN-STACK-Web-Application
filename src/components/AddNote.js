import React,{useContext,useState} from "react";
import noteContext from "../context/notes/noteContext"

const AddNote = () => {


    const context=useContext(noteContext);
    //destruct the NoteContext object
      const {addnote}=context;


      const [note,setnote]=useState({title:"",description:"",tag:""})


    const handleClick=(e)=>{
            e.preventDefault();
            addnote(note.title,note.description,note.tag)
            setnote({title:"",description:"",tag:""})
    }

    const handleOnChange=(e)=>{

        setnote({...note , [e.target.name]: [e.target.value]})

    }

  return (
    <>
      <div className="container my-5">
        <h1>Add a Note</h1>
      </div>
      <div className="container my-2">
        <form htmlFor="row g-3">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="add a title"
              minLength={2}
              value={note.title}
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="add some descriptio here"
              minLength={3}
              value={note.description}
              required
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
              id="tag"
              name="tag"
              placeholder="add a tag"
              minLength={2}
              value={note.tag}
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <button disabled={note.title.length < 0 || note.description.length < 0}  type="submit" className="btn btn-primary mb-3" onClick={handleClick}>
            Add a Note
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNote;
