const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authentication.middelware");
const { createEnquiry } = require("../controller/enquiry.controller");

module.exports = () => {
  router.post("/createEnquiry",createEnquiry);
  router.get("/getEnquiry", isAuthenticated);
  router.delete("/deleteEnquiry", isAuthenticated);
  return router;
};
