const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types


const userSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    userName:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    address:{
        type: String,
        require:true
    },
    phone:{
        type: Number,
        require:true
    },

    //add IP
    ip:{
        type: String,
        require:true
    },
    cart : [{
        type : ObjectId , 
        ref:"PRODUCT"
    }]

})

mongoose.model("USER" , userSchema)