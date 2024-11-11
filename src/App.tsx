import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import AboutUs from "./pages/about-us";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import SignUp from "./pages/signup";
import AdminDashboard from "./pages/admin-dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route >
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<AdminDashboard />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;