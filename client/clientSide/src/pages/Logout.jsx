import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      const res = await axios.post(
        "http://localhost:7070/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.status === "success") {
        alert("User logged out successfully");
        navigate("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
