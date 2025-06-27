const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, getTask } = require("../controllers/taskController");
const validatToken = require("../middleware/validatToken");



console.log("Contact routes loaded------->>");

router.use(validatToken); // Apply token validation middleware to all routes in this file
router.route("/").get(getTasks).post(createTask);

router.route("/:id").put(updateTask).delete(deleteTask).get(getTask);


module.exports = router;

