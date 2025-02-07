import React,{useState,useContext} from 'react'
import authContext from "../context/auth/authContext"

export default function Login() {


    const [credentials,setcredentials]=useState({email: "", password:""})

    const context_auth=useContext(authContext);

    const {login_user}=context_auth;


    const handleClick=(e)=>{
       e.preventDefault();
       login_user(credentials);
       setcredentials({email: "", password:""})
   }
   
   const handleOnChange=(e)=>{
   
       setcredentials({...credentials , [e.target.name]: e.target.value})
   } 
    return (
        <>
        <form onSubmit={handleClick}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleOnChange}
              value={credentials.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleOnChange}
              value={credentials.password}
            />
          </div>
         
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    )
}

