const ErrorHander = require('../utils/errorHander');
const catchAsyncError =  require ('../middleware/catchAsyncError');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
const cloudinary = require("cloudinary")








// Register a user
exports.registerUser = catchAsyncError( async(req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    })



    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });


    sendToken(user,201,res);


});



// Login User
exports.loginUser = catchAsyncError(async(req, res, next)=>{



    const { email,password } = req.body;

    // Cheacking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHander("Please enter Email & Password", 400))
    }


    const user = await User.findOne({email}).select("+password");


    if(!user){
        return next(new ErrorHander("Invalid email and password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email and password", 401));
    }

    sendToken(user,200,res);


});



// Logout User
exports.logout = catchAsyncError(async(req,res,next )=> {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true,
    });


    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
});



// Forgot Password
exports.forgotPassword = catchAsyncError(async(req,res,next) => {


    const user = await User.findOne({email:req.body.email});

    if(!user) {
        return next( new ErrorHander("User not found",404));
    }

    // Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your Password Rest TOKEN is :-\n\n ${resetPasswordUrl} \n\n if you have not requested this email then, please ignore it`;

    try {
        

        await sendEmail({
            email: user.email,
            // In subject, insted of using "Ecommerce" you can add your Platfrom name. for example: The Basket, The Mart etc....
            subject: `The Mart Password Recovery`,
            message,

        });

        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;


    await user.save({validateBeforeSave:false});

    return next( new ErrorHander(error.message, 500));


    }

});



// Reset Password
exports.resetPassword = catchAsyncError(async (req,res,next) => {


    // Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now() },
    });

    if(!user) {
        return next( new ErrorHander("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next( new ErrorHander("Password does not Match",400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    sendToken(user,200,res);



});




// Get User Details
exports.getUserDetails = catchAsyncError( async(req, res, next) => {


    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });

});



// Update User Password
exports.updatePassword = catchAsyncError( async(req, res, next) => {


    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect", 400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("Password does not match", 400));
    }


    user.password = req.body.newPassword

    await user.save()


    sendToken(user,200,res);

});



// Update User Profile
exports.updateProfile = catchAsyncError( async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,

    }

    // We will add cloudinary later


    if(req.body.avatar !== "") {
        const user = await User.findById(req.user.id);


        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });


        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }


    }





    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify: false,
    });


    res.status(200).json({
        success:true
    });


});



// Get All User ---- FOR ADMIN ONLY
exports.getAllUser = catchAsyncError( async(req,res,next) => {

    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});



// Get Single User ---- FOR ADMIN ONLY
exports.getSingleUser = catchAsyncError( async(req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHander(`User does not exits with id: ${req.params.id}`));
    }

    res.status(200).json({
        success: true,
        user,
    });
});


// Update User Role ----- FOR ADMIN ONLY
exports.updateUserRole = catchAsyncError( async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role

    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators:true,
        useFindAndModify: false,
    });

    // let user = User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400))
    }


    res.status(200).json({
        success:true
    });


});



// Delete User  ----- FOR ADMIN ONLY
exports.deleteUser = catchAsyncError( async(req, res, next) => {

    const user = await User.findById(req.params.id);

    
    
    // We will remove cloudinary later
    
    if (!user) {
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400))
    }


    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);


    await user.remove();

    res.status(200).json({
        success:true,
        message: "User deleted Successfully"
    });


});