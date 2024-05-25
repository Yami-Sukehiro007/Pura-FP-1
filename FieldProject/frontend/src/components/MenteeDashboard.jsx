import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { getMenteeById } from '../api';
import { useMentee } from '../MenteeContext';
import Layout from './Layout';

const MenteeDashboard = () => {
  const { menteeId } = useMentee(); 
  const [mentee, setMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentee = async () => {
      try {
        const fetchedMentee = await getMenteeById(menteeId);
        setMentee(fetchedMentee);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch mentee with ID ${menteeId}:`, error);
        setLoading(false);
      }
    };

    if (menteeId) {
      fetchMentee();
    }
  }, [menteeId]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!mentee) {
    return <h6>Mentee not found</h6>;
  }

  return (
    <Layout>
      <Container className="my-3">
        <Card className="shadow mb-3">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={8}>
                <h4>{mentee.name}</h4>
                <p className="text-muted">Registration Number: {mentee.registrationNumber}</p>
                <p className="text-muted">Phone: {mentee.phone}</p>
                <p className="text-muted">Email: {mentee.email}</p>
                <p className="text-muted">Year: {mentee.year}</p>
                <p className="text-muted">Role: {mentee.role}</p>
              </Col>
              <Col md={4} className="text-center">
                <img
                  src={mentee.photoLink}
                  alt={`${mentee.name}'s profile`}
                  className="img-fluid rounded-circle shadow"
                  style={{ width: '150px', height: '150px' }}
                />
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={6}>
                <Card className="shadow mb-3">
                  <Card.Body>
                    <h6>Personal Information</h6>
                    <p className="text-muted">Parents' Names: {mentee.parentsNames}</p>
                    <p className="text-muted">Parents' Occupation: {mentee.parentsOccupation}</p>
                    <p className="text-muted">Blood Group: {mentee.bloodGroup}</p>
                    <p className="text-muted">Nationality: {mentee.nationality}</p>
                    <p className="text-muted">Religion: {mentee.religion}</p>
                    <p className="text-muted">Address: {mentee.address}</p>
                    <p className="text-muted">Admission Type: {mentee.admissionType}</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow mb-3">
                  <Card.Body>
                    <h6>Academic Information</h6>
                    <p className="text-muted">Classes Attended: {mentee.classesAttended}</p>
                    <p className="text-muted">Total Classes: {mentee.totalClasses}</p>
                    <hr />
                    <h6>GPA Details</h6>
                    {Array.from({ length: 8 }).map((_, index) => (
                      <p className="text-muted" key={index}>
                        Semester {index + 1} GPA: {mentee[`sem${index + 1}Gpa`]}
                      </p>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default MenteeDashboard;
