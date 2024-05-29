import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import AboutUs from "./AboutUs";
import { apiKey } from "../config/api.config";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
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
        const sortedBlogs = response.data.data.sort(
          (a, b) => new Date(b.Publication_date) - new Date(a.Publication_date)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        toast.error("Server Error");
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="mx-lg-5">
      <div className="">
        {blogs && blogs.length > 0 ? (
          <>
            <h5 className="text-center h4 py-2 bg-dark bg-gradient rounded-3 text-light mx-1">
              All Blogs 📝
            </h5>
            <br></br>
            <div className="">
              {/* <br></br> */}
              {blogs.map((blog) => (
                <div
                  key={blog._id}
                  className="row bg-gradient border-bottom rounded-3 bg-body shadow mt-3 m-2"
                >
                  <div className="col-md-4 col-lg-4 col-sm-12 p-lg-5 p-2 ">
                    <img
                      src={blog.blogUrl}
                      alt={blog.title}
                      className="w-100"
                      style={{ height: "260px" }}
                    />
                  </div>
                  <div className="col-md-8 col-lg-8 col-sm-12 p-lg-5 p-3">
                    <h2
                      className="h4 card-title"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        height: "2.0em",
                      }}
                    >
                      {blog.title}
                    </h2>
                    <h5
                      className="small card-text"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        height: "3.6em",
                      }}
                    >
                      {blog.content}
                    </h5>
                    <br></br>
                    <p className="card-text">
                      Author :-
                      <small className="text-dark text-decoration-underline">
                        {blog.author.toUpperCase()}
                      </small>
                    </p>
                    <p className="card-text">
                      Publication Date:-
                      <small className="text-dark">
                        {formatDate(blog.Publication_date)}
                      </small>
                    </p>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleViewDetails(blog._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h1 className="text-center h1 text-muted">No Blogs Found</h1>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}