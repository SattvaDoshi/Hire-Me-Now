import mongoose from "mongoose";

export const dbConnection = async() => {
  mongoose.set('strictQuery',true)
 
await mongoose.connect(process.env.MONGO_URI)
.then((conn) => {console.log(`Database connected: ${conn.connection.host}`);})
.catch((err) => {console.log(`Error in connected db: ${err.message}`);})
};

