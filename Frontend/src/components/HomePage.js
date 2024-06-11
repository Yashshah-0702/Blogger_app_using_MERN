import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { apiKey } from "../config/api.config";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import bodyMotion from "../config/bodyMotion.config";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
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
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${apiKey}/blog/getBlogs`);
        setBlogs(response.data.data);
      } catch (error) {
        toast.error("Server Error");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };
    fetchBlogs();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  };
  return (
    <AnimatePresence>
      <motion.div
        variants={bodyMotion}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="mx-lg-5"
      >
        <div className="d-lg-flex justify-content-between align-items-center border-bottom bg-gradient opacity-40">
          <div className="mx-3">
            <h1 className="display-6">
              Welcome To
              <span> 🅑🅛🅞🅖🅖🅘🅝🅖 🅦🅞🅡🅛🅓</span>
              {/* 🅱🅻🅾🅶🅶🅸🅽🅶 🆆🅾🆁🅻🅳 */}
            </h1>
            <p className="h6">
              Turn your{" "}
              <span className="bg-success text-white border-bottom border-dark">
                🅃🄷🄾🅄🄶🄷🅃🅂
              </span>{" "}
              into{" "}
              <span className="bg-primary text-white border-bottom border-dark">
                🄱🄻🄾🄶🅂
              </span>
            </p>
          </div>
          <div className="text-lg-right text-center m-3">
            <NavLink
              to="/createBlog"
              className="btn btn btn-outline-dark btn-lg"
            >
              Create a Blog 📝
            </NavLink>{" "}
          </div>
        </div>
        <br></br>
        <div className="container">
          {loading ? (
            <div className="loading-overlay">
              <ClipLoader size={50} color={"black"} loading={loading} />
            </div> // Display loading text while fetching data
          ) : blogs && blogs.length > 0 ? (
            <>
              <h2
                className="text-center h4 py-2 bg-dark bg-gradient rounded-3 text-light"
                style={{ fontWeight: "1000" }}
              >
                LATEST BLOGS
                {/* 🄻🄰🅃🄴🅂🅃 🄱🄻🄾🄶🅂 */}
              </h2>
              {/* <br></br> */}
              <div className="row">
                {/* <br></br> */}
                {blogs
                  .slice(-3)
                  .reverse()
                  .map((blog) => (
                    <motion.div
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      key={blog._id}
                      whileHover={{ scale: 0.85 }}
                      // whileTap={{ scale: 0.70 }}
                      className="col-md-6 col-lg-4 mb-4"
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
                          <button
                            className="btn btn-outline-dark mt-auto"
                            onClick={() => handleViewDetails(blog._id)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </>
          ) : (
            <h1 className="text-center h1 text-muted">No Blogs Found</h1>
          )}
          <div id="aboutUs">
            <AboutUs />
          </div>
          <div id="contactUs">
            <ContactUs />
          </div>
        </div>
        <ToastContainer />
      </motion.div>
    </AnimatePresence>
  );
}
