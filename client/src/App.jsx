import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/Register.jsx';
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";
import "./index.css";
import { ThemeProvider } from './context/ThemeContext/ThemeContext';




const DashboardLayout = ({ children }) => (
  <div id="main" className="relative overflow-hidden min-h-screen">
    <Navbar />
    <main className="min-h-screen">{children}</main>
    <Footer />
  </div>
);
function App() {
  

  return (
    <>
<<<<<<< HEAD
      <div className='flex justify-center items-center h-screen'>
        <h1> Welcome to dev X </h1>
      </div>
=======
            <ThemeProvider>
            <BrowserRouter>
            <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/" element={
                <DashboardLayout>
                  <Hero />
                </DashboardLayout>
              } />

              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
             

            
             
             
              {/* 404 route */}
              <Route path="*" element={
                <DashboardLayout>
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400">Page not found</p>
                    </div>
                  </div>
                </DashboardLayout>
              } />
            </Routes>
            </AuthProvider>
            </BrowserRouter>
            </ThemeProvider>

>>>>>>> 8ea51c70a506227eda56417a77e2daa9d4c5f2e4
    </>
  )
}

export default App;