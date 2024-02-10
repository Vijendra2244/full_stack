import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
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
        "https://real-ruby-lemming-suit.cyclic.app/users/register",
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
        gender: "",
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
        <label htmlFor="gender">Enter your gender </label>
        <input
          type="text"
          name="gender"
          id="gender"
          onChange={handleChange}
          value={userDetails.gender}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
