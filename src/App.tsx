import { ChakraProvider, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider , useAuth } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import InfluencerDashboard from "./components/dashboards/InfluencerDashboard";
import BrandDashboard from "./components/dashboards/BrandDashboard";
import Onboarding from "./components/onboarding/Onboarding";
import "./App.css";

// Protected Route Component
const ProtectedRoute = ({ children, userType }: { children: React.ReactNode; userType: 'influencer' | 'brand' }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.userType !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box minH="100vh" bg="gray.50">
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Onboarding */}
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Dashboard Routes */}
              <Route 
                path="/influencer/*" 
                element={
                  <ProtectedRoute userType="influencer">
                    <InfluencerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/brand/*" 
                element={
                  <ProtectedRoute userType="brand">
                    <BrandDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
