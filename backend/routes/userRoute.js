const express = require("express")
const { registerUser, loginuser, logout, forgotPassword, resetPassowrd, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController")
const { isAuthenticatedUser, authorizeroles } = require("../middleware/auth")
const router = express.Router()


router.route("/register").post(registerUser)

router.route("/login").post(loginuser)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassowrd)

router.route("/logout").get(logout)

router.route("/me").get(isAuthenticatedUser,getUserDetails)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/me/update").put(isAuthenticatedUser, updateProfile)

router.route("/admin/users").get(isAuthenticatedUser,authorizeroles("admin"), getAllUser)

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeroles("admin"), getSingleUser).put(isAuthenticatedUser, authorizeroles("admin"), updateUserRole).delete(isAuthenticatedUser, authorizeroles("admin"), deleteUser)



module.exports = router
