import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { apiKey } from "../config/api.config";
import "react-toastify/dist/ReactToastify.css";

const UserProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login for this functionality");
          setTimeout(() => {
            navigate("/login");
          }, 1000); // 1-second delay
          return;
        }

        // Fetch profiles with authentication token
        const response = await axios.get(`${apiKey}/user/getProfiles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.message === "Invalid token") {
          toast.error("Please Login Again");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }

        if (response.data.message === "Token expired") {
          toast.error("Session expired. Please login again.");
          setTimeout(() => {
            navigate("/login");
          }, 1200);
          return;
        }

        setProfiles(response.data.data); // Set profiles state
      } catch (error) {
        toast.error("Error fetching profiles:");
      }
    };

    fetchProfiles();
  }, [navigate]);

  const truncateBio = (bio) => {
    return bio.length > 3 ? bio.substring(0, 15) + "..." : bio;
  };

  return (
    <>
      <div>
        {profiles && profiles.length > 0 ? (
          <>
            <table className="p-2 text-center table table-hover">
              <thead>
                <tr>
                  <th>Sr.NO.</th>
                  <th>ID</th>
                  <th>FullName</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Bio/Introduction</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile, index) => (
                  <tr key={profile._id}>
                    <td>{index + 1}</td>
                    <td>{profile._id}</td>
                    <td>{profile.first_name + " " + profile.last_name}</td>
                    <td>{profile.email}</td>
                    <td>
                      {profile.user_type === 2 ? "User" : profile.user_type}
                    </td>
                    <td>
                      {profile.bio
                        ? truncateBio(profile.bio)
                        : "User has no bio"}
                      {/* {profile.bio === "" || !profile.bio
                        ? "User has no bio"
                        : profile.bio} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No profiles available.</p>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default UserProfiles;