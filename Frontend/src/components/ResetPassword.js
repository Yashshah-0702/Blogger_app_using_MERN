import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    secretCode: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,20}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { secretCode, password, confirmPassword } = formData;
    const token = localStorage.getItem("resettoken");
    if (!validatePassword(password)) {
      toast.error(
        "Password must be 8-20 characters long, include at least one special character, and one uppercase character."
      );
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:7000/user/resetPassword",
        {
          secretCode,
          password,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Invalid secret code") {
        toast.error(response.data.message);
        return;
      }
      if (response.data.message === "Password not matched") {
        toast.error(response.data.message);
        return;
      }
      toast.success(response.data.message);
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 400);
    } catch (err) {
      toast.error("Server error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-lg-5 mb-4">
          <h2 className="bg-dark text-light py-3 text-center rounded-3">Reset Password</h2>
          <br></br> <br></br>
          <div className="mb-3">
            <label className="form-label">Secret Code:</label>
            <input
              type="text"
              name="secretCode"
              className="form-control"
              value={formData.secretCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password:</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
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
          <div className="mb-3">
            <label className="form-label">Confirm New Password:</label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Reset Password
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
