import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  //   const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof title !== "string" || title.length < 20 || title.length > 50) {
      toast.error("Title must be a string and between 20 and 50 characters.");
      return;
    }
    if (
      typeof content !== "string" ||
      content.length < 300 ||
      content.length > 1600
    ) {
      toast.error(
        "Content must be a string and between 300 and 1600 characters."
      );
      return;
    }
    if (image) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(image.type)) {
        toast.error(
          "Invalid image format. Only JPEG, JPG, and PNG are allowed."
        );
        return;
      }
    } else {
      toast.error("Image is required.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("upload_file", image);

    try {
      const response = await axios.post(
        "http://localhost:7000/blog/createBlog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      toast.error("Failed to create blog.");
      //   setMessage("Failed to create blog.");
    }
  };

  return (
    <div className="container">
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-lg-5 mb-4 ">
          <div className="text-center rounded-3 py-2 text-light bg-dark">
            <h1>Create Blog</h1>
            <p>Turn your thoughts into blogs</p>
          </div>
          <br></br><br></br>
          <div className="mb-3 mt-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              value={title}
              placeholder="Title"
              className="form-control"
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Content</label>
            <textarea
              value={content}
              placeholder="Content"
              className="form-control"
              rows="10"
              onChange={handleContentChange}
              required
            ></textarea>
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Image</label>
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>
        <div className="text-center mb-5">
          <button className="btn btn-outline-dark btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
