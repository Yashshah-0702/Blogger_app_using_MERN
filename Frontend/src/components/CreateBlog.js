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
      <h1 className="h2 text-center">Create a Blog</h1>
      <p className="text-center">Turn your thoughts into blogs</p>
      <form className="p-4 mb-4" onSubmit={handleSubmit}>
        <div className="card shadow p-4 mt-5 mb-4 ">
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
              rows="3"
              onChange={handleContentChange}
              required
            ></textarea>
          </div>
          <div>
            <label>Image</label>
            <input type="file" onChange={handleImageChange} required />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
