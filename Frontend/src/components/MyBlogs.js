import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { apiKey } from "../config/api.config";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import bodyMotion from "../config/bodyMotion.config";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
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

  const deleteBlog = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your blog?"
    );

    if (!confirmed) {
      return; // Exit the function if the user cancels the deletion
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${apiKey}/blog/deleteBlog`, {
        data: { _id: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = "/myBlogs";
      localStorage.setItem("blogDeleted", "true");
      return;
    } catch (error) {
      console.error("Error deleting the blog:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!token) {
          toast.error("Please login to view your blogs.");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          setLoading(false);
          return;
        }
        const response = await axios.get(`${apiKey}/blog/myBlog`, {
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
        const deleteBlog = localStorage.getItem("blogDeleted");
        if (deleteBlog) {
          toast.success("Blog Deleted Successfully");
          localStorage.removeItem("blogDeleted");
        }
        // toast.success(response.data.message);
        const sortedBlogs = response.data.data.sort(
          (a, b) => new Date(b.Publication_date) - new Date(a.Publication_date)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        toast.error("Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      variants={bodyMotion}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="container"
    >
      {/* <br></br> */}
      {loading ? (
        <div className="loading-overlay">
          <ClipLoader size={50} color={"black"} loading={loading} />
        </div>
      ) : blogs && blogs.length > 0 ? (
        <>
          <h2
            className="text-center h4 py-2 bg-dark bg-gradient rounded-3 text-light"
            style={{ fontWeight: "1000" }}
          >
            Your Blogs
          </h2>
          <div className="row">
            <AnimatePresence>
              {blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="col-md-6 col-lg-4 mb-4"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 0.85 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <div className="card shadow-sm h-100">
                    <img
                      src={blog.blogUrl}
                      alt={blog.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h3
                        className="card-title"
                        style={{
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        {blog.title}
                      </h3>
                      <p
                        className="card-text text-muted"
                        style={{ flex: "1 1 auto" }}
                      >
                        {blog.content.slice(0, 100)}...
                      </p>
                      <p className="card-text mb-1">
                        Author:{" "}
                        <span className="text-dark text-decoration-underline">
                          {blog.author.toUpperCase()}
                        </span>
                      </p>
                      <p className="card-text">
                        Publication Date:{" "}
                        <span className="text-dark">
                          {formatDate(blog.Publication_date)}
                        </span>
                      </p>
                      <div>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => handleViewDetails(blog._id)}
                        >
                          View Details
                        </button>{" "}
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => deleteBlog(blog._id)}
                        >
                          Delete Blog
                        </button>{" "}
                        <NavLink
                          to="/updateBlog"
                          className="btn btn-outline-dark"
                          onClick={() => handleViewDetails(blog._id)}
                        >
                          Update Blog
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </motion.div>
                // </div>
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <h1 className="text-center h1 text-muted">No Blogs Found</h1>
      )}

      <ToastContainer />
    </motion.div>
  );
};

export default BlogList;
