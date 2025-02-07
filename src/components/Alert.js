import React ,{useContext}from "react";
import authContext from "../context/auth/authContext";


export default function Alert( ) {

 const context_auth=useContext(authContext);
  const {alert}=context_auth;

  if (!alert===null){return null}
  
 const capitalize_word = (word) =>
    {
        const text=word.toLowerCase();
        return text.charAt(0).toUpperCase() + text.slice(1);

    }


  return (
    alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize_word(alert.type)}!</strong> {alert.message}
  
      </div>
    
  );
}