import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
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
        "https://real-ruby-lemming-suit.cyclic.app/users/login",
        userDetails,
        {
          withCredentials: true,
        }
      );
      console.log(res);

      if (res.data.status == "success") {
        alert("Login successfully");
        setAuth(true);
        navigate("/");
      }
      setUserDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <p>Login</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
