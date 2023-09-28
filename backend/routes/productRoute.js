const express = require("express")
const { getAllProduct, createProduct,updateProduct, deleteProdcut, getProductDetails, createProductReview,getProductReview, deleteProdcutreview,getAdminProducts } = require("../controllers/productController")
const router = express.Router()
const {isAuthenticatedUser, authorizeroles} = require('../middleware/auth')


router.route("/admin/products/new").post(isAuthenticatedUser,authorizeroles("admin"),createProduct)
router.route("/products").get(getAllProduct)
router.route("/admin/products").get(isAuthenticatedUser, authorizeroles("admin"), getAdminProducts);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeroles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeroles("admin"),deleteProdcut)
router.route("/products/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser, deleteProdcutreview)

module.exports = router