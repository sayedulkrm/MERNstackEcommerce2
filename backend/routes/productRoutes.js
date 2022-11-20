const express = require('express');
const { getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReview, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();


// Get All Products
router.route("/products").get( getAllProducts );

// Get All Products ( Admin )
router.route("/admin/products")
        .get( isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts )

// Added new Products(Admin)
router.route("/admin/product/new")
        .post( isAuthenticatedUser,authorizeRoles("admin"), createProduct );


// Edit product/ Delete product (Admin)
router.route("/admin/product/:id")
        .put( isAuthenticatedUser,authorizeRoles("admin"), updateProduct)
        .delete( isAuthenticatedUser,authorizeRoles("admin"), deleteProduct);
        

// Get Single product
router.route("/product/:id").get(getProductDetails);


// Product Review

router.route("/review").put(isAuthenticatedUser,createProductReview);

//  Product REVIEWS GET AND DELETE
router.route("/reviews")
        .get(getProductReviews)
        .delete(isAuthenticatedUser,deleteProductReview)





module.exports = router


