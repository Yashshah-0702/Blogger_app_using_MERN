import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  //   const [token, setToken] = useState('');
  //   const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError('');
    // setToken('');

    try {
      const response = await axios.post(
        "http://localhost:7000/user/forgotPassword",
        { email }
      );
      if (response.data.message === "User not found") {
        toast.error(response.data.message);
        return;
      }
      localStorage.setItem("resettoken", response.data.data);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/resetPassword");
      }, 1000);

      //   setToken(response.data.token);
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="container">
      {" "}
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-lg-5 mb-4">
          <h2 className="h5 bg-dark text-light rounded-3 py-3 text-center ">
            Forgot Password
          </h2>
          {/* <br></br> */}
          {/* <br></br> */}
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
        </div>
        <div className="text-center">
          <button
            className="btn btn-outline-dark btn-md"
            type="submit"
            style={{ padding: "0.5em 1em" }}
          >
            Proceed
          </button>
        </div>
        <br></br>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
