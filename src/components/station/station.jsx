import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PlugFill } from 'react-bootstrap-icons';
const Station = ({ station }) => {

  const stationCardStyles = {
    border: '1px solid #ccc', // Border style for the station card
    padding: '10px',
    margin: '10px',
    borderRadius: '5px', // Rounded corners
    transition: 'box-shadow 0.3s ease', // Smooth transition for hover effect
    backgroundColor: '#c8e6c8',
  };

  return (
    //<NavLink style={navLinkStyles} to={`/station/${station.id}`} className="station-link">
    <div style={stationCardStyles} className="station-card">
      <h2>{station.name}</h2>
      <h3>No. of Ports: {station.ports}</h3>
      <h4>{station.Availability}</h4>
      <p>Location: {station.location}</p>
      <Link to={`/book/${station.stationid}`} className="btn" style={{backgroundColor:"#07677f", color:"#fff"}}>
      <span style={{display:"flex", alignItems:"center"}}>
                <PlugFill className='mx-1'/>
                Book Now
                </span>
      </Link>

    </div>
    //</NavLink>
  );
};

export default Station;
