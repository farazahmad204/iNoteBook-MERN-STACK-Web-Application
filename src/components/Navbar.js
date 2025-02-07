import React, { useEffect } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'



export default function Navbar() {

    const location = useLocation();

    const  navigate=useNavigate();


    const hanldlelogoutclick=()=>{

      localStorage.removeItem('token')
      navigate("/login");

    }

    useEffect(()=>{
        // console.log(location);
    },[location]);



  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" : ' '} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active" : ' '} `} to="/about">about</Link>
        </li>
        </ul>
        <ul>
        {!localStorage.getItem('token') ? (
  <>
    <li className="nav-item">
      <Link
        className={`btn btn-primary my-2 ${location.pathname === "/login" ? "active" : ""}`}
        to="/login"
      >
        Login
      </Link>
    </li>
    <li className="nav-item">
      <Link
        className={`btn btn-primary my-2 ${location.pathname === "/signup" ? "signup" : ""}`}
        to="/signup"
      >
        SignUp
      </Link>
    </li>
  </>
) : (
  <li className="nav-item">
    <button
      className={`btn btn-primary my-2 ${location.pathname === "/logout" ? "logout" : ""}`}
      to="/logout"
      onClick={hanldlelogoutclick}
    >
      Logout
    </button>
  </li>
)}
      </ul>
    </div>

  </div>
</nav>
    </>
  )
}

