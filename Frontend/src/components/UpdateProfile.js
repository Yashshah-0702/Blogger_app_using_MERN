import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    bio: "",
    user_name: "",
  });
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login for this functionality");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      const response = await axios.post(
        "http://localhost:7000/user/getProfile",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Token expired") {
        toast.error("Token expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      const profileData = response.data.data; // Assuming the API response contains user profile data
      setFormData(profileData);
    } catch (error) {
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login for this functionality");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      const response = await axios.patch(
        "http://localhost:7000/user/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Token expired") {
        toast.error("Token expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/userProfile");
      }, 800);
    } catch (error) {
      toast.error("Server Error");
    }
  };

  // Check if formData exists before accessing its properties
  const email = formData ? formData.email : "";
  const first_name = formData ? formData.first_name : "";
  const last_name = formData ? formData.last_name : "";
  const bio = formData ? formData.bio : "";
  const user_name = formData ? formData.user_name : "";

  return (
    <div className="container">
      <br></br>
      <h2 className="h2 text-center">Update Profile</h2>
      <form className="p-4 mb-4" onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-5 mb-4">
          <div className="mb-3 mt-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={first_name}
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={last_name}
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              name="user_name"
              value={user_name}
              className="form-control"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Bio:</label>
            <textarea
              className="form-control"
              rows="3"
              name="bio"
              placeholder="Bio"
              value={bio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Update Profile
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
