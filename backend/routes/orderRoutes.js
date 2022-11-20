const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, deleteOrder, updateOrder } = require('../controllers/orderController');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');



// New order route
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//  Get Single order information 
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

// See My Order ------- User/Admin
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// To see all order ------Admin
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
// To update and Delete order -----Admin
router.route("/admin/order/:id")
        .put(isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
        .delete(isAuthenticatedUser, authorizeRoles("admin"),deleteOrder)




module.exports = router;