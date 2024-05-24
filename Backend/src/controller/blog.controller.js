const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const { success, failure } = require("../utils/response.utils");
const { httpsStatusCodes, serverResponseMessage } = require("../constants");
const {
  mediaConfig,
  mediaConfig: {
    imageUpload: { ImagePath },
  },
} = require("../configs");
const dir = path.resolve(__dirname, "../../");
const removeBlog = async (blog) => {
  const existingBlogFileName = blog.blogUrl.split("/").pop();
  const existingBlogPath = path.join(
    dir,
    mediaConfig.main_upload_dir + "/" + ImagePath + existingBlogFileName
  );
  await fs.promises.unlink(existingBlogPath);
};

exports.getBlogs = async (req, res) => {
  try {
    const response = await Blog.find();
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.BLOGS_FETCHED_SUUCESSFULLY,
      response
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { _id } = req.body;
    const blog = await Blog.findOne({ _id });
    if (!blog) {
      return failure(
        res,
        httpsStatusCodes.NOT_FOUND,
        serverResponseMessage.BLOG_NOT_FOUND
      );
    }
    return success(
      res,
      httpsStatusCodes.SUCCESS,
      serverResponseMessage.BLOG_FETCHED_SUUCESSFULLY,
      blog
    );
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { user } = req;
    console.log(user);
    const blogPath = req.media_details.file_path + req.media_details.name;
    const author = await User.findOne({ _id: user.id });
    const date = new Date();
    const data = {
      ...req.body,
      author: author.first_name + " " + author.last_name,
      blogUrl: blogPath,
      Publication_date: date,
    };
    console.log(data);
    const response = await Blog.create(data);
    return success(
      res,
      httpsStatusCodes.CREATED,
      serverResponseMessage.BLOG_CREATED_SUCCESSFULLY,
      response
    );
  } catch (error) {
    console.log(error);
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};

exports.updateBlog = async (req, res) => {
  try {
  } catch (error) {
    return failure(
      res,
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      serverResponseMessage.INTERNAL_SERVER_ERROR
    );
  }
};
