import React, { useState } from 'react';
import eventService from '../../services/eventService';

const EventForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    eventDate: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await eventService.createEvent(formData);
      setMessage('Event created successfully');
      setFormData({
        title: '',
        description: '',
        department: '',
        eventDate: ''
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error creating event');
    }
  };

  return (
    <div className="card p-4 mt-3">
      <h4>Create Event</h4>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-2">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-2">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-2">
          <label>Event Date</label>
          <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="form-control" required />
        </div>

        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default EventForm;
