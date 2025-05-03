import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ShareConnects from './pages/Dashboard/ShareConnects';
import TransactionHistory from './pages/Dashboard/TransactionHistory';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/share" replace />} />
          <Route path="share" element={<ShareConnects />} />
          <Route path="history" element={<TransactionHistory />} />
        </Route>
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;