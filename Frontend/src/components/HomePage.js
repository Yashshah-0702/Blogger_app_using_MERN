import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function HomePage() {
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
    // navigate(`/blog/${blogId}`); // Redirect to the details page
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:7000/blog/getBlogs");
        console.log(response.data.data);
        setBlogs(response.data.data);
      } catch (error) {
        toast.error("Server Error");
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="mx-lg-5">
      <div className="d-lg-flex justify-content-between align-items-center border-bottom bg-primary text-light opacity-40">
        <div className="m-3">
          <h1 className="display-4">
            Welcome To Bl<span>👀</span>ging World
          </h1>
        </div>
        <div className="text-lg-right text-center m-3">
          <NavLink
            to="/createBlog"
            className="btn btn btn-outline-light btn-lg"
          >
            Create a Blog ✍️
          </NavLink>{" "}
          {"  "}
          <button className="btn btn btn-outline-light btn-lg">
            Create a Post 📝
          </button>
        </div>
      </div>
      {/* <div>
        <h3 className=" mt-3 display-5 text-center mt-1">
          All Bl<span>👀</span>gs
        </h3>
      </div> */}
      <br></br>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 mt-3 border-end">
          <h5 className="text-center display-6">Latest Blogs ✍️</h5>
          <br></br>
          <div className="row row-cols-1 row-cols-md-1 g-4">
            {blogs.map((blog) => (
              <div className="col">
                <div
                  key={blog._id}
                  className="card m-lg-3 shadow"
                  style={{ height: "100%", width: "75%" }}
                >
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
                      Author:-
                      <small className="text-muted">{blog.author}</small>
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
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
          <h5 className="text-center display-6">Latest Posts 📝</h5>
          <div className="border-end border-bottom p-3">
            <h1>Post</h1>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
