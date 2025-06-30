const express=require("express");
const {userRegister,userLogin, updateUser,getUnauthorizedUsers}=require("../controllers/userController");
const router=express.Router();

const validatToken = require("../middleware/validatToken");

router.post("/register",userRegister);

router.post("/login",userLogin);

router.put("/:id",validatToken, updateUser);

router.post("/unAuthorizedUser",getUnauthorizedUsers);

module.exports=router;