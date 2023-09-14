import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const AdminPage = () => {
  const [stations, setStations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStationData, setNewStationData] = useState({
    stationName: '',
    chargingrate: '',
    portNo: '',
    availability:'',
    location: '',
   
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editStationData, setEditStationData] = useState(null);

  useEffect(() => {
    // Fetch the list of stations when the component mounts
    axios
      .get('/api/stations') // Replace with your API endpoint
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching stations:', error);
      });
  }, []);

  const handleAddStationClick = () => {
    // Show the add station form modal
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    // Close the add station form modal
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    // Update the new station data in state
    const { name, value } = e.target;
    setNewStationData({
      ...newStationData,
      [name]: value,
    });
  };

  const handleAddStation = () => {
    // Implement logic to add a new station here
    // You can use the newStationData state to get the input values
    // Make an API request to add the station to your backend
    // After successful addition, close the form and update the stations list
    const newStation = {
        stationName: newStationData.stationId,
        chargingRate: newStationData.chargingrate,
        portNo: newStationData.portNo,
        availability: newStationData.availability,
        location: newStationData.location

      };
    
      // Define the API endpoint where you want to add the new station
      const apiUrl = '/api/stations'; // Replace with your actual API endpoint
    
      // Make an Axios POST request to add the new station
      axios
        .post(apiUrl, newStation)
        .then((response) => {
          // Handle the response from the server
          console.log('New station added successfully:', response.data);
    
          // Clear the form fields
          setNewStationData({
            stationName: '',
            chargingrate: '',
            portNo: '',
            availability:'',
            location: '',
          });
    
          // Close the form modal
          setShowAddForm(false);
    
          // Optionally, update the stations list by making another API call if needed
          // You can fetch the updated stations list and set it using setStations(response.data)
        })
        .catch((error) => {
          console.error('Error adding new station:', error);
        });

    // You can also update the stations list here by making another API call if needed
  };

  const handleEditStationClick = (station) => {
    // Show the edit station form modal and set the current station data
    setShowEditForm(true);
    setEditStationData(station);
  };

  const handleCloseEditForm = () => {
    // Close the edit station form modal
    setShowEditForm(false);
  };

  const handleEditInputChange = (e) => {
    // Update the edited station data in state
    const { name, value } = e.target;
    setEditStationData({
      ...editStationData,
      [name]: value,
    });
  };

  const handleUpdateStation = () => {
    const updatedStation = {
        id: editStationData.id, // Include the station ID to identify which station to update
        stationName: newStationData.stationId,
        chargingRate: newStationData.chargingrate,
        portNo: newStationData.portNo,
        availability: newStationData.availability,
        location: newStationData.location


      };
    
      // Make an API request to update the station
      axios
        .put(`/api/update-station/${updatedStation.id}`, updatedStation) // Replace with your API endpoint
        .then((response) => {
          // Station updated successfully
          console.log('Station updated:', response.data);
    
          // Clear the edited station data
          setEditStationData(null);
    
          // Close the edit form
          setShowEditForm(false);
    
          // Update the stations list if needed
          // Fetch the updated stations list from the backend
          axios
            .get('/api/stations') // Replace with your API endpoint
            .then((response) => {
              setStations(response.data);
            })
            .catch((error) => {
              console.error('Error fetching stations:', error);
            });
        })
        .catch((error) => {
          console.error('Error updating station:', error);
        });

    // You can also update the stations list here by making another API call if needed
  };

  const handleDeleteStation = (stationId) => {
    axios
    .delete(`/api/delete-station/${stationId}`) // Replace with your API endpoint
    .then((response) => {
      // Station deleted successfully
      console.log('Station deleted:', response.data);

      // Update the stations list
      setStations((prevStations) =>
        prevStations.filter((station) => station.id !== stationId)
      );
    })
    .catch((error) => {
      console.error('Error deleting station:', error);
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Admin Page</h1>
      <Button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          textDecoration: 'none',
          padding: '10px',
          borderRadius: '5px',
          border: 'none',
        }}
        onClick={handleAddStationClick}
      >
        Add Station
      </Button>

      <div className="card-container">
        {stations.map((station) => (
          <Card key={station.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{station.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Location: {station.location}
              </Card.Subtitle>
              <Card.Text>
                Station ID: {station.stationId}
                <br />
                Port Number: {station.portNo}
              </Card.Text>
              <Button variant="primary" onClick={() => handleEditStationClick(station)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteStation(station.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showAddForm} onHide={handleCloseAddForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add Station</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="stationName">
              <Form.Label>Station Name</Form.Label>
              <Form.Control
                type="text"
                name="stationId"
                value={newStationData.stationId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Label>Charging Rate (per hour)</Form.Label>
  <Form.Control
    type="number"
    name="chargingRate"
    step="0.01" // Set the step for decimal values
    value={newStationData.chargingRate}
    onChange={handleInputChange}
  />
            <Form.Group controlId="portNo">
              <Form.Label>Port Number</Form.Label>
              <Form.Control
                type="number"
                name="portNo"
                value={newStationData.portNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="availability">
                 <Form.Label>Availability</Form.Label>
                <Form.Control
                    as="select"
                    name="availability"
                    value={newStationData.availability}
                    onChange={handleInputChange}
                >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="chargingRate">
 
</Form.Group>
<Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newStationData.location}
                onChange={handleInputChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddForm}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddStation}>
            Add Station
          </Button>
        </Modal.Footer>
      </Modal>

      

      
        <Modal show={showEditForm} onHide={handleCloseEditForm}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Station</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="stationName">
        <Form.Label>Station Name</Form.Label>
        <Form.Control
          type="text"
          name="stationId"
          value={editStationData?.stationId || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="chargingRate">
  <Form.Label>Charging Rate (per hour)</Form.Label>
  <Form.Control
    type="number"
    name="chargingRate"
    step="0.01" // Set the step for decimal values
    value={newStationData.chargingRate}
    onChange={handleInputChange}
  />
</Form.Group>
<Form.Group controlId="portNo">
        <Form.Label>Port Number</Form.Label>
        <Form.Control
          type="number"
          name="portNo"
          value={editStationData?.portNo || ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      
      
      <Form.Group controlId="availability">
  <Form.Label>Availability</Form.Label>
  <Form.Control
    as="select"
    name="availability"
    value={newStationData.availability}
    onChange={handleInputChange}
  >
    <option value="available">Available</option>
    <option value="unavailable">Unavailable</option>
  </Form.Control>
</Form.Group>
<Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={editStationData?.location || ''}
          onChange={handleInputChange}
        />
      </Form.Group>



    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditForm}>
      Close
    </Button>
    <Button variant="primary" onClick={handleUpdateStation}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

      
    </div>
  );
};

export default AdminPage;
