import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { apiKey } from "../config/api.config";

function BlogDetails() {
  const [blogDetails, setBlogDetails] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const getDayWithSuffix = (day) => {
      if (day > 3 && day < 21) return `${day}th`;
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    };

    return `${getDayWithSuffix(day)} ${month} ${year}`;
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogId = localStorage.getItem("selectedBlogId");
        if (!blogId) {
          return;
        }

        const response = await axios.post(`${apiKey}/blog/getBlog`, {
          _id: blogId,
        });
        setBlogDetails(response.data.data);
      } catch (error) {
        toast.error("server error");
      }
    };

    fetchBlogDetails();
  }, []);

  return (
    <div className="container">
      <br></br>
      {blogDetails && (
        <div className="card shadow p-lg-4 p-2 mb-4" key={blogDetails._id}>
          <img
            src={blogDetails.blogUrl}
            alt={blogDetails.title}
            style={{ width: "100%", height: "50%" }}
          />
          <br></br>
          <div className="m-lg-5 card-body">
            <h3 className="d-lg-visible">{blogDetails.title}</h3>
            <br></br>
            <h5 className="h5 text-muted">{blogDetails.content}</h5>
            <br></br>
            <p className=" card-text">
              Author:-
              <small className="text-muted text-decoration-underline">
                {blogDetails.author.toUpperCase()}
              </small>
            </p>
            <p className=" card-text">
              Publication Date:-
              <small className="text-muted">
                {formatDate(blogDetails.Publication_date)}
              </small>
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default BlogDetails;
