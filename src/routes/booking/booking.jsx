import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from '../../axios/axios';

const BookingPage = () => {
  const { stationid } = useParams();
  const navigate = useNavigate();

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availablePorts, setAvailablePorts] = useState([]);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);

  const checkAvailability = (event) => {

    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    axios.post('/customer/ports',{
      StartTime: new Date(startTime).toISOString(),
      EndTime: new Date(endTime).toISOString(),
      Stationid: stationid
    }).then((response) => {
        const availablePorts  = response.data.ports;
        setAvailablePorts(availablePorts);
        setIsAvailabilityChecked(true);
      })
      .catch((error) => {
        console.error('Error checking availability:', error);
        alert("something went wrong");
      });
  };

  const handleBooking = () => {
    axios.post('/customer/book',{
      StartTime: new Date(startTime).toISOString(),
      EndTime: new Date(endTime).toISOString(),
      Stationid: stationid
    }).then((response) => {
        if(response.data.type === "success"){
          navigate(-1);
          alert("Port booked successfully. Your booking id is " + response.data.id);
        }
      })
      .catch((error) => {
        console.log(error);
        if(error.response.data)
          alert(error.response.data.message);
        else
          alert("something went wrong");
      });
  };

  return (
    <div>
      <h1>Booking Page</h1>

      <div>
        <Form onSubmit={checkAvailability}>
          <Form.Group>
            <Form.Label>Select Start Time:</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select End Time:</Form.Label>
            <Form.Control
              required
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type='submit'>
            Check Availability
          </Button>
        </Form>
        {isAvailabilityChecked && (
          <div>
            <h3>Available Ports within Selected Time:</h3>
            <ListGroup>
              {Array.from({ length: availablePorts }).map((_, index) => (
                <div key={index}>
                  <ListGroup.Item>
                    <p>Port {index + 1}</p>
                    <Button onClick={handleBooking}>Book Now</Button>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
