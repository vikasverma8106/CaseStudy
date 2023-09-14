// BookingPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookingPage = () => {
  const { stationId } = useParams();
  const [station, setStation] = useState(null);
  const [availablePorts, setAvailablePorts] = useState([]);

  useEffect(() => {
  // Fetch station details based on the stationId
   axios.get(`/api/stations/${stationId}`)
      .then((response) => {
        setStation(response.data);
        setAvailablePorts(response.data.ports); // Assuming ports is an array in station data
      })
      .catch((error) => {
        console.error('Error fetching station data:', error);
      });
  }, [stationId]);

  const handlePortBooking = (portId) => {
    // Implement port booking logic here
    // You can update the booking status for the selected port
    // You may want to send a request to your server to update the booking status
  };

  return (
    <div>
      <h1>Booking Page</h1>
      {station && (
        <div>
          <h2>Station: {station.name}</h2>
          <p>Location: {station.location}</p>
          <h3>Available Ports:</h3>
          <ul>
            {availablePorts.map((port) => (
              <li key={port.id}>
                Port {port.number} - {port.status === 'available' ? 'Available' : 'Booked'}
                <button onClick={() => handlePortBooking(port.id)}>Book</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
