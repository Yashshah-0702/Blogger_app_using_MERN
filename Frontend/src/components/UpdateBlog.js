import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    upload_file: null,
    _id: "",
  });
  //   const [existingImage, setExistingImage] = useState(null);
  const [showUploadInput, setShowUploadInput] = useState(false); // State to control display of upload input
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const selectedBlogID = localStorage.getItem("selectedBlogId");
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login for this functionality");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      if (selectedBlogID) {
        try {
          const response = await axios.post(
            `http://localhost:7000/blog/getBlog`,
            { _id: selectedBlogID }
          );
          const { title, content } = response.data.data;
          //   const imageUrl = blogUrl ? blogUrl : null;
          setFormData((prevData) => ({
            ...prevData,
            title,
            content,
            _id: selectedBlogID,
          }));
          //   if (imageUrl) {
          //     setExistingImage(imageUrl);
          //   }
        } catch (error) {
          toast.error("Server error");
        }
      }
    };

    fetchBlogDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      upload_file: e.target.files[0],
    }));

    // Display preview of the selected file
    // if (e.target.files && e.target.files[0]) {
    //   let reader = new FileReader();
    //   reader.onload = function (e) {
    //     setExistingImage(e.target.result);
    //   };
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login for this functionality");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    if (formData.title.length < 20 || formData.title.length > 50) {
      toast.error("Title must be between 20 and 50 characters.");
      return;
    }
    if (formData.content.length < 300) {
      toast.error("Content must minimum of 300.");
      return;
    }
    if (formData.upload_file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(formData.upload_file.type)) {
        toast.error(
          "Invalid image format. Only JPEG, JPG, and PNG are allowed."
        );
        return;
      }
    }
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("upload_file", formData.upload_file);
    form.append("_id", formData._id);

    try {
      const response = await axios.patch(
        "http://localhost:7000/blog/updateBlog",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message === "Token expired") {
        toast.error("Session Expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        return;
      }
      if (response.data.message === "Access Denied") {
        toast.error("You are not authorized to update this blog.");
        return;
      }
      toast.success("Blog updated successfully.");
      setTimeout(() => {
        navigate("/myBlogs");
      }, 800);
      //   console.log("Blog updated successfully:", response.data);
    } catch (error) {
      toast.error("Server Error");
    }
  };

  // Function to toggle display of upload input
  const toggleUploadInput = () => {
    setShowUploadInput((prev) => !prev);
    // Reset upload_file field when closing the input
    if (showUploadInput) {
      setFormData((prevData) => ({
        ...prevData,
        upload_file: null,
      }));
    }
  };

  return (
    <div className="container">
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-lg-5 mb-4 ">
          <h5 className="text-center rounded-3 py-2 text-light bg-dark">
            Update Blog
          </h5>
          <div className="mb-3 mt-3">
            <label className="form-label">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Content:</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              rows="7"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>
          {showUploadInput ? (
            <div className="mb-3 mt-3">
              <label className="form-label">Upload File:</label>
              <input
                type="file"
                id="upload_file"
                className="form-control"
                name="upload_file"
                onChange={handleFileChange}
              />
              <button
                onClick={toggleUploadInput}
                className="mt-2 btn btn-outline-dark"
              >
                Close
              </button>
            </div>
          ) : (
            <div className=" mt-3 text-start">
              <p>
                For Updating Image,{" "}
                <a href="#" onClick={toggleUploadInput}>
                  Click
                </a>{" "}
                here
              </p>
            </div>
          )}{" "}
          <div className="text-center mt-2 ">
            <button className="btn btn-outline-dark" type="submit">
              Update Blog
            </button>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default UpdateBlog;
