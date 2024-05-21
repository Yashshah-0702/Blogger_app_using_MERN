import React from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar({ user_type }) {
  const userType = localStorage.getItem("user_type");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 350);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark opacity-40 bg-primary  fw-bold">
      <div className="container-fluid px-5">
        <Link className="navbar-brand" to="/">
          <h1 className="h1">Blogging</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item h4">
              <Link className="nav-link " to="/">
                All Blogs
              </Link>
            </li>
            {userType === "1" && (
              <li className="nav-item h4">
                <Link
                  className="nav-link "
                  to="/userProfiles"
                >
                  User Lists
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item h4">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item h4">
                  <Link className="nav-link" to="/signup/user">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item h4">
                  <Link className="nav-link" to="#" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
                {userType === "1" && (
                  <li className="nav-item h4">
                    <Link className="nav-link" to="/signup/admin">
                      Create a admin profile
                    </Link>
                  </li>
                )}
              </>
            )}
            <li className="nav-item h4">
              <Link className="nav-link" to="/userProfile">
                <span className="bg-light rounded-circle">🙎🏻‍♂️</span>
                View Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
}
