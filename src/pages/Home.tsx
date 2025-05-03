import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold">UpShare</span>
            </div>
            <div>
              <Link to="/login" className="btn bg-white text-primary-600 hover:bg-neutral-100">
                Log in
              </Link>
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Share Upwork Connects with Your Team
            </h1>
            <p className="text-xl mb-8 text-primary-50">
              Empower your team by sharing Upwork connects. Get 50 free connects when you sign up!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="btn bg-white text-primary-600 hover:bg-neutral-100 text-lg px-6 py-3">
                Get Started
              </Link>
              <Link to="/login" className="btn border-2 border-white bg-transparent hover:bg-primary-500 text-white text-lg px-6 py-3">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Why Choose UpShare?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              UpShare makes it easy to manage and share your Upwork connects with team members, colleagues, or friends.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover text-center p-8">
              <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Free Connects</h3>
              <p className="text-neutral-600">
                Get 50 free connects when you sign up for a new account.
              </p>
            </div>
            
            <div className="card card-hover text-center p-8">
              <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Easy Sharing</h3>
              <p className="text-neutral-600">
                Share connects with anyone using just their email address.
              </p>
            </div>
            
            <div className="card card-hover text-center p-8">
              <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-full mb-4">
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Track Transactions</h3>
              <p className="text-neutral-600">
                Keep a detailed history of all your connect transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Ready to Start Sharing?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Join UpShare today and get 50 free connects to start sharing with your team.
            </p>
            <Link to="/signup" className="btn btn-primary text-lg px-8 py-3">
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-8 border-t border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-bold text-neutral-900">UpShare</span>
            </div>
            <div className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} UpShare. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;