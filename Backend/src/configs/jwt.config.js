"use strict";
require("dotenv").config();

const jwtConfig = {
  /*
  |--------------------------------------------------------------------------
  | JWT
  |--------------------------------------------------------------------------
  */
  jwtSecret: process.env.JWT_SECRET,
<<<<<<< HEAD
  tokenExpiration: process.env.TOKEN_EXPIRY,
=======
  tokenExpiration: process.env.TOKEN_EXPIRATION,
>>>>>>> b240a51fd190e94ed2920f845daf1c53b24a9c72
  resetPasswordSecret: process.env.RESET_PASSWORD_SECRET,
  resetPasswordTokenExpiration: process.env.RESET_PASSWORD_TOKEN_EXPIRATION,
};
module.exports = jwtConfig;
