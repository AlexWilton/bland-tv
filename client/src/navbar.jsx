import React from "react"
import { NavLink } from "react-router-dom"
import { Nav, NavDropdown, Navbar, Form, FormControl, Button, Container } from 'react-bootstrap'

const NavBar = () => {
  return (
    <div className="topNavbar">
      <Navbar>
        <Navbar.Brand style={{ color: "white" }} href="/"><strong>TV Bland</strong></Navbar.Brand>
      </Navbar>
    </div>
  )
}

export default NavBar
