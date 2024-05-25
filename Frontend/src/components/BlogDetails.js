// src/BlogDetails.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function BlogDetails() {
  const [blogDetails, setBlogDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        // Retrieve blogId from localStorage
        const blogId = localStorage.getItem("selectedBlogId");
        if (!blogId) {
          setError("No blog ID found");
          return;
        }

        // Fetch blog details
        const response = await axios.post(
          "http://localhost:7000/blog/getBlog",
          {
            _id: blogId,
          }
        );
        console.log(response.data);
        setBlogDetails(response.data.data);
        return toast.success(response.data.message);
      } catch (error) {
        setError("Error fetching blog details");
      }
    };

    fetchBlogDetails();
  }, []);

  return (
    <div>
      <h2>Blog Details</h2>
      {error && <p>{error}</p>}
      {blogDetails && (
        <div key={blogDetails._id}>
          <h3>{blogDetails.title}</h3>
          <p>{blogDetails.content}</p>
          <img src={blogDetails.blogUrl} alt={blogDetails.title} />
          {/* Render other details as needed */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default BlogDetails;
