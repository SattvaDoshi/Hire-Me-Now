import app from './app.js';
import { config } from 'dotenv';
import cloudinary from 'cloudinary'
import { dbConnection } from './database/dbConnection.js';

config();

const PORT= process.env.PORT || 5000;

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  });


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    dbConnection();
})