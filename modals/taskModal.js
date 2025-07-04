const mongoose=require("mongoose");
const taskSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:[true,"Please add the task name"]
    },
    status:{
        type:String,
        required: [true,"Please enter task status"]
    },
    description:{
        type:String,
        required:[true,"Please enter the task description"]
    },
    priority:{
        type:String,
        required:[true,"Please enter the priority"]
    },
    category:{
        type:String,
    }


}
,{
    timestamps:true
})



module.exports=mongoose.model("Task",taskSchema);