import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/user/signup/admin",
        {
          first_name: firstName,
          last_name: lastName,
          user_name: userName,
          email,
          // password,
        }
      );

      if (response.data.message === "Email already exists") {
        toast.error(response.data.message);
      } else {
        toast.success("Admin Profile Created Succesfully");
        setTimeout(() => {
          navigate("/userProfiles"); // Redirect to home page
        }, 1000);
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <br></br>
      <h2 className="h2 text-center"> Create a Admin profile :-</h2>
      <form className="p-4 mb-4" onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-5 mb-4">
          <div className="mb-3 mt-3">
            <label className="form-label">FirstName:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FirstName"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">LastName:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LastName"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">UserName:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="UserName"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="form-control"
              required
            />
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control"
              required
            />
          </div> */}
        </div>
        <br></br>
        <div className="text-center">
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Signup
          </button>
          <br></br>
          <br></br>
          <p>
            Already have an admin account then {"  "}
            <span>
              <NavLink to="/login">Login</NavLink>
            </span>{" "}
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
