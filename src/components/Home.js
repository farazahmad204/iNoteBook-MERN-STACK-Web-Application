import React, { useContext, useEffect } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

import authContext from "../context/auth/authContext"


export default function Home() {


  const context_auth=useContext(authContext);

  const {showalert}=context_auth;


  useEffect(() => {
    {showalert("Welcome on iNoteBook ","success")}
    
    return () => {
     
    }
  }, [])


  return (
    <>
     
    <AddNote/>
     <Notes/>

    </>
  );
}
