import React from "react"
import { Link } from "react-router-dom"
import { Navbar } from 'react-bootstrap'

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
