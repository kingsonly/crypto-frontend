import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session from localStorage
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed for logout
};

export default Logout;