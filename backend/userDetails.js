const mongoose=require('mongoose');

const UserDetailSchema=new mongoose.Schema({
    fname:String,
    email:{type:String,unique:true},
    password:String,
},
{
    collection:"userInfo",
}
);

mongoose.model("UserInfo",UserDetailSchema);