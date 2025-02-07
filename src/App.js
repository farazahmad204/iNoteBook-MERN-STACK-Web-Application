import "./App.css";
import React from "react";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Login  from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";




import AuthState from "./context/auth/AuthState";

import NoteState from "./context/notes/NoteState";



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  return (

   
      <Router>
         <AuthState>
         <NoteState>
        <div className="App">
          <Navbar />
          <Alert alert/>

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
             
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
            </Routes>
          </div>
        </div>
        </NoteState>
        </AuthState>
      </Router>
   

  );
}

export default App;
