import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Profile</h2>
      <table className="table table-bordered mt-3" style={{ maxWidth: '600px' }}>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{user.role}</td>
          </tr>
          {/* Add more fields as per your user object */}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
