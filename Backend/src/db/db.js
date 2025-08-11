const mongoose = require('mongoose');
require('dotenv').config(); 

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('connected to MOngoDB');
    })
    .catch((err)=>{
        console.error('Error connecting to MongoDB:', err);
    })
    //here we use our url to connect to the database
    //mere iss url se koi bhi mera database connect kr skta hai
    //databse ki url ek secrative cheese hai aur jo bhi secrative cheeze hoti usse hum ek alag file me rakhte hai (env) file.
}
module.exports = connectDB; // Export the connectDB function for use in other files