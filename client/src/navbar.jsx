import React from "react"
import { NavLink, Link } from "react-router-dom"
import { Nav, NavDropdown, Navbar, Form, FormControl, Button, Container } from 'react-bootstrap'

const NavBar = () => {
  return (
    <div className="topNavbar">
      <Navbar>
      <Link to="/"><Navbar.Brand style={{ color: "white" }}><strong>TV Bland</strong></Navbar.Brand></Link>
      </Navbar>
    </div>
  )
}

export default NavBar
