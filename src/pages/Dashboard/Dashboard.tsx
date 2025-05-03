import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import ConnectCard from '../../components/ConnectCard';

const Dashboard: React.FC = () => {
  const { state: { user } } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-800">
                  Hi, {user.name}
                </h2>
                <p className="text-neutral-600">Welcome to your dashboard</p>
              </div>
              
              <ConnectCard connects={user.connects} />
              
              <div className="bg-white rounded-lg shadow-card overflow-hidden">
                <nav className="flex flex-col py-2">
                  <NavLink 
                    to="/dashboard/share" 
                    className={({ isActive }) => 
                      `nav-link flex items-center py-3 ${isActive ? 'nav-link-active' : ''}`
                    }
                  >
                    <span>Share Connects</span>
                  </NavLink>
                  
                  <NavLink 
                    to="/dashboard/history" 
                    className={({ isActive }) => 
                      `nav-link flex items-center py-3 ${isActive ? 'nav-link-active' : ''}`
                    }
                  >
                    <span>Transaction History</span>
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;