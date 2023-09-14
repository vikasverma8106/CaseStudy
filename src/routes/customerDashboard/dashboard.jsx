import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Station from '../../components/station/station';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from '../../axios/axios';
import Loader from '../../components/loader/loader';

const Dashboard = () => {

  const navigate = useNavigate();

  const [stationsData, setStationsData] = useState([]); 
  const [locationFilter, setLocationFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const name = localStorage.getItem('name');

  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
  };

  const navstyles = {
    backgroundColor : "#CD5C5C"
  }

  useEffect(() => {
    const token = localStorage.getItem('authtoken')
    console.log(token)
    if(!token){
      console.log("no token")
      navigate("/")
    }
    // Fetch station data when the component mounts
    setLoading(true);
    axios.get('/customer/stations')
      .then((response) => {
        // Update stationsData with the fetched data
        setStationsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching station data:', error);
      });
    setLoading(false);
  }, []);

  //const commonstyle ={
    //backgroundColor: '#7CFC00'
  //}

  return (
  <div className='dashboard-container'>
    <Container>
      <Row>
        <Col>
          <h2 className="mt-4">Howdy {name} !!</h2>
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
    <Station key={station.stationid} station={station} />
  ))}
          </div>
        </Col>
      </Row>
    </Container>
</div>
  );
};

export default Dashboard;
