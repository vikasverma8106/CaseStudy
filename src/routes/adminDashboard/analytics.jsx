import React, { useEffect, useState } from 'react'
import axios from "../../axios/axios";
import { useNavigate, useParams, useLocation } from 'react-router';
import { Container, Row, Col, Card } from 'react-bootstrap';
import BarChart from './graphs';
import { PeopleFill, Star, Activity } from "react-bootstrap-icons"

export default function Analytics() {

    const location = useLocation();
    const station = location.state.station;
    const { id } = useParams();
    const navigate = useNavigate();
    const [emissionGraphData, setEmissionGraphData] = useState([]);
    const [bookingGraphData, setBookingGraphData] = useState([]);
    const [revenueGenerated, setRevenueGenerated] = useState();

    const fetchInitialData = async () => {
        axios
            .get('/admin/station/get?stationId=' + id)
            .then((response) => {
                if (response.data.type === "success") {
                    setEmissionGraphData(response.data.graphData2);
                    setBookingGraphData(response.data.graphData1);
                    setRevenueGenerated(response.data.revenue);
                } else {
                    alert("something went wrong");
                    navigate(-1);
                }
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


    return (
        <Container>
            <div className='mt-5' style={{ display: "flex", flexDirection: "row", alignItems: "baseline", justifyContent:"space-around"}}>
                {/* Details Section */}

                <div style={{textAlign:"left"}}>
                <Row>
                        <Col>
                            <h5 className='py-1'>Station ID: {station.stationid}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className='py-1'>Location: {station.location}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className='py-1'>Availability: {station.availability}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className='py-1'>Total Ports: {station.ports}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className='py-1'>Charging Rate: {station.chargingrate}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className='py-1'>Fast charging ports: {station.chargingrate}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h5 className='py-1'>: {station.chargingrate}</h5>
                        </Col>
                    </Row>
                    {/* Add more details rows here */}
                </div>

                {/* Cards Section */}
                <Row>
                    <Col md={5} className='my-2'>
                        <Card>
                            <Card.Body>
                                <h2 style={{ fontWeight: "200" }}>&#8377;</h2>
                                <h5>{revenueGenerated}</h5>
                                <p>Generated</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5} className='my-2'>
                        <Card>
                            <Card.Body>
                                <h2 style={{ fontWeight: "200" }}><Activity /></h2>
                                <h5>{10000}</h5>
                                <p>Customers</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5} className='my-2'>
                        <Card>
                            <Card.Body>
                                <h2 style={{ fontWeight: "200" }}><PeopleFill /></h2>
                                <h5>{20}</h5>
                                <p>Staff</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5} className='my-2'>
                        <Card>
                            <Card.Body>
                                <h2 style={{ fontWeight: "200" }}><Star /></h2>
                                <h5>{4.8}</h5>
                                <p>Rating</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>

            <Row className='my-5'>
                <Col>
                    <Card>
                        <Card.Body>
                            <h6>Analysis</h6>
                            <BarChart graphData1={bookingGraphData} graphData2={emissionGraphData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}
