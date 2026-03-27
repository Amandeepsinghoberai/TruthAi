import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#1a3c5e] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
            <Shield className="w-8 h-8" />
            <span className="text-2xl font-bold">Truth AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:text-[#2d7dd2] transition ${
                isActive('/') ? 'text-[#2d7dd2] font-semibold' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-[#2d7dd2] transition ${
                isActive('/about') ? 'text-[#2d7dd2] font-semibold' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className={`hover:text-[#2d7dd2] transition ${
                isActive('/pricing') ? 'text-[#2d7dd2] font-semibold' : ''
              }`}
            >
              Pricing
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`hover:text-[#2d7dd2] transition ${
                    isActive('/dashboard') ? 'text-[#2d7dd2] font-semibold' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/upload" 
                  className={`hover:text-[#2d7dd2] transition ${
                    isActive('/upload') ? 'text-[#2d7dd2] font-semibold' : ''
                  }`}
                >
                  Upload
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-[#2d7dd2] px-3 py-2 rounded">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1a3c5e]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1a3c5e]">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#2d7dd2] hover:bg-[#2563a8]">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
