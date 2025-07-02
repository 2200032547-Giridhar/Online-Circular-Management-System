import React, { useState } from 'react';
import circularService from '../../services/circularService';

const CircularForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'incoming',
    department: '',
    targetAudience: [],  // Array for multiple audience selections
    issueDate: '',
    referenceId: '',
    attachment: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file upload
      setFormData({ ...formData, attachment: files[0] });
    } else if (name === 'targetAudience') {
      // Handle checkbox group for targetAudience
      const updatedAudience = [...formData.targetAudience];
      if (updatedAudience.includes(value)) {
        // Remove value if already selected
        setFormData({
          ...formData,
          targetAudience: updatedAudience.filter((item) => item !== value),
        });
      } else {
        // Add new value
        setFormData({
          ...formData,
          targetAudience: [...updatedAudience, value],
        });
      }
    } else {
      // For all other inputs
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = new FormData();

      // Append form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'targetAudience') {
          // Append each audience as targetAudience[]
          value.forEach((v) => data.append('targetAudience[]', v));
        } else {
          data.append(key, value);
        }
      });

      await circularService.createCircular(data);

      setSuccess('Circular created successfully!');
      if (onSuccess) onSuccess();

      // Reset form after success
      setFormData({
        title: '',
        type: 'incoming',
        department: '',
        targetAudience: [],
        issueDate: '',
        referenceId: '',
        attachment: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating circular');
    }
  };

  return (
    <div className="card p-4">
      <h4>Create Circular</h4>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-2">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-control"
          >
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Department</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label>Target Audience</label>
          <br />
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              name="targetAudience"
              value="faculty"
              checked={formData.targetAudience.includes('faculty')}
              onChange={handleChange}
              id="audience-faculty"
            />
            <label htmlFor="audience-faculty" className="form-check-label">
              Faculty
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              name="targetAudience"
              value="student"
              checked={formData.targetAudience.includes('student')}
              onChange={handleChange}
              id="audience-student"
            />
            <label htmlFor="audience-student" className="form-check-label">
              Student
            </label>
          </div>
        </div>

        <div className="mb-2">
          <label>Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label>Reference ID</label>
          <input
            name="referenceId"
            value={formData.referenceId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label>Attachment (PDF)</label>
          <input
            type="file"
            name="attachment"
            onChange={handleChange}
            className="form-control"
            accept="application/pdf"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CircularForm;
