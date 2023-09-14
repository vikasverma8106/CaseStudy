import React, { useState, useEffect } from 'react';
import Station from '../Stations/station';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { NavLink } from 'react-router-dom';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';




  
  
  // Add more station objects as needed



const Dashboard = () => {
  const [stationsData, setStationsData] = useState([]); 
  const [locationFilter, setLocationFilter] = useState('');

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const navstyles = {
    backgroundColor : "#CD5C5C"
  }

  useEffect(() => {
    // Fetch station data when the component mounts
    axios.get('your_api_endpoint_here')
      .then((response) => {
        // Update stationsData with the fetched data
        setStationsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching station data:', error);
      });
  }, []);

  //const commonstyle ={
    //backgroundColor: '#7CFC00'
  //}

  return (
  <div className='dashboard-container'>  
    <Navbar style={navstyles} expand="lg">
        <Container>
          <Navbar.Brand href="/">EV Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ marginLeft: 'auto' }}>
              <NavLink className="nav-link" exact to="/profile">
                Profile
              </NavLink>
              <NavLink className="nav-link" exact to="/">
                Logout
              </NavLink>
              {/* Add more navigation links here */}
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    <Container>
      <Row>
        <Col>
          <h1 className="mt-4">Charging Stations Dashboard</h1>
          <Form.Group controlId="locationFilter">
            <Form.Label>Filter by Location:</Form.Label>
            <Form.Control
              type="text"
              value={locationFilter}
              onChange={handleLocationFilterChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="station-list">
          {stationsData
  .filter((station) =>
    station.location.toLowerCase().includes(locationFilter.toLowerCase())
  )
  .map((station) => (
    <Station key={station.id} station={station} />
  ))}
          </div>
        </Col>
      </Row>
    </Container>
</div>
  );
};

export default Dashboard;
