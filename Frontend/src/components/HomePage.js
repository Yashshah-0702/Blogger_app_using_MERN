import React from "react";

export default function HomePage() {
  return (
    <div className="mx-lg-5">
      <div className="d-lg-flex justify-content-between align-items-center border-bottom ">
        <div className="m-3">
          <h1 className="display-4">
            Welcome To Bl<span>👀</span>ging World
          </h1>
        </div>
        <div className="text-lg-right text-center m-3">
          <button className="btn btn btn-outline-primary btn-lg">
            Create a Blog ✍️
          </button>{" "}
          {"  "}
          <button className="btn btn btn-outline-primary btn-lg">
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
          <div className="border-start border-bottom p-3">
            <h1>Blog</h1>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 mt-3">
          <h5 className="text-center display-6">Latest Posts 📝</h5>
          <div className="border-end border-bottom p-3">
            <h1>Post</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
