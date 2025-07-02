import React, { useEffect, useState } from 'react';
import eventService from '../../services/eventService';
import '../../App.css'; // Make sure your custom styles are imported

const StudentEventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await eventService.getAllEvents();
      setEvents(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center fw-bold text-primary mb-4">Upcoming Events</h3>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" aria-label="Loading spinner">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5">Loading events...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center fs-5" role="alert">
          {error}
        </div>
      )}

      {!loading && events.length === 0 && (
        <p className="text-center fs-5 text-muted">No events available.</p>
      )}

      {!loading && events.length > 0 && (
        <div className="card shadow-3d p-4">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered table-3d align-middle">
              <thead className="table-primary text-center">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Department</th>
                  <th>Event Date</th>
                  <th>Status</th>
                  <th>Created By</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event._id}>
                    <td className="text-center fw-bold">{index + 1}</td>
                    <td className="fw-semibold text-primary">{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.department}</td>
                    <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${
                          event.status === 'Upcoming'
                            ? 'bg-success'
                            : event.status === 'Ongoing'
                            ? 'bg-warning text-dark'
                            : 'bg-secondary'
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td>{event.createdBy?.name || 'Unknown'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentEventList;
