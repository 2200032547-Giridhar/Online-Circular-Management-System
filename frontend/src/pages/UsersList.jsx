import React, { useEffect, useState } from 'react';
import userService from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await userService.getUsers();
        setUsers(res.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <span className="badge bg-danger text-uppercase">{role}</span>;
      case 'faculty':
        return <span className="badge bg-primary text-uppercase">{role}</span>;
      case 'student':
        return <span className="badge bg-success text-uppercase">{role}</span>;
      default:
        return <span className="badge bg-secondary">{role}</span>;
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow rounded-4">
        <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between">
          <h4 className="mb-0">
            <i className="bi bi-people-fill me-2"></i>All Users
          </h4>
        </div>
        <div className="card-body">
          {loading && <p>Loading users...</p>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && users.length === 0 && !error && (
            <p className="text-muted">No users found.</p>
          )}
          {!loading && users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{getRoleBadge(user.role)}</td>
                      <td>{user.department || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
