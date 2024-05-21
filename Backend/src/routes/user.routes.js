const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  getProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  forgotPassword,
} = require("../controller/user.controller");
const isAuthenticated = require("../middleware/authentication.middelware");

module.exports = () => {
  router.get("/getprofiles", isAuthenticated, getProfiles);
  router.post("/signUp/:user", signUp);
  router.post("/login", login);
  router.post("/getprofile", isAuthenticated, getProfile);
  router.patch("/updateProfile", isAuthenticated, updateProfile);
  router.delete("/deleteProfile", isAuthenticated, deleteProfile);
  router.post("/forgotPassword", forgotPassword);
  router.post("/resetPassword");

  return router;
};
