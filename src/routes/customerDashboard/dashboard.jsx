import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Station from '../../components/station/station';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from '../../axios/axios';
import Loader from '../../components/loader/loader';
import { Search } from 'react-bootstrap-icons';

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
    backgroundColor: "#CD5C5C"
  }

  useEffect(() => {
    const token = localStorage.getItem('authtoken')
    console.log(token)
    if (!token) {
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
            <h2 className="my-4">Howdy {name} !!</h2>
            <Form.Group controlId="locationFilter">
              <Form.Control
                placeholder='Search by Location'
                type="text"
                value={locationFilter}
                onChange={handleLocationFilterChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="my-5">
          {stationsData
            .filter((station) =>
              station.location.toLowerCase().includes(locationFilter.toLowerCase())
            )
            .map((station, index) => (
              // Wrap every two cards in a row
              (index % 2 === 0) && <Row key={station.stationid}>
                <Col md={6} className="my-3">
                  <Station key={station.stationid} station={station} />
                </Col>
                {stationsData[index + 1] && (
                  <Col md={6} className="my-3">
                    <Station key={stationsData[index + 1].stationid} station={stationsData[index + 1]} />
                  </Col>
                )}
              </Row>
            ))}
        </Row>

      </Container>
    </div>
  );
};

export default Dashboard;
