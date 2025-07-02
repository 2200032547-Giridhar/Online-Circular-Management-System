import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div
        className="notfound-card"
        onMouseMove={(e) => {
          const card = e.currentTarget;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = (y / rect.height) * -15;
          const rotateY = (x / rect.width) * 15;
          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }}
      >
        <h1 className="display-1 text-glow">404</h1>
        <p className="lead text-light">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-outline-light mt-3 px-4 py-2">
          Go to Home
        </Link>
      </div>

      <style>{`
        .notfound-wrapper {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          background-size: 400% 400%;
          animation: bgShift 20s ease infinite;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
        }

        .notfound-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 60px 40px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          color: white;
          box-shadow: 0 25px 50px rgba(0, 255, 255, 0.1);
          transition: transform 0.3s ease;
          transform-style: preserve-3d;
        }

        .text-glow {
          color: #00eaff;
          text-shadow: 0 0 15px rgba(0, 234, 255, 0.9), 0 0 25px rgba(0, 234, 255, 0.6);
        }

        .btn-outline-light {
          border: 2px solid #00eaff;
          color: #00eaff;
          font-weight: 500;
          transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }

        .btn-outline-light:hover {
          background-color: #00eaff;
          color: #0f2027;
          box-shadow: 0 0 10px #00eaff;
        }

        @keyframes bgShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
