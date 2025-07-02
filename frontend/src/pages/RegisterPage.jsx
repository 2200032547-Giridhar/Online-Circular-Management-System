// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUsers, FiBriefcase, FiEye, FiEyeOff } from 'react-icons/fi';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Something went wrong. Try again later.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 px-3"
      style={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        backgroundSize: '400% 400%',
        animation: 'bgShift 20s ease infinite',
        perspective: '1200px',
      }}
    >
      <div
        className="bg-glass"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '60px 40px',
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rotateX = ((y - rect.height / 2) / rect.height) * -10;
          const rotateY = ((x - rect.width / 2) / rect.width) * 10;
          e.currentTarget.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
        }}
      >
        <h2 className="mb-4 text-center fw-bold text-glow d-flex justify-content-center align-items-center gap-2">
          <FiUsers size={28} />
          Create Account
        </h2>

        {error && <div className="alert alert-danger shadow-sm">{error}</div>}
        {success && <div className="alert alert-success shadow-sm">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="form-label fw-semibold text-light">Full Name</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiUser className="text-muted" />
              </span>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control form-control-lg border-start-0"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                style={{ borderLeft: 'none' }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold text-light">Email Address</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiMail className="text-muted" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control form-control-lg border-start-0"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={{ borderLeft: 'none' }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-light">Password</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiLock className="text-muted" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-control form-control-lg border-start-0"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                autoComplete="new-password"
                style={{ borderLeft: 'none' }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary border-start-0"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                style={{ width: '45px' }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="form-label fw-semibold text-light">Role</label>
            <select
              id="role"
              name="role"
              className="form-select form-select-lg shadow-sm"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="department" className="form-label fw-semibold text-light">Department (Optional)</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiBriefcase className="text-muted" />
              </span>
              <input
                type="text"
                id="department"
                name="department"
                className="form-control form-control-lg border-start-0"
                value={formData.department}
                onChange={handleChange}
                placeholder="Your department"
                style={{ borderLeft: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-cyan w-100 btn-lg fw-semibold">
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="mb-0 text-light">
            Already have an account?{' '}
            <a href="/login" className="text-cyan fw-semibold text-decoration-none">
              Login here
            </a>
          </p>
        </div>

        {/* Matching CSS Styles */}
        <style>{`
          .bg-glass {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(12px);
            border-radius: 20px;
            color: white;
            box-shadow: 0 25px 50px rgba(0, 255, 255, 0.1);
            transition: transform 0.3s ease;
            transform-style: preserve-3d;
          }

          .text-glow {
            color: #00eaff;
            text-shadow: 0 0 15px rgba(0, 234, 255, 0.9), 0 0 25px rgba(0, 234, 255, 0.6);
          }

          .btn-cyan {
            background-color: #00eaff;
            color: #0f2027;
            border: none;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
          }

          .btn-cyan:hover {
            background-color: #00bcd4;
            box-shadow: 0 0 12px #00eaff;
          }

          .form-control:focus, .form-select:focus {
            box-shadow: 0 0 8px rgba(0, 234, 255, 0.6);
            border-color: #00eaff;
          }

          .text-cyan {
            color: #00eaff;
          }

          @keyframes bgShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default RegisterPage;
