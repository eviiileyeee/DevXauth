import { useState } from 'react'
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Footer from "./components/Footer";



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

    </>
  )
}

export default App
