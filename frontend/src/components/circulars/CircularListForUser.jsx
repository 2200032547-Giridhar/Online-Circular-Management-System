import React, { useEffect, useState } from 'react';
import circularService from '../../services/circularService';
import CircularPreview from './CircularPreview';

const CircularListForUser = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCircular, setSelectedCircular] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role ? payload.role.toLowerCase() : '';
        setUserRole(role);
      } catch (err) {
        setError('Invalid token');
        setLoading(false);
      }
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userRole) return;

    const fetchCirculars = async () => {
      try {
        const res = await circularService.getAllCirculars();
        const filtered = res.data.filter((circular) => {
          const audience = circular.targetAudience;
          if (Array.isArray(audience)) {
            return audience.some((aud) => aud.toLowerCase() === userRole);
          } else if (typeof audience === 'string') {
            return audience.toLowerCase() === userRole;
          }
          return false;
        });

        setCirculars(filtered);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load circulars');
      } finally {
        setLoading(false);
      }
    };

    fetchCirculars();
  }, [userRole]);

  const openModal = (circular) => {
    setSelectedCircular(circular);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCircular(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center text-primary fw-bold">
        Circulars for{' '}
        {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}
      </h3>

      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5">Loading circulars...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center fs-5" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && circulars.length === 0 && (
        <p className="text-center fs-5 text-muted">No circulars available.</p>
      )}

      {!loading && !error && circulars.length > 0 && (
        <div className="card shadow-3d p-3">
          <div className="table-responsive">
            <table className="table table-bordered table-3d table-striped align-middle mb-0">
              <thead className="table-primary text-primary text-center">
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Department</th>
                  <th>Target Audience</th>
                  <th>Status</th>
                  <th>Issue Date</th>
                  <th>Reference ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {circulars.map((circular) => (
                  <tr key={circular._id}>
                    <td className="fw-semibold">{circular.title}</td>
                    <td>{circular.type}</td>
                    <td>{circular.department}</td>
                    <td>
                      {Array.isArray(circular.targetAudience)
                        ? circular.targetAudience.join(', ')
                        : circular.targetAudience}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill fs-6 px-3 py-2 ${
                          circular.status === 'Active'
                            ? 'bg-success'
                            : circular.status === 'Pending'
                            ? 'bg-warning text-dark'
                            : 'bg-secondary'
                        }`}
                      >
                        {circular.status}
                      </span>
                    </td>
                    <td>{new Date(circular.issueDate).toLocaleDateString()}</td>
                    <td>{circular.referenceId}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary shadow"
                        onClick={() => openModal(circular)}
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="previewModalLabel"
          aria-modal="true"
          onClick={closeModal}
        >
          <div
            className="modal-dialog modal-lg modal-dialog-scrollable"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow-lg rounded">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="previewModalLabel">
                  Circular Preview
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {selectedCircular && <CircularPreview circular={selectedCircular} />}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularListForUser;
