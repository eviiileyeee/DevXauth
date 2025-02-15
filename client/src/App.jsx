import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/Register.jsx';
import Hero from "./pages/Hero";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar.jsx";
import "./App.css";
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import ProtectedRoute from './component/ProtectedRoute';


const DashboardLayout = ({ children }) => (
  <div id="main" className="relative overflow-hidden min-h-screen ">
    <Navbar/>
    <main className="min-h-screen">{children}</main>
    <Footer />
  </div>
);
function App() {


  return (
    <>

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
                    <ProfilePage />
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
    </>
  )
}

export default App;