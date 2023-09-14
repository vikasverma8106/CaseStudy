import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const BookingPage = () => {
  const { stationId } = useParams();
  
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availablePorts, setAvailablePorts] = useState([]);
  const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);

  const checkAvailability = () => {
    const selectedStartTime = startTime;
    const selectedEndTime = endTime;

    // Define the API endpoint where you want to check availability
    const apiUrl = '/api/check-availability'; // Replace with your actual API endpoint

    // Prepare the request body with the selected time range
    const requestBody = {
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    };

    // Make an Axios POST request to check availability
    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        // Handle the response from the server
        const { availablePorts } = response.data;

        // Update the availablePorts state with the received data
        setAvailablePorts(availablePorts);

        // Set the flag to indicate that availability has been checked
        setIsAvailabilityChecked(true);
      })
      .catch((error) => {
        console.error('Error checking availability:', error);
      });
  };

  const DisplayStatus = () => {
    // Implement your logic here if needed
  };

  return (
    <div>
      <h1>Booking Page</h1>
      
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Select Start Time:</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Select End Time:</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={checkAvailability}>
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
                    <Button onClick={DisplayStatus}>Book Now</Button>
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
