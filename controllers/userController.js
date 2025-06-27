const asyncHandler = require("express-async-handler");
const User = require("../modals/userModel.js");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc register user
// @route post /user/register
// @access Public

const userRegister = asyncHandler(async (req, res) => {
    let { userName, email,isAdmin=false ,password,isAuthorized=false } = req.body;
    console.log("user body :", req.body);
    if (!userName || !email  || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

   if(isAdmin){
    isAuthorized=true;
   }

   

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    }

    // Hash password
    const hashedPassword = await bcript.hash(password, 10);
    console.log("Hashed password is :", hashedPassword);

    const user = await User.create({
        userName,
        email,
        isAdmin,
        password: hashedPassword,
        isAuthorized
    });

    if (user) {
        res.json({
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid!");
    }

    // return res.json({ message: "User registered successfully!" });
});

//@desc login user
// @route post /user/login
// @access Public

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log("user body :", req.body);
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    console.log("------------The user is :", email, password);

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("User not found! Please register first.");
    }
    console.log("The user is :", user);
    console.log("The user password is :", password, user.password);
    const isValidPassword = await bcript.compare(password, user.password);

    if(!user.isAuthorized){
        res.status(401);
        throw new Error("Registration pending approval. Please wait for confirmation.");
    }


    if (user && isValidPassword) {
        console.log("The user password is :", process.env.ACCESS_TOKEN_SECRET);

        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user._id
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "12h"
            });
        console.log("The 2 user is :", accessToken);

        res.status(200).json({
            accessToken,
             user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
            isAuthorized: user.isAuthorized,
            isAdmin:user.isAdmin
        }
        });
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }

    // res.json({ message: "User Login successfully!" });
});


// const updateUser = asyncHandler(async (req, res) => {
//     const details = req.body;

//     // Ensure the user is authenticated and attached to req.user (via middleware)
//     const user = await User.findById(req.user.id);

//     if (!user) {
//         res.status(404);
//         throw new Error("User not found");
//     }

//     // Update fields if provided
//     // if (userName) user.userName = userName;
//     // if (email) user.email = email;

//     // If user wants to update password
//     if (details?.password) {
//         const salt = await bcript.genSalt(10);
//         details?.password = await bcript.hash(password, salt);
//     }

//     // const updatedUser = await user.save();
//     User.findOne({id}, details, {new: true});

//     res.status(200).json({
//         id: updatedUser._id,
//         userName: updatedUser.userName,
//         email: updatedUser.email,
//     });
// });


const updateUser = asyncHandler(async (req, res) => {
  const updates = req.body;

  // Ensure the user is authenticated and attached to req.user (via auth middleware)
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update fields if provided
  if (updates.userName) user.userName = updates.userName;
  if (updates.email) user.email = updates.email;
  if (typeof updates.isAdmin !== "undefined") user.isAdmin = updates.isAdmin;
  if (typeof updates.isAuthorized !== "undefined") user.isAuthorized = updates.isAuthorized;

  // If user wants to update password
  if (updates.password) {
    const salt = await bcript.genSalt(10);
    user.password = await bcript.hash(updates.password, salt);
  }

  // Save updated user
  const updatedUser = await user.save();

  res.status(200).json({
    id: updatedUser._id,
    userName: updatedUser.userName,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    isAuthorized: updatedUser.isAuthorized
  });
});

// const updateUser = asyncHandler(async (req, res) => {
//   const updates = { ...req.body };

//   // If password is being updated, hash it first
//   if (updates.password) {
//     const salt = await bcrypt.genSalt(10);
//     updates.password = await bcrypt.hash(updates.password, salt);
//   }

//   const updatedUser = await User.updateOne(
//     {_id:req.user.id},
//     updates,{
//         new:true
//     }
//   );

//   if (!updatedUser) {
//     res.status(404);
//     throw new Error("User not found");
//   }
//   console.log(`updated user is ==>> ${updatedUser._id}`)
//   res.status(200).json({
//      id: updatedUser._id,
//     userName: updatedUser.userName,
//     email: updatedUser.email,
//     isAdmin: updatedUser.isAdmin,
//     isAuthorized: updatedUser.isAuthorized
//   });

// });



const getUnauthorizedUsers = asyncHandler(async (req, res) => {
    const filter=req.body;
    console.log('-------get contact called----');
    const users = await User.find(filter);
    console.log("The Tasks are :", users);
    res.status(200).json(users);
});



module.exports = { userRegister, userLogin, updateUser,getUnauthorizedUsers };