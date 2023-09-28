const express = require("express")
const { isAuthenticatedUser, authorizeroles } = require("../middleware/auth")
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController")
const router = express.Router()

router.route("/order/new").post(isAuthenticatedUser,newOrder)

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder)

router.route("/orders/me").get(isAuthenticatedUser,myOrders)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeroles("admin"),getAllOrders)

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeroles("admin"),updateOrder).delete(isAuthenticatedUser,authorizeroles("admin"),deleteOrder)

module.exports = router 