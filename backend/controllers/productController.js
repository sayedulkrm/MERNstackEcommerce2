const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorHander');
const catchAsyncError =  require ('../middleware/catchAsyncError');
const ApiFeatures = require('../utils/apifeatures');
const cloudinary = require("cloudinary");







// Create Product --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    let images = [];

    if(typeof req.body.images === "string") {
        images.push(req.body.images);

    }else {

        images = req.body.images;

    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder: "products",
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    

    res.status(201).json({
        success: true,
        product
    });

}
);





//  Get All Product
exports.getAllProducts = catchAsyncError( async(req, res,next) => {

    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()


    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);




    products = await apiFeature.query.clone();
    
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });

});




//  Get All Product ( ADMIN )
exports.getAdminProducts = catchAsyncError( async(req, res,next) => {

    const products = await Product.find()
    
    res.status(200).json({
        success: true,
        products,

    });

});




// Update Product --Admin
exports.updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found", 404))
    }

    // Images Start Here

    let images = [];

    if(typeof req.body.images === "string") {
        images.push(req.body.images);

    }else {

        images = req.body.images;

    }

    if(images !== undefined) {
    
        // Deleting images from Cloudinary
        for (let i = 0; i < product.images.length; i++) {
            
            await cloudinary.v2.uploader.destroy(product.images[i].public_id); 
            
        }


        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i],{
                folder: "products",
            });
    
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
            
        }

        req.body.images = imagesLinks;



    }



    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    })

}
)




// Get single product Details
exports.getProductDetails = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product,
        
    });


    
}
);




// Delete Product --Admin
exports.deleteProduct = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found", 404))
    }

    // Deleting images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {
        
        await cloudinary.v2.uploader.destroy(product.images[i].public_id); 
        
    }

    await product.remove();
    
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });

});




// Create new Reveiw or update the review
exports.createProductReview = catchAsyncError( async(req,res,next) => {


    const {rating, comment, productId} = req.body;

    const review = {

        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };


    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

    if(isReviewed){

        product.reviews.forEach( rev => {
            
            if( rev.user.toString() === req.user._id.toString())
            (rev.rating = rating),
            (rev.comment = comment);
        });

    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }


    // Avg Product rating.
    // let 4 person reviewd the product. Like 4,5,5,2 = 16. Now 16/4(person/reviewed person number) = 4 . So the Review is 4 Star. 

    let avg=0;

    product.reviews.forEach( rev => {
        avg+=rev.rating
    }) 
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });


    res.status(200).json({
        success:true,
    });

});




// See All Reviews || Get All Reviews of a single product
exports.getProductReviews = catchAsyncError(async(req,res,next) => {

    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }


    res.status(200).json({
        success:true,
        reviews: product.reviews
    });

});



// Delete Review
exports.deleteProductReview = catchAsyncError(async( req,res,next ) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next( new ErrorHander("Product not found",404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString()); 

    let avg = 0;

    reviews.forEach( (rev) => {
        avg += rev.rating;
    }); 
    

    let ratings = 0;

    if(reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }



    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews
    },{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    }
    );


    res.status(200).json({
        success:true
    });

});