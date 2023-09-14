import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

import "./Navbar.css";

export default function Navigation() {
    return (
        <Navbar bg="custom" variant="dark" className='px-5'>
            <Navbar.Brand href="#home" className="brand">EV Charging Management System</Navbar.Brand>
            {/* <Nav className="ml-auto"></Nav> */}
        </Navbar>
    )
}
