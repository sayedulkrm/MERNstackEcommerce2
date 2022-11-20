const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// --------------------------------------------///////////////-------------------------------------


// Register as a New user
router.route("/register").post(registerUser);

// Loging as a user
router.route("/login").post(loginUser);

// Forgot Password
router.route("/password/forgot").post(forgotPassword);

// Reset Password
router.route("/password/reset/:token").put(resetPassword);

// Logout
router.route("/logout").get(logout);

// ------------------------------------------////////////////-----------------------------------

// Get user profile details
router.route("/me").get( isAuthenticatedUser , getUserDetails);

// Password Update
router.route("/password/update").put( isAuthenticatedUser , updatePassword);

// Profile Update
router.route("/me/update").put( isAuthenticatedUser , updateProfile);


// ---------------------------                   ////////////////////////////         -------------------




//             ----------------------             A D M I N   |-| |-|   R O U T E            --------------------


//  Get All User ---------Admin 

router.route("/admin/users")
        .get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser);

//  Get Single User ---------Admin 

router.route("/admin/user/:id")
        .get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
        .put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
        .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)



module.exports = router;

