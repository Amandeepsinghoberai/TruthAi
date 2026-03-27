import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a3c5e] text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8" />
              <span className="text-2xl font-bold">Truth AI</span>
            </div>
            <p className="text-gray-300 mb-4">
              AI-powered deepfake detection platform. Verify the authenticity of images and videos with cutting-edge technology.
            </p>
            <p className="text-sm text-gray-400">
              Created by Amandeep Singh Oberai
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[#2d7dd2] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#2d7dd2] transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-[#2d7dd2] transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-[#2d7dd2] transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Connect</h3>
            <div className="space-y-3">
              <a href="mailto:contact@truthai.com" className="flex items-center space-x-2 text-gray-300 hover:text-[#2d7dd2] transition">
                <Mail className="w-5 h-5" />
                <span>contact@truthai.com</span>
              </a>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-300 hover:text-[#2d7dd2] transition">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-[#2d7dd2] transition">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Truth AI. All rights reserved. | Fighting misinformation with AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
