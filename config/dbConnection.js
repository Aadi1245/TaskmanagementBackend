const mongoose= require("mongoose");

const connectDb =async()=>{
try{
const connect=await mongoose.connect(process.env.CONNECTION_STRING, );
console.log(`MongoDB connected: ${connect.connection.host}    ${connect.connection.name}`);
  // You can also log the connection string if needed
  // console.log(`Connection String: ${process.env.CONNECTION_STRING}`);
  
  // Optionally, you can return the connection object
  return connect;
}catch(error){
    console.error(`Error connecting to the database: ${error}`);
    process.exit(1); // Exit the process with failure
  }
}

module.exports=connectDb;