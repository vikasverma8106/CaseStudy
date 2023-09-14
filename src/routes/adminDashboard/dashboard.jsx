import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from '../../axios/axios';

const AdminPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const name = localStorage.getItem('name')
  const [stations, setStations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStationData, setNewStationData] = useState({
    stationName: '',
    chargingrate: '',
    portNo: '',
    availability: '',
    location: '',
  });
  const [showEditForm, setShowEditForm] = useState(false);
  const [editStationData, setEditStationData] = useState(null);

  const fetchInitialData = async () => {
    axios
      .get('/admin/stations/?id=' + id)
      .then((response) => {
        setStations(response.data);
      })
      .catch((error) => {
        console.error('Error fetching stations:', error);
        alert("something went wrong");
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('authtoken');
    const role = localStorage.getItem('role');
    console.log(token)
    if (!token || role !== "admin") {
      console.log("no token or unauthorized")
      navigate("/")
    }
    const fetchData = async () => {
      await fetchInitialData();
    }
    fetchData();
  }, []);

  const handleAddStationClick = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStationData({
      ...newStationData,
      [name]: value,
    })
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStationData({
      ...editStationData,
      [name]: value,
    })
  };

  const handleAddStation = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    axios
      .post('/admin/station/create', {
        "Ports": newStationData.portNo,
        "chargingrate": newStationData.chargingrate,
        "Location": newStationData.location,
        "Availability": newStationData.availability,
        "stationName": newStationData.stationId
      })
      .then(async (response) => {
        console.log('New station added successfully:', response.data);
        setNewStationData({
          stationName: '',
          chargingrate: '',
          portNo: '',
          availability: '',
          location: '',
        });
        alert("Added successfully");
        setShowAddForm(false);
        await fetchInitialData();
      })
      .catch((error) => {
        console.error('Error adding new station:', error);
        setShowAddForm(false);
        alert("Something went wrong");
      });
  };

  const handleEditStationClick = (station) => {
    // Show the edit station form modal and set the current station data
    setShowEditForm(true);
    console.log(station);
    setEditStationData({
      stationid: station.stationid,
      availability: station.availability,
      location: station.location,
      chargingrate: station.chargingrate,
      portNo: station.ports,
      stationName: station.stationname,
    });
  };

  const handleCloseEditForm = () => {
    // Close the edit station form modal
    setShowEditForm(false);
  };

  const handleUpdateStation = async(event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    const updatedStation = {
      Availability: editStationData.availability,
      Location: editStationData.location,
      Chargingrate: editStationData.chargingrate,
      Ports: editStationData.portNo,
      Stationname: editStationData.stationName,
    };

    // Make an API request to update the station
    axios
      .put(`/admin/station/update/${editStationData.stationid}`, updatedStation) // Replace with your API endpoint
      .then(async(response) => {
        // Station updated successfully
        alert("updated successfully");
        console.log('Station updated:', response.data);
        // Clear the edited station data
        setEditStationData(null);
        // Close the edit form
        setShowEditForm(false);
        await fetchInitialData()
      })
      .catch((error) => {
        console.error('Error updating station:', error);
        alert("Something went wrong");
        setEditStationData(null);
        // Close the edit form
        setShowEditForm(false);
      });

    // You can also update the stations list here by making another API call if needed
  };

  const handleDeleteStation = (stationId) => {
    axios
      .delete(`/admin/station/delete/${stationId}`) // Replace with your API endpoint
      .then(async(response) => {
        // Station deleted successfully
        console.log('Station deleted:', response.data);
        alert("deleted successfully")
        // Update the stations list
        await fetchInitialData();
      })
      .catch((error) => {
        alert("something went wrong")
        console.error('Error deleting station:', error);
      });
  };

  const handleViewAnalytics = (stationId) => {

  }

  return (
    <div>
      <div className="px-5 mt-5" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
        <h3 className='py-3'> Howdy {name}, </h3>
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
      </div>

      <div style={{ display: "flex", "justifyContent": "space-around", flexWrap: 'wrap' }} className=" my-4 card-container">
        {stations.map((station) => (
          <Card key={station.id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title>{station.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Location: {station.location}
              </Card.Subtitle>
              <Card.Text>
                Station ID: {station.stationid}
                <br />
                Total no. of ports: {station.ports}
              </Card.Text>
              <Button className='mx-2' variant="warning" onClick={() => handleEditStationClick(station)}>
                Edit
              </Button>
              <Button className='mx-2' variant="danger" onClick={() => handleDeleteStation(station.stationid)}>
                Delete
              </Button>
              <Button className='mx-2' variant="success" onClick={() => handleViewAnalytics(station.stationid)}>
                View
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showAddForm} onHide={handleCloseAddForm}>
        <Form onSubmit={handleAddStation}>
          <Modal.Header closeButton>
            <Modal.Title>Add Station</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group controlId="stationName">
              <Form.Label>Station Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="stationName"
                value={newStationData.stationName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Label>Charging Rate (per hour)</Form.Label>
            <Form.Control
              required
              type="number"
              name="chargingrate"
              step="0.01" // Set the step for decimal values
              value={newStationData.chargingrate}
              onChange={handleInputChange}
            />
            <Form.Group controlId="portNo">
              <Form.Label>Total no. of ports</Form.Label>
              <Form.Control
                required
                type="number"
                name="portNo"
                value={newStationData.portNo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="availability">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                required
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
                required
                type="text"
                name="location"
                value={newStationData.location}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddForm}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Station
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEditForm} onHide={handleCloseEditForm}>
        <Form onSubmit={handleUpdateStation}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Station</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="stationName">
              <Form.Label>Station Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="stationName"
                value={editStationData?.stationName || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="chargingRate">
              <Form.Label>Charging Rate (per hour)</Form.Label>
              <Form.Control
                required
                type="number"
                name="chargingrate"
                step="0.1" // Set the step for decimal values
                value={editStationData?.chargingrate}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="portNo">
              <Form.Label>Port Number</Form.Label>
              <Form.Control
                required
                type="number"
                name="portNo"
                value={editStationData?.portNo || ''}
                onChange={handleEditChange}
              />
            </Form.Group>


            <Form.Group controlId="availability">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                required
                name="availability"
                value={editStationData?.availability}
                onChange={handleEditChange}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                required
                name="location"
                value={editStationData?.location || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditForm}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPage;
