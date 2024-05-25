import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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

  const handleViewDetails = (blogId) => {
    localStorage.setItem("selectedBlogId", blogId);
    navigate("/getBlog");
    // navigate(`/blog/${blogId}`); // Redirect to the details page
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:7000/blog/myBlog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.message === "Token expired") {
          toast.error("Session Expired. Please login again.");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          return;
        }
        // toast.success(response.data.message);
        setBlogs(response.data.data);
      } catch (error) {
        toast.error("Server Error");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="mx-5">
      <br></br>
      <h4 className="h4 text-center">Your Blogs</h4>
      <br></br>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {blogs.map((blog) => (
          <div className="col">
            <div key={blog._id} className="card m-lg-3 shadow rounded-75" style={{height:"100%"}}>
              <img
                src={blog.blogUrl}
                alt={blog.title}
                className="card-img-top m-4 w-auto"
                style={{ height: "350px" }}
              />
              <div key={blog._id} className="card-body">
                <h2 className="card-title">{blog.title}</h2> <br></br>
                <h5 className="card-text">{blog.content}</h5> <br></br>
                <p className="card-text">
                  Author:-<small className="text-muted">{blog.author}</small>
                </p>
                <p className="card-text">
                  Publication Date:-
                  <small className="text-muted">
                    {formatDate(blog.Publication_date)}
                  </small>
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewDetails(blog._id)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BlogList;
