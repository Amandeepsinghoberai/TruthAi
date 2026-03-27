import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Upload from '@/pages/Upload';
import Result from '@/pages/Result';
import Survey from '@/pages/Survey';
import About from '@/pages/About';
import Pricing from '@/pages/Pricing';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result"
                element={
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result/:scanId"
                element={
                  <ProtectedRoute>
                    <Result />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/survey"
                element={
                  <ProtectedRoute>
                    <Survey />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
