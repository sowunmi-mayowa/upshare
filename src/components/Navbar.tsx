import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <nav className="bg-white border-b border-neutral-200 py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-primary-600">
              <span className="text-xl font-bold">UpShare</span>
            </Link>
          </div>
          
          {state.isAuthenticated && (
            <div className="flex items-center space-x-4">
              <span className="text-neutral-600">
                Welcome, <span className="font-medium">{state.user?.name}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <FiLogOut className="h-5 w-5 mr-1" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;