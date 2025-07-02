import React, { useEffect, useState } from 'react';
import eventService from '../../services/eventService';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleSave = async (updatedData) => {
    try {
      await eventService.updateEvent(editingEvent._id, updatedData);
      setEvents((prev) =>
        prev.map((e) => (e._id === editingEvent._id ? { ...e, ...updatedData } : e))
      );
      setEditingEvent(null);
    } catch (err) {
      alert('Failed to update event: ' + (err.response?.data?.message || err.message));
    }
  };

  const statusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return <span className="badge bg-info text-uppercase">{status}</span>;
      case 'ongoing':
        return <span className="badge bg-warning text-uppercase text-dark">{status}</span>;
      case 'completed':
        return <span className="badge bg-success text-uppercase">{status}</span>;
      default:
        return <span className="badge bg-secondary text-uppercase">{status}</span>;
    }
  };

  const EditEventModal = ({ event, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: event.title || '',
      description: event.description || '',
      department: event.department || '',
      eventDate: event.eventDate
        ? new Date(event.eventDate).toISOString().substr(0, 10)
        : '',
      status: event.status || 'upcoming',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedEvent = {
        ...formData,
        eventDate: new Date(formData.eventDate).toISOString(),
      };
      onSave(updatedEvent);
    };

    return (
      <div
        className="modal show fade d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(3px)',
          zIndex: 1050,
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 rounded-4 shadow">
            <h5 className="modal-title mb-4 text-center">Edit Event</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Enter event title"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  rows={3}
                  required
                  placeholder="Enter event description"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Department</label>
                <input
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-control"
                  required
                  placeholder="Department"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-primary px-4">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={onCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-start py-5"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        className="card shadow-lg rounded-4 p-4"
        style={{ width: '100%', maxWidth: '1000px', backgroundColor: 'white' }}
      >
        <h4 className="mb-4 text-center text-dark">
          <i className="bi bi-calendar-event-fill me-2"></i>Event List
        </h4>

        {loading && <p className="text-center">Loading events...</p>}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {!loading && events.length === 0 && (
          <p className="text-center text-muted">No events available.</p>
        )}

        {!loading && events.length > 0 && (
          <div className="table-responsive" style={{ paddingLeft: 0 }}>
            <table
              className="table table-hover table-bordered align-middle"
              style={{ borderCollapse: 'collapse', marginLeft: 0 }}
            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Department</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created By</th>
                  <th scope="col" style={{ minWidth: '100px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={event._id}>
                    <td>{index + 1}</td>
                    <td>{event.title}</td>
                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                      {event.description}
                    </td>
                    <td>{event.department}</td>
                    <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                    <td>{statusBadge(event.status)}</td>
                    <td>{event.createdBy?.name || 'Unknown'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setEditingEvent(event)}
                        title="Edit Event"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingEvent && (
          <EditEventModal
            event={editingEvent}
            onSave={handleSave}
            onCancel={() => setEditingEvent(null)}
          />
        )}
      </div>
    </div>
  );
};

export default EventList;
