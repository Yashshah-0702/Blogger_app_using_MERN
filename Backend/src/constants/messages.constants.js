const serverResponseMessage = {
  /* User */
  USER_NOT_FOUND: "User not found",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  PROFILES_FETCHED_SUUCESSFULLY: "Profiles fetched successfully",
  USER_CREATED_SUCCESSFULLY: "User created successfully",
  PROFILE_UPDATED_SUCCESSFULLY: "Profile updated successfully",
  INVALID_CREDENTIALS: "Invalid credentials",
  PROFILE_FETCHED_SUUCESSFULLY: "Profile fetched successfully",
  LOGIN_SUCCESSFULL: "Login successfull",
  PROFILE_DELETED_SUCCESSFULLY: "Profile deleted successfully",
  RESET_PASSWORD_LINK_SENT: "Reset password link sent to your email",
  PASSWORD_NOT_MATCHED: "Password not matched",
  TOKEN_MISSING: "Token missing",
  PASSWORD_UPDATED_SUCCESSFULLY: "Password updated successfully",
  INVALID_SECRET_CODE: "Invalid secret code",

  /* Certificate */
  CERTIFICATE_CREATED_SUCCESSFULLY: "Certificate created successfully",
  CERTIFICATE_FETCHED_SUCCESSFULLY: "Certificate fetched successfully",
  CERTIFICATE_UPDATED_SUCCESSFULLY: "Certificate updated successfully",
  CERTIFICATE_DELETED_SUCCESSFULLY: "Certificate deleted successfully",
  CERTIFICATE_NOT_FOUND: "Certificate not found",
  ACCESS_DENIED: "Access denied",
  /* Catch Error */
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  TOKEN_EXPIRED: "Token expired",
  INVALID_TOKEN: "Invalid token",
};

module.exports = { serverResponseMessage };
