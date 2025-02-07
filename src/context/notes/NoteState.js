import { useState } from "react";
import noteContext from "./noteContext";


const host="http://localhost:3001";


const NoteState=(props)=>
    {
    const initialized_notes=[];


      const [notes,setnotes] = useState(initialized_notes);


      //fetchnotes from api
      const fetchnotes=async ()=>{

        const url =`${host}/api/notes/fetchallnotes`;   //id=679dec1d55d802469b4cf475
       
        const  response = await fetch(url, {
            method: "GET", // POST, PUT, DELETE, etc.
            headers: {
              // the content type header value is usually auto-set
              // depending on the request body
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },

          });

       const json= await response.json();
 
       setnotes(json); //set json to notes


      }

      const addnote = async (title, description, tag) => {
       
      
        const data = { title: title[0], description: description[0], tag: tag[0] };

       
      
        const url = `${host}/api/notes/addnotes/`;
      
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify(data),  // Convert object to JSON string before sending
        });
      
        const json = await response.json();

        fetchnotes();


      }

      



      // delete a note 

      const deletenote=async(id)=>{


       //***********************************--- Handle API Call ---- ************************************// 
        const url =`${host}/api/notes/deletenote/${id}`;   //id=679dec1d55d802469b4cf475
       
        const  response = await fetch(url, {
            method: "DELETE", // POST, PUT, DELETE, etc.
            headers: {
              // the content type header value is usually auto-set
              // depending on the request body
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },

          });

          const json= response.json();
        //***********************************--- End Handle API Call ---- ************************************// 




        //reload  notes after delete
        const newnotes=notes.filter((note)=>{return  note._id !== id })

        setnotes(newnotes)

      }


      //edit a note 

      const editnote=async (id,title,description,tag)=>{

       
        const url =`${host}/api/notes/updatenote/${id}`;   //id=679dec1d55d802469b4cf475
       
        const  response = await fetch(url, {
            method: "PUT", // POST, PUT, DELETE, etc.
            headers: {
              // the content type header value is usually auto-set
              // depending on the request body
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}), // string, FormData, Blob, BufferSource, or URLSearchParams
            // referrer: "about:client", // or "" to send no Referer header,
            // // or an url from the current origin
            // referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
            // mode: "cors", // same-origin, no-cors
            // credentials: "same-origin", // omit, include
            // cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
            // redirect: "follow", // manual, error
            // integrity: "", // a hash, like "sha256-abcdef1234567890"
            // keepalive: false, // true
            // signal: undefined, // AbortController to abort request
            // window: window // null
          });

          const json= await response.json();

       fetchnotes();
      }
        return (
            <noteContext.Provider value={{notes , setnotes,addnote,deletenote,editnote,fetchnotes}}>
                {props.children}
            </noteContext.Provider>)

    }

export default NoteState;