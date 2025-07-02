// src/pages/AdminPortal.jsx
import React, { useEffect, useState } from 'react';
import CircularForm from '../components/circulars/CircularForm';
import CircularList from '../components/circulars/CircularList';
import EventForm from '../components/events/EventForm';
import EventList from '../components/events/EventList';
import UserList from './UsersList';
import adminService from '../services/adminService';

const AdminPortal = () => {
  const [selected, setSelected] = useState('home');
  const [counts, setCounts] = useState({
    totalUsers: 0,
    students: 0,
    faculties: 0,
    admins: 0,
    totalCirculars: 0,
    totalEvents: 0,
  });
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [error, setError] = useState('');

  // Circular Modal
  const [isCircularFormOpen, setCircularFormOpen] = useState(false);
  const [editingCircular, setEditingCircular] = useState(null);

  // Event Modal
  const [isEventFormOpen, setEventFormOpen] = useState(false);

  useEffect(() => {
    if (selected === 'home') {
      fetchCounts();
    }
  }, [selected]);

  const fetchCounts = async () => {
    setLoadingCounts(true);
    setError('');
    try {
      const [usersRes, circularsRes, eventsRes] = await Promise.all([
        adminService.getUserCounts(),
        adminService.getCircularCount(),
        adminService.getEventCount(),
      ]);

      setCounts({
        totalUsers: usersRes.data.totalUsers || 0,
        students: usersRes.data.students || 0,
        faculties: usersRes.data.faculties || 0,
        admins: usersRes.data.admins || 0,
        totalCirculars: circularsRes.data.count || 0,
        totalEvents: eventsRes.data.count || 0,
      });
    } catch (err) {
      console.error('Error fetching counts:', err.response || err.message || err);
      setError('Failed to load counts. Please try again later.');
    } finally {
      setLoadingCounts(false);
    }
  };

  const openAddCircularForm = () => {
    setEditingCircular(null);
    setCircularFormOpen(true);
  };

  const openEditCircularForm = (circular) => {
    setEditingCircular(circular);
    setCircularFormOpen(true);
  };

  const closeCircularForm = () => {
    setEditingCircular(null);
    setCircularFormOpen(false);
  };

  const handleCircularFormSuccess = () => {
    closeCircularForm();
  };

  const openEventForm = () => {
    setEventFormOpen(true);
  };

  const closeEventForm = () => {
    setEventFormOpen(false);
  };

  const renderContent = () => {
    switch (selected) {
      case 'home':
        return (
          <div className="home-summary">
            <h4>Summary</h4>
            {loadingCounts && <p>Loading counts...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loadingCounts && !error && (
              <div className="summary-grid">
                {[
                  ['Total Users', counts.totalUsers, 'user'],
                  ['Students', counts.students, 'student'],
                  ['Faculties', counts.faculties, 'faculty'],
                  ['Admins', counts.admins, 'admin'],
                  ['Total Circulars', counts.totalCirculars, 'circular'],
                  ['Total Events', counts.totalEvents, 'event'],
                ].map(([label, value, key]) => (
                  <div className="summary-card" key={key}>
                    <h5>{label}</h5>
                    <p className="count">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'circulars':
        return (
          <>
            <div className="header-actions">
              <h4>Manage Circulars</h4>
              <button className="btn btn-primary neumorphic-btn" onClick={openAddCircularForm}>
                + Add Circular
              </button>
            </div>

            <CircularList onEditClick={openEditCircularForm} />

            {isCircularFormOpen && (
              <div
                className="modal-overlay"
                onClick={closeCircularForm}
              >
                <div className="modal-content neumorphic-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h5>{editingCircular ? 'Edit Circular' : 'Add Circular'}</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={closeCircularForm}
                    />
                  </div>
                  <div className="modal-body">
                    <CircularForm
                      circular={editingCircular}
                      onClose={closeCircularForm}
                      onSuccess={handleCircularFormSuccess}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        );

      case 'events':
        return (
          <>
            <div className="header-actions">
              <h4>Manage Events</h4>
              <button className="btn btn-success neumorphic-btn" onClick={openEventForm}>
                + Add Event
              </button>
            </div>

            <EventList />

            {isEventFormOpen && (
              <div
                className="modal-overlay"
                onClick={closeEventForm}
              >
                <div className="modal-content neumorphic-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-header">
                    <h5>Add Event</h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={closeEventForm}
                    />
                  </div>
                  <div className="modal-body">
                    <EventForm onClose={closeEventForm} />
                  </div>
                </div>
              </div>
            )}
          </>
        );

      case 'users':
        return (
          <>
            <h4>All Users</h4>
            <UserList />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-portal-container">
      <nav className="sidebar neumorphic-sidebar">
        <h5 className="sidebar-title">Admin Menu</h5>
        <ul className="nav flex-column sidebar-nav">
          {[
            ['home', 'Home'],
            ['circulars', 'Manage Circulars'],
            ['events', 'Manage Events'],
            ['users', 'Manage Users'],
          ].map(([key, label]) => (
            <li className="nav-item" key={key}>
              <button
                className={`nav-link neumorphic-btn-sidebar ${
                  selected === key ? 'active' : ''
                }`}
                onClick={() => setSelected(key)}
                type="button"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="main-content neumorphic-main">
        <h2 className="main-title">Admin Dashboard</h2>
        {renderContent()}
      </main>

      {/* Neumorphic Styles */}
      <style>{`
        /* Overall container */
        .admin-portal-container {
          display: flex;
          min-height: 90vh;
          background: #e0e0e0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          user-select: none;
        }

        /* Sidebar */
        .sidebar {
          flex-shrink: 0;
          width: 260px;
          background: #e0e0e0;
          padding: 2rem 1.5rem;
          box-shadow:
            8px 8px 15px #bebebe,
            -8px -8px 15px #ffffff;
          border-radius: 25px 0 0 25px;
          display: flex;
          flex-direction: column;
        }
        .sidebar-title {
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: #2c3e50;
          text-align: center;
          text-shadow: 1px 1px 3px #aaa;
        }
        .btn-close {
  background: #b32e2e;
  border-radius: 50%;
  border: none;
  font-size: 1.8rem;
  width: 36px;
  height: 36px;
  cursor: pointer;
  color: #555;
  padding: 0;
  line-height: 1;
  user-select: none;
  box-shadow:
    4px 4px 6px #b32e2e,
    -4px -4px 6px #b32e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.btn-close:hover {
  color: #b32e2e;
  background: #b32e2e;
  box-shadow:
    inset 4px 4px 6px #bebebe,
    inset -4px -4px 6px #ffffff;
}

        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
        }
        .sidebar-nav .nav-item {
          margin-bottom: 1rem;
        }
        .neumorphic-btn-sidebar {
          width: 100%;
          background: #e0e0e0;
          border: none;
          border-radius: 15px;
          padding: 0.75rem 1rem;
          font-weight: 600;
          color: #555;
          box-shadow:
            6px 6px 10px #bebebe,
            -6px -6px 10px #ffffff;
          transition: all 0.25s ease;
          cursor: pointer;
          text-align: left;
          font-size: 1.1rem;
          user-select: none;
          outline-offset: 2px;
        }
        .neumorphic-btn-sidebar:hover {
          box-shadow:
            inset 4px 4px 8px #bebebe,
            inset -4px -4px 8px #ffffff;
          color: #2c3e50;
        }
        .neumorphic-btn-sidebar.active {
          box-shadow:
            inset 6px 6px 10px #bebebe,
            inset -6px -6px 10px #ffffff;
          color: #1a2a40;
          font-weight: 700;
          background: #d0d0d0;
        }

        /* Main Content */
        .main-content {
          flex-grow: 1;
          padding: 2rem 3rem;
          overflow-y: auto;
          background: #e0e0e0;
          border-radius: 0 25px 25px 0;
          box-shadow:
            inset 5px 5px 10px #bebebe,
            inset -5px -5px 10px #ffffff;
        }
        .main-title {
          font-weight: 700;
          font-size: 2.4rem;
          margin-bottom: 2rem;
          color: #2c3e50;
          text-shadow: 1px 1px 3px #aaa;
          user-select: none;
        }

        /* Summary Grid */
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }
        .summary-card {
          background: #e0e0e0;
          border-radius: 20px;
          padding: 1.5rem 2rem;
          box-shadow:
            8px 8px 15px #bebebe,
            -8px -8px 15px #ffffff;
          color: #444;
          user-select: none;
          transition: all 0.3s ease;
          text-align: center;
          cursor: default;
        }
        .summary-card:hover {
          box-shadow:
            inset 6px 6px 15px #bebebe,
            inset -6px -6px 15px #ffffff;
          color: #1a2a40;
          transform: scale(1.05);
        }
        .summary-card h5 {
          font-weight: 700;
          margin-bottom: 0.75rem;
          font-size: 1.2rem;
        }
        .summary-card .count {
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          user-select: text;
          color: #2c3e50;
        }

        /* Header Actions */
        .header-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          user-select: none;
        }
        .neumorphic-btn {
          padding: 0.6rem 1.4rem;
          font-weight: 700;
          font-size: 1rem;
          border-radius: 15px;
          border: none;
          background: #e0e0e0;
          box-shadow:
            6px 6px 10px #bebebe,
            -6px -6px 10px #ffffff;
          color: #555;
          cursor: pointer;
          transition: all 0.25s ease;
          user-select: none;
        }
        .neumorphic-btn:hover {
          box-shadow:
            inset 4px 4px 8px #bebebe,
            inset -4px -4px 8px #ffffff;
          color: #2c3e50;
        }
        .neumorphic-btn:active {
          box-shadow:
            inset 2px 2px 6px #bebebe,
            inset -2px -2px 6px #ffffff;
          color: #1a2a40;
        }
        .btn-primary.neumorphic-btn {
          background: #b0c4b8;
          color: #1a2a40;
        }
        .btn-primary.neumorphic-btn:hover {
          background: #a0b4a8;
        }
        .btn-success.neumorphic-btn {
          background: #a2d5a2;
          color: #1a2a40;
        }
        .btn-success.neumorphic-btn:hover {
          background: #92c592;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.25);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
          user-select: none;
        }

        /* Modal Content */
        .modal-content {
          background: #e0e0e0;
          border-radius: 20px;
          box-shadow:
            8px 8px 20px #bebebe,
            -8px -8px 20px #ffffff;
          width: 600px;
          max-width: 90vw;
          max-height: 90vh;
          overflow-y: auto;
          padding: 1.5rem 2rem;
          user-select: text;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .modal-header h5 {
          font-weight: 700;
          font-size: 1.5rem;
          color: #2c3e50;
          user-select: none;
        }
        .btn-close {
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #555;
          padding: 0;
          line-height: 1;
          user-select: none;
          transition: color 0.25s ease;
        }
        .btn-close:hover {
          color: #1a2a40;
        }
        .modal-body {
          flex-grow: 1;
          overflow-y: auto;
        }

        /* Scrollbar for modal body */
        .modal-body::-webkit-scrollbar {
          width: 8px;
        }
        .modal-body::-webkit-scrollbar-thumb {
          background: #b0b0b0;
          border-radius: 4px;
        }
        .modal-body::-webkit-scrollbar-track {
          background: #e0e0e0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            border-radius: 0 0 25px 25px;
            padding: 1rem 1rem;
            box-shadow:
              inset 5px 5px 10px #bebebe,
              inset -5px -5px 10px #ffffff;
            flex-direction: row;
            overflow-x: auto;
          }
          .sidebar-nav {
            display: flex;
            flex-direction: row;
            gap: 1rem;
          }
          .sidebar-nav .nav-item {
            margin-bottom: 0;
          }
          .neumorphic-btn-sidebar {
            border-radius: 12px;
            padding: 0.5rem 1rem;
            font-size: 1rem;
          }
          .main-content {
            border-radius: 0;
            padding: 1.5rem 1rem;
          }
          .summary-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 1rem;
          }
          .summary-card {
            padding: 1rem 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPortal;
