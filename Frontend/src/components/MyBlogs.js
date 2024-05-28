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
        if (!token) {
          toast.error("Please login to view your blogs.");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
          return;
        }
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
    <div className="px-lg-5">
      {/* <br></br> */}
      {blogs && blogs.length > 0 ? (
        <>
          <h4 className="h4 text-center py-3 bg-dark bg-gradient mx-1 rounded-3 text-light">
            Your Blogs
          </h4>
          <br></br>
          <div className="">
            {blogs.map((blog) => (
              <div
                className="row bg-gradient border-bottom rounded-3 bg-body shadow mt-3 m-2"
                // style={{ backgroundColor: "#f0f0f0" }}
                key={blog._id}
              >
                <div className="col-md-4 col-lg-4 col-sm-12 p-lg-5 p-sm-2">
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
                      whiteSpace: "normal", // Ensuring normal whitespace
                      height: "2.0em", // Adjust this value based on line height and number of lines
                    }}
                  >
                    {blog.title}
                  </h2>
                  {/* <br></br> */}
                  <h5
                    className="small card-text"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "normal", // Ensuring normal whitespace
                      height: "3.6em", // Adjust this value based on line height and number of lines
                    }}
                  >
                    {blog.content}
                  </h5>
                  <br></br>
                  <p className="card-text">
                    Author:-
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
              // </div>
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-center h1 text-muted">No Blogs Found</h1>
      )}

      <ToastContainer />
    </div>
  );
};

export default BlogList;
