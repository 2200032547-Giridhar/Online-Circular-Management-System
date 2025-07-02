import React, { useState } from 'react';
import StudentEventList from '../components/events/StudentEventList';
import CircularListForUser from '../components/circulars/CircularListForUser';

const StudentPortal = () => {
  const [selected, setSelected] = useState('home');

  const renderContent = () => {
    switch (selected) {
      case 'home':
        return (
          <div className="home-3d-card">
            <h3>Welcome to the Student Dashboard</h3>
            <p>
              Here you can stay updated with all circulars and events relevant to you.
              Use the tabs above to explore.
            </p>
            <div className="info-boxes">
              <div className="info-box">
                <h4>Stay Informed</h4>
                <p>Check important circulars from your department and university.</p>
              </div>
              <div className="info-box">
                <h4>Participate</h4>
                <p>Join upcoming events to enhance your skills and networking.</p>
              </div>
              <div className="info-box">
                <h4>Quick Navigation</h4>
                <p>Use the navigation tabs above to browse circulars and events easily.</p>
              </div>
            </div>
          </div>
        );
      case 'circulars':
        return (
          <div>
            <h4>Available Circulars</h4>
            <CircularListForUser />
          </div>
        );
      case 'events':
        return (
          <div>
            <h4>Available Events</h4>
            <StudentEventList />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="portal-title">Student Dashboard</h2>

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
          className={`nav-link ${selected === 'circulars' ? 'active' : ''}`}
          onClick={() => setSelected('circulars')}
          type="button"
        >
          Circulars
        </button>
        <button
          className={`nav-link ${selected === 'events' ? 'active' : ''}`}
          onClick={() => setSelected('events')}
          type="button"
        >
          Events
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
          background: linear-gradient(145deg, #43a047, #388e3c);
          color: white;
          box-shadow:
            inset 3px 3px 6px #2e7030,
            inset -3px -3px 6px #4caf50;
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
          color: #43a047;
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
      `}</style>
    </div>
  );
};

export default StudentPortal;
