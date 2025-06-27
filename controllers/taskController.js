const asyncHandler = require("express-async-handler");
const Task = require("../modals/taskModal.js")
//@desc get all contacts
// @route GET /api/contacts
// @access Private

// const { param } = require("../routes/contactRoutes");

const getTasks = asyncHandler(async (req, res) => {
    console.log('-------get contact called----');
    const tasks = await Task.find({user:req.user.id});
    console.log("The Tasks are :", tasks);
    res.status(200).json(tasks);
});


//@desc Create contact
// @route Post /api/contacts/:id
// @access Private

const createTask = asyncHandler(async (req, res) => {
    console.log("The request body :", req.body);
    const { title, status, description,priority,category} = req.body;
    if (!title || !status || !description||!priority) {
        console.log("All fields are available :", title, status, description,priority,category);
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    console.log("The contact before creating is :", title, status, description,priority,category,req.user.id);
    const task = await Task.create({
        title,
        status,
        description,
        priority,
        category,
        user: req.user.id
    });

    console.log("The contact created is :", task);

    res.status(201).json(task);
});

//@desc Update contact
// @route PUT /api/contacts
// @access Private

const updateTask = asyncHandler(async (req, res) => {
      const tasks=await Task.findById(req.params.id);
    if(!tasks){
        res.status(404);
        throw new Error("Contact not found !");
    }
    if(tasks.user.toString()!==req.user.id){
        res.status(403);
        throw new Error("User not authorized to update this contact !");
    }
    const updateTask= await Task.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
    });

    res.status(200).json(updateTask);
});

//@desc Create contact
// @route Delete /api/contacts
// @access Private

const deleteTask = asyncHandler(async (req, res) => {
     const tasks=await Task.findById(req.params.id);
    if(!tasks){
        res.status(404);
        throw new Error("Contact not found !");
    }
    if(tasks.user.toString()!==req.user.id){
        res.status(403);
        throw new Error("User not authorized to delete this contact !");
    }
    const deletedTask= await Task.findByIdAndDelete(req.params.id);
    if(!deletedTask){
        res.status(400);
        throw new Error("Contact not found !");
    }
    res.status(200).json(deletedTask);
});

//@desc Create contact
// @route GET /api/contacts/:id
// @access Private

const getTask = asyncHandler(async (req, res) => {
    const tasks=await Task.findById(req.params.id);
    if(!tasks){
        res.status(404);
        throw Error("Contact not found !");
    }
    res.status(200).json(tasks);
});

module.exports = { getTasks, createTask, updateTask, deleteTask, getTask };