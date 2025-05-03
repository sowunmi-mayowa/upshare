import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { login, state: { isLoading, error } } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Simple validation
    if (!email.trim()) {
      setFormError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="py-6">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center text-primary-600">
            <span className="text-2xl font-bold">UpShare</span>
          </Link>
        </div>
      </div>
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 card">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-neutral-900">
              Log in to your account
            </h2>
            <p className="mt-2 text-center text-neutral-600">
              Welcome back to UpShare
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {(formError || error) && (
              <div className="bg-error-50 text-error-700 p-3 rounded-md text-sm">
                {formError || error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input mt-1"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input mt-1"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full flex justify-center items-center"
              >
                Log in
              </button>
            </div>
            
            <div className="text-center text-sm">
              <p className="text-neutral-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;