import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import AdminPortal from './pages/AdminPortal';
import FacultyPortal from './pages/FacultyPortal';
import StudentPortal from './pages/StudentPortal';
import NotFound from './pages/NotFound';
import Navbar from './components/common/Navbar';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import PrivateRoute from './components/common/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

import CircularPreview from './components/circulars/CircularPreview';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CircularList from './components/circulars/CircularList';
import EventList from './components/events/EventList';
import UserList from './pages/UsersList';
import CircularFilter from './components/circulars/CircularFilter';

const App = () => {
  // Manage dark mode state here, with localStorage persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);

    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((prev) => !prev)} />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/circulars/:id" element={<CircularPreview />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/circulars/all" element={<CircularList />} />
        <Route path="/admin/events" element={<EventList />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/search" element={<CircularFilter />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminPortal />} />
        </Route>
        <Route element={<PrivateRoute allowedRole="faculty" />}>
          <Route path="/faculty" element={<FacultyPortal />} />
        </Route>
        <Route element={<PrivateRoute allowedRole="student" />}>
          <Route path="/student" element={<StudentPortal />} />
        </Route>
        
        <Route element={<PrivateRoute allowedRole={['admin', 'faculty', 'student']} />}>
  <Route path="/profile" element={<Profile />} />
</Route>


        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
