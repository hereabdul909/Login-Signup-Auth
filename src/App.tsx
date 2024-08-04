import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Component/LoginForm';
import Registration from './Component/Registration';
import UserLogedIn from './Component/UserLogedIn';
import Dashboard from './Component/Home';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/dashboard" element={<UserLogedIn />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
