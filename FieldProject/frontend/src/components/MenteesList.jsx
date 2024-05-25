import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenteesByYear } from '../api';
import MiniLayout from './MiniLayout';
import { useMentee } from '../MenteeContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenteesList = () => {
  const { year } = useParams();
  const navigate = useNavigate();
  const { setMenteeId } = useMentee();
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const yearMentees = await getMenteesByYear(year);
        setMentees(yearMentees);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to fetch mentees for year ${year}:`, error);
        setLoading(false);
      }
    };

    fetchMentees();
  }, [year]);

  const handleMenteeClick = (menteeId) => {
    setMenteeId(menteeId);
    navigate(`/menteedashboard`);
  };

  if (loading) {
    return (
      <MiniLayout>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </MiniLayout>
    );
  }

  return (
    <MiniLayout>
      <div className="container">
        <div className="row">
          {mentees.map((mentee) => (
            <div className="col-12 col-sm-6 col-md-3 mb-4" key={mentee._id}>
              <div className="card" style={{ minHeight: '450px', maxHeight: '450px' }} onClick={() => handleMenteeClick(mentee._id)}>
                <img src={mentee.photoLink} alt={`${mentee.name}'s profile`} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{mentee.name}</h5>
                  <p className="card-text text-muted">{mentee.registrationNumber}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MiniLayout>
  );
};

export default MenteesList;
