import React ,{useState,useContext}from "react";
import authContext from "../context/auth/authContext"

const SignUp = () => {


  const [signupData,setsignupData]=useState({name:"",email: "", password:"",cpassword:""})

  const context_auth=useContext(authContext);


  const {createuser,showalert}=context_auth;


  const hanldeonSubmit=(e)=>{
     e.preventDefault();
     createuser(signupData);
     setsignupData({name:"",email: "", password:"",cpassword:""})
     showalert("Accout has been created Successfully...","success");
 }
 
 const handleOnChange=(e)=>{
 
      setsignupData({...signupData , [e.target.name]: e.target.value})
     
 } 



  return (
    <div className="container my-2">
      <form className="row g-3" onSubmit={hanldeonSubmit}>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="John.Wick"
            onChange={handleOnChange} 
            value={signupData.name}
            required
             minLength={3}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email"  name="email"  required  onChange={handleOnChange}  value={signupData.email}  minLength={3}/>
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password"   name="password"   required  onChange={handleOnChange} value={signupData.password} minLength={3}/>
        </div>
        <div className="col-md-6">
          <label htmlFor="cpassword" className="form-label">
            confirm Password
          </label>
          <input type="password" className="form-control" id="cpassword"  name="cpassword"   required  onChange={handleOnChange} value={signupData.cpassword}  minLength={3}/>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
