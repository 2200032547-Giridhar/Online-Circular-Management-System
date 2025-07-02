import React, { useState } from 'react';
import EventForm from '../components/events/EventForm';
import EventList from '../components/events/EventList';
import CircularListForUser from '../components/circulars/CircularListForUser';

const FacultyPortal = () => {
  const [selected, setSelected] = useState('home');
  const [showEventFormModal, setShowEventFormModal] = useState(false);

  const openEventForm = () => setShowEventFormModal(true);
  const closeEventForm = () => setShowEventFormModal(false);

  const renderContent = () => {
    switch (selected) {
      case 'home':
        return (
          <div className="home-3d-card">
            <h3>Welcome to the Faculty Dashboard</h3>
            <p>
              This dashboard helps you manage your events and view circulars efficiently.
              Stay updated with all the latest notifications and organize your schedule with ease.
            </p>
            <div className="info-boxes">
              <div className="info-box">
                <h4>Upcoming Events</h4>
                <p>Check and add new events for your department and faculty.</p>
              </div>
              <div className="info-box">
                <h4>Circulars</h4>
                <p>View all important circulars directed to you and your department.</p>
              </div>
              <div className="info-box">
                <h4>Quick Actions</h4>
                <p>Use the tabs above to navigate through your dashboard features.</p>
              </div>
            </div>
          </div>
        );
      case 'events':
        return (
          <>
            <div className="mb-3">
              <button className="btn btn-primary btn-3d" onClick={openEventForm}>
                + Add Event
              </button>
            </div>

            <EventList />

            {/* Modal for Event Form */}
            {showEventFormModal && (
              <div
                className="modal show fade d-block modal-3d-backdrop"
                tabIndex="-1"
                role="dialog"
                onClick={closeEventForm}
              >
                <div
                  className="modal-dialog modal-3d-dialog"
                  role="document"
                  onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
                >
                  <div className="modal-content modal-3d-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Event</h5>
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
              </div>
            )}
          </>
        );
      case 'circulars':
        return (
          <div>
            <h4>All Circulars</h4>
            <CircularListForUser />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="portal-title">Faculty Dashboard</h2>

      {/* Navbar */}
      <nav className="nav nav-tabs mb-4 nav-3d">
        <button
          className={`nav-link ${selected === 'home' ? 'active' : ''}`}
          onClick={() => setSelected('home')}
          type="button"
        >
          Home
        </button>
        <button
          className={`nav-link ${selected === 'events' ? 'active' : ''}`}
          onClick={() => setSelected('events')}
          type="button"
        >
          Events
        </button>
        <button
          className={`nav-link ${selected === 'circulars' ? 'active' : ''}`}
          onClick={() => setSelected('circulars')}
          type="button"
        >
          Circulars
        </button>
      </nav>

      {/* Render content based on selected tab */}
      {renderContent()}

      {/* 3D Styling */}
      <style>{`
        /* Portal Title */
        .portal-title {
          text-align: center;
          font-weight: 700;
          color: #4a4a4a;
          text-shadow: 1px 1px 2px #bbb;
          margin-bottom: 1.5rem;
          font-size: 2.5rem;
          letter-spacing: 1.5px;
        }

        /* 3D Nav Tabs */
        .nav-3d .nav-link {
          font-weight: 600;
          color: #555;
          background: #f0f0f3;
          border: none;
          border-radius: 12px 12px 0 0;
          box-shadow:
            3px 3px 6px #bebebe,
            -3px -3px 6px #ffffff;
          margin-right: 0.5rem;
          transition: all 0.3s ease;
          cursor: pointer;
          padding: 0.75rem 1.5rem;
        }
        .nav-3d .nav-link.active {
          background: linear-gradient(145deg, #667eea, #764ba2);
          color: white;
          box-shadow:
            inset 3px 3px 6px #5a67d8,
            inset -3px -3px 6px #8760b3;
        }
        .nav-3d .nav-link:hover:not(.active) {
          background: #e0e0e3;
          color: #333;
          box-shadow:
            2px 2px 5px #bebebe,
            -2px -2px 5px #ffffff;
        }

        /* Home 3D Card */
        .home-3d-card {
          background: #f0f0f3;
          border-radius: 20px;
          box-shadow:
            7px 7px 15px #bebebe,
            -7px -7px 15px #ffffff;
          padding: 2rem 3rem;
          text-align: center;
          color: #333;
          user-select: none;
          transition: transform 0.3s ease;
          margin-bottom: 3rem;
        }
        .home-3d-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow:
            10px 10px 20px #a1a1a1,
            -10px -10px 20px #ffffff;
        }
        .home-3d-card h3 {
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 2.2rem;
          text-shadow: 1px 1px 2px #aaa;
        }
        .home-3d-card p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.5;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Info boxes inside home card */
        .info-boxes {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .info-box {
          background: #e0e0e3;
          border-radius: 15px;
          box-shadow:
            5px 5px 10px #bebebe,
            -5px -5px 10px #ffffff;
          padding: 1.5rem 2rem;
          flex: 1 1 200px;
          max-width: 250px;
          color: #555;
          transition: all 0.3s ease;
          cursor: default;
        }
        .info-box:hover {
          box-shadow:
            inset 3px 3px 6px #bebebe,
            inset -3px -3px 6px #ffffff;
          color: #667eea;
          transform: scale(1.05);
        }
        .info-box h4 {
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        .info-box p {
          font-size: 0.95rem;
          line-height: 1.3;
        }

        /* 3D Button */
        .btn-3d {
          border-radius: 12px;
          box-shadow:
            6px 6px 8px #bebebe,
            -6px -6px 8px #ffffff;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        .btn-3d:hover {
          box-shadow:
            inset 3px 3px 8px #bebebe,
            inset -3px -3px 8px #ffffff;
          transform: translateY(2px);
        }

        /* Modal backdrop */
        .modal-3d-backdrop {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        /* Modal dialog with 3D effect */
        .modal-3d-dialog {
          max-width: 600px;
          border-radius: 20px;
          box-shadow:
            10px 10px 30px #999999,
            -10px -10px 30px #ffffff;
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        .modal-3d-content {
          border-radius: 20px;
          padding: 1rem;
          background: #f0f0f3;
          box-shadow:
            inset 6px 6px 10px #bebebe,
            inset -6px -6px 10px #ffffff;
        }
      `}</style>
    </div>
  );
};

export default FacultyPortal;
