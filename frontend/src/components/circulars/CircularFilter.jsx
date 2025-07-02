import React, { useState } from 'react';

const CircularFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: '',
    department: '',
    targetAudience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const resetFilters = { type: '', department: '', targetAudience: '' };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h5>Filter Circulars</h5>
      <form>
        <div className="mb-2">
          <label htmlFor="type" className="form-label">Type</label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            id="department"
            name="department"
            type="text"
            value={filters.department}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter department"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="targetAudience" className="form-label">Target Audience</label>
          <select
            id="targetAudience"
            name="targetAudience"
            value={filters.targetAudience}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </form>
    </div>
  );
};

export default CircularFilter;
