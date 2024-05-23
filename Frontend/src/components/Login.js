import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await axios.post("http://localhost:7000/user/login", {
        email,
        password,
      });
      if (response.data.message === "Invalid credentials") {
        toast.error("Invalid credentials");
      } else {
        const { token, user_type, id ,name } = response.data.data;

        // Store the token, user_type, and id in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("id", id);
        localStorage.setItem("name" , name)

        // Configure Axios to include these values in headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        axios.defaults.headers.common["User-Type"] = user_type;
        axios.defaults.headers.common["User-Id"] = id;
        axios.defaults.headers.common["Name"] = name;

        toast.success("Login successful");

        // window.location.reload();
        if (user_type === 1) {
          setTimeout(() => (window.location.href = "/userProfiles"), 350);
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 350);
        }
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      {" "}
      <br></br>
      <h2 className="h2 text-center">Login into blogging World:-</h2>
      <form className="p-4 mb-4" onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-5 mb-4">
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                visibility="hidden"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="text-center">
          <p>
            {" "}
            Don't remember your password ? then{" "}
            <span>
              <NavLink to="/forgotPassword"> Forgot Password </NavLink>
            </span>
          </p>{" "}
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Login
          </button>
          <br></br> <br></br>
          <p>
            Don't have an account then{"   "}
            <span>
              <NavLink to="/signup/user">Sign-up</NavLink>
            </span>
          </p>{" "}
          <br></br>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
