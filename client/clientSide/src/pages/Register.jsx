import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      const res = await axios.post(
        "http://localhost:7070/users/register",
        userDetails,
        {
          withCredentials: true,
        }
      );

      console.log(res);
      if (res.data.status === "success") {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Registration failed");
      }

      setUserDetails({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div>
      <p>Register</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter your name</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
          value={userDetails.username}
          required
        />
        <br />
        <label htmlFor="email">Enter your email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={userDetails.email}
          required
        />
        <br />
        <label htmlFor="password">Enter your password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={userDetails.password}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
