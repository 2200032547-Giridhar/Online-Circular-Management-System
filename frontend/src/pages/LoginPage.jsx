import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'faculty') navigate('/faculty');
      else if (user.role === 'student') navigate('/student');
      else navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      login(data.user, data.token);

      if (data.user.role === 'admin') navigate('/admin');
      else if (data.user.role === 'faculty') navigate('/faculty');
      else navigate('/student');
    } catch (err) {
      setError('Login failed. Please try again later.');
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
        className="login-card bg-glass"
        style={{
          maxWidth: '420px',
          width: '100%',
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
          <FiUser size={28} />
          Welcome Back
        </h2>

        {error && (
          <div className="alert alert-danger shadow-sm" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold text-light">
              Email Address
            </label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiUser className="text-muted" />
              </span>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg border-start-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={{ borderLeft: 'none' }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-light">
              Password
            </label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-white border-end-0">
                <FiLock className="text-muted" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control form-control-lg border-start-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
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

          <button
            type="submit"
            className="btn btn-cyan w-100 btn-lg fw-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="mb-0 text-light">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan fw-semibold text-decoration-none">
              Register
            </Link>
          </p>
        </div>

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

          .form-control:focus {
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

export default LoginPage;
