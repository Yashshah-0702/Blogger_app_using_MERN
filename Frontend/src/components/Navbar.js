import React from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ name }) {
  const userType = localStorage.getItem("user_type");
  const token = localStorage.getItem("token");
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 350);
  };

  const LeftMotion = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  const rightMotion = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  };

  return (
    <AnimatePresence>
      <nav className="navbar navbar-expand-lg navbar-dark opacity-40 bg-dark bg-gradient fw-bold">
        <div className="container-fluid px-5">
          <Link className="navbar-brand" to="/">
            <motion.h1
              variants={LeftMotion}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="h4"
              style={{ fontWeight: "900" }}
            >
              Blogging World
            </motion.h1>
          </Link>
          <motion.button
            variants={rightMotion}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </motion.button>
          <motion.div
            variants={rightMotion}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="collapse navbar-collapse"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav me-auto">
              <li className="nav-item h6" style={{ fontWeight: "700" }}>
                <Link className="nav-link " to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item h6" style={{ fontWeight: "700" }}>
                <Link className="nav-link " to="/allBlogs">
                  All Blogs
                </Link>
              </li>
              {token && userType === "1" && (
                <>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <Link className="nav-link" to="/userProfiles">
                      User Lists
                    </Link>
                  </li>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <Link className="nav-link" to="/userEnquiries">
                      User Enquiries
                    </Link>
                  </li>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <Link className="nav-link" to="/myBlogs">
                      My Blogs
                    </Link>
                  </li>
                </>
              )}
              {token && userType === "2" && (
                <li className="nav-item h6" style={{ fontWeight: "700" }}>
                  <Link className="nav-link" to="/myBlogs">
                    My Blogs
                  </Link>
                </li>
              )}
              {token && (
                <li className="nav-item h6" style={{ fontWeight: "700" }}>
                  <Link className="nav-link" to="/createBlog">
                    Create Blog
                  </Link>
                </li>
              )}
              {userType === "2" && location.pathname === "/" && (
                <>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <a href="#aboutUs" className="nav-link">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <a href="#contactUs" className="nav-link">
                      Contact Us
                    </a>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav ms-auto">
              {!token ? (
                <>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <Link className="nav-link" to="/signup/user">
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item h6" style={{ fontWeight: "700" }}>
                    <Link className="nav-link" to="#" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                  {userType === "1" && (
                    <li className="nav-item h6" style={{ fontWeight: "700" }}>
                      <Link className="nav-link" to="/signup/admin">
                        Create a admin profile
                      </Link>
                    </li>
                  )}
                </>
              )}
              <li className="nav-item h6" style={{ fontWeight: "700" }}>
                <Link className="nav-link" to="/userProfile">
                  <span className="bg-light rounded-circle">🙎🏻‍♂️</span>
                  {"  "}
                  {name ? name : " Your Profile"}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
        <ToastContainer />
      </nav>
    </AnimatePresence>
  );
}
