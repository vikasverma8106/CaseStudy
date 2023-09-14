import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

import "./Navbar.css";

export default function Navigation() {
    return (
        <Navbar bg="custom" variant="light" className='px-5'>
            <Navbar.Brand href="#home">EV Charging Management System</Navbar.Brand>
            <Nav className="ml-auto">
                
            </Nav>
        </Navbar>
    )
}
