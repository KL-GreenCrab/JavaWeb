import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile';
import AdminProfile from './components/AdminProfile';
import UserList from './components/UserList';
import Home  from './components/Home';

function App() {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/adminProfile" element={<AdminProfile />} />
          <Route path="/userList" element={<UserList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
