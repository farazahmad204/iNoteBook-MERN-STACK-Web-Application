import { useState } from "react";
import authContext from "./authContext";

import { useNavigate } from 'react-router-dom';


const host="http://localhost:3001";


const AuthState=(props)=>
    {


        let navigate =useNavigate();

         const [alert,setAlert]  = useState({message:"Welcome on iNoteBook ",type:"success"});
        
          const showalert=(message,type)=>
            {
              setAlert(
                {
                message: message,
                type: type
                }
               )
          
               setTimeout( ()=>
                 {
                
                  setAlert(null);
               },2000);
            }
     

        // const getuser=()=>{}
        const login_user=async (credentials)=>{

            const url = `${host}/api/auth/login`;
          
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                 },
              body: JSON.stringify(credentials)  // Convert object to JSON string before sending
            });
          
            const json = await response.json();
         

            if(json.success)
            {
             
                 //redirect to main home page
                 localStorage.setItem("token",json.authtoken);
                 showalert("Login Successfully...","success");
                 navigate("/");

               
            }
            else
            {
                showalert("Invalid credentials...","danger");
            }


        }

        const createuser=async (signupData)=>   
            {

                const url = `${host}/api/auth/createuser`;
          
                const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                     },
                  body: JSON.stringify({name:signupData.name ,email:signupData.email,password:signupData.password})  // Convert object to JSON string before sending
                });
            
                const json = await response.json();
               
    
                if(json.success)
                {
                    //redirect to main home page
                    localStorage.setItem("token",json.authtoken);
                    showalert("Account created Successfully...","success");
                    navigate("/");
                }
                else
                {
                    showalert("Invalid credentials...Account creation failed","danger");
                }
        }
        return (
            <authContext.Provider value={{login_user,createuser,showalert,alert}}>
                {props.children}
            </authContext.Provider>)

    }

export default AuthState;