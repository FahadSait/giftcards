const mongoose = require("mongoose")

const schema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const model= mongoose.model("employee",schema)
module.exports=model