import React from 'react'
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
      <ul>
        {/* <Link to="/"> Home </Link> */}
        {/* <Link to="/about"> About </Link> */}
        {/* <Link to="/projects"> Projects </Link> */}
        
        {/*    ADD    */}
        <NavLink to="/" className={({ isActive }) => isActive ? "selected" : ""}>
          Home
        </NavLink>
        
        <NavLink 
          to="/signup" 
          className={({ isActive }) => isActive ? "selected" : ""}
         >
          Sign up
        </NavLink>
        
        <NavLink 
          to="/login" 
          className={({ isActive }) => isActive ? "selected" : ""}
        >
          Login
        </NavLink>
        
      </ul>
      
    </nav>
  )
}

export default Navbar