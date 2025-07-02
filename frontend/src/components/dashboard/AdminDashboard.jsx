import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <div className="d-flex gap-3 mt-4">
        <Link to="/admin/circulars/all" className="btn btn-primary">Manage Circulars</Link>
        <Link to="/admin/events" className="btn btn-secondary">Manage Events</Link>
        <Link to="/admin/users" className="btn btn-dark">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
