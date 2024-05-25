import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MiniLayout from '../components/MiniLayout';
import { fetchMentorById } from '../api'; // Import the API function
import { useAuth } from '../AuthContext'; // Import useAuth to get user information

const years = [2020, 2021, 2022, 2023]; // You might fetch this dynamically

const MentorDashboard = () => {
  const { userId } = useAuth(); // Access userId from AuthContext
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleYearClick = (year) => {
    navigate(`/mentees/year/${year}`);
  };

  useEffect(() => {
    const getMentor = async () => {
      try {
        const mentorData = await fetchMentorById(userId);
        setMentor(mentorData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching mentor:', error);
        setLoading(false);
      }
    };

    getMentor();
  }, [userId]);

  if (loading) {
    return (
      <MiniLayout>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" />
        </Container>
      </MiniLayout>
    );
  }

  if (!mentor) {
    return (
      <MiniLayout>
        <Container className="text-center mt-5">
          <h5>Mentor not found.</h5>
        </Container>
      </MiniLayout>
    );
  }

  return (
    <MiniLayout>
      <Container className="my-3">
        <Card className="shadow mb-3">
          <Card.Body>
            <h5>Welcome! {mentor.name}</h5>
            <p>Registration Number: {mentor.registrationNumber}</p>
            <p>Year: {mentor.year}</p>
            <p>Email: {mentor.email}</p>
            <p>Role: {mentor.role}</p>
            {mentor.photoLink && (
              <img
                src={mentor.photoLink}
                alt={mentor.name}
                className="img-fluid mt-3"
              />
            )}
          </Card.Body>
        </Card>

        <Row className="mt-4">
          {years.map((year) => (
            <Col xs={12} md={6} lg={3} key={year} className="mb-3">
              <Card className="shadow" onClick={() => handleYearClick(year)} style={{ cursor: 'pointer' }}>
                <Card.Body className="text-center">
                  <h5>{year}</h5>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </MiniLayout>
  );
};

export default MentorDashboard;
