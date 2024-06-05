import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { apiKey } from "../config/api.config";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

function BlogDetails() {
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

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
          setLoading(false); // Set loading to false if no blogId is found
          return;
        }

        const response = await axios.post(`${apiKey}/blog/getBlog`, {
          _id: blogId,
        });
        setBlogDetails(response.data.data);
      } catch (error) {
        toast.error("server error");
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchBlogDetails();
  }, []);

  const processContent = (content) => {
    return content.replace(/\n/g, "<br />");
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  const imgVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="container">
      {loading ? (
        <div className="loading-overlay">
          <ClipLoader size={50} color={"#000"} loading={loading} />
        </div>
      ) : blogDetails ? (
        <AnimatePresence>
          <div className="card shadow-lg p-lg-4 rounded-3 mb-4">
            <motion.img
              variants={imgVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              src={blogDetails.blogUrl}
              alt={blogDetails.title}
              className="card-img-top justify-content-center pointer"
              style={{
                objectFit: "cover",
                height: "auto",
                width: "100%",
                maxHeight: "400px",
                borderRadius: "15px 15px 0 0",
              }}
            />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              className="m-lg-3 card-body"
            >
              <h2
                className="text-dark"
                style={{ fontWeight: "700", textDecoration: "underline" }}
              >
                {blogDetails.title}
              </h2>
              <div className="mt-3 mb-3">
                <p
                  className="text-dark"
                  style={{
                    fontFamily: "Georgia, serif",
                    lineHeight: "1.6",
                    fontSize: "1.1em",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: processContent(blogDetails.content),
                  }}
                ></p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="card-text mb-0">
                  <strong>Author:</strong>
                  <span className="text-primary text-decoration-underline">
                    {" "}
                    {blogDetails.author.toUpperCase()}
                  </span>
                </p>
                <p className="card-text mb-0">
                  <strong>Publication Date:</strong>
                  <span className="text-secondary">
                    {" "}
                    {formatDate(blogDetails.Publication_date)}
                  </span>
                </p>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      ) : (
        <p>No blog details found</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default BlogDetails;
