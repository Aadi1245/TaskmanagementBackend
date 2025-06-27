
const mongoose=require("mongoose");

const userSchema= mongoose.Schema({
    userName:{
        type: String,
        required:[true,"Please add your userName"]
    },
    email:{
        type: String,
        required:[true,"Please add your email"],
        unique:[true,"Email already exists"]
    },
    isAdmin:{
        type: Boolean,
    },
    password:{
        type:String,
        required:[true,"Please add your password"]

    },
    permission:{
        type:[String]
    },
    isAuthorized:{
        type:Boolean
    }
},{
    timestamps:true
});

module.exports=mongoose.model("User",userSchema);
