import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

import "./Navbar.css";

export default function Navigation() {

    const token = localStorage.getItem('authtoken');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem('authtoken', '');
        localStorage.setItem('role', '');
        localStorage.setItem('name', '');
        navigate("/");
    }

    return (
        <Navbar bg="custom" variant="dark" className='px-5'>
            <Navbar.Brand href="#home" className="brand">EV Charging Management System</Navbar.Brand>
            {
                token && <Navbar.Collapse id="basic-navbar-nav" style={{ "justifyContent": "flex-end" }}>
                <Button onClick={handleLogout} variant="danger" className="ml-auto">
                    Logout
                </Button>
            </Navbar.Collapse>
            }
        </Navbar>
    )
}
