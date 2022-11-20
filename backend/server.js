const app = require ('./app');

const cloudinary = require("cloudinary");

const connectDatabase = require("./config/database");

// Handling Uncaught Expection
process.on("uncaughtException" , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Expection Error`);
    process.exit(1);
});



//Config
// All dot.env file should call after CONFIG SETUP
if(process.env.NODE_ENV!=="PRODUCTION"){

    require("dotenv").config({path: "backend/config/config.env"});
}


// Connecting to Database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,


});




const server = app.listen(process.env.PORT, ()=>{

    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


// Unhandled Promise Rejection ---- [suppose there is an error in the "http://" or mistake in database such as "mongo://local....". and for this error we called Unhandled Promise Rejection.  Here is how to solve it]

process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);


    server.close(()=>{
        process.exit(1);

    });


});
