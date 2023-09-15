import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Container, Row, Col, Card } from 'react-bootstrap';

const BarChart = ({ graphData1, graphData2 }) => {
    const labels1 = graphData1.map(data => data.reservationDate);
    const labels2 = graphData2.map(data => data.reservationDate);
    const bookingCounts = graphData1.map(data => data.reservationCount);
    const emissionReduced = graphData2.map(data => data.emissionReduced);

    const bookingData = {
        labels: labels1,
        datasets: [
            {
                label: 'Bookings',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: bookingCounts,
            },
        ],
    };

    const emissionData = {
        labels: labels2,
        datasets: [
            {
                label: 'Emission Reduced',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                data: emissionReduced,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category', // Use 'category' scale for the x-axis
                title: {
                    display: true,
                    text: 'Reservation Date',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value',
                },
            },
        },
    };

    return (
        <Row>
            <Col md={6}>
                <div className="graph-container">
                    <h6>Bookings Data</h6>
                    <Bar data={bookingData} options={options} />
                </div>
            </Col>
            <Col md={6}>
                <div className="graph-container">
                    <h6>Emission Reduction Data</h6>
                    <Bar data={emissionData} options={options} />
                </div>
            </Col>
        </Row>
    );
};

export default BarChart;
