const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const errorHandler = require("./middleware/errorHandler");
const connectDb =require("./config/dbConnection");
const cors = require("cors");

connectDb();
const app = express();
const port =process.env.PORT||5000;
app.use(cors())
app.use(express.json());
app.use(errorHandler);
app.use("/api/tasks",require("./routes/taskRoutes.js"));
app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// console.log("Server is starting...");