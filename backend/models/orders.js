const mongoose = require("mongoose");
const MERCHANT= mongoose.model("MERCHANT")
const USER = mongoose.model("USER")
const PRODUCT = mongoose.model("PRODUCT")
const {ObjectId} = mongoose.Schema.Types

const orderSchema = new mongoose.Schema({
    userId : {
        type : String,
        require : true
    },
    merchantId : {
        type : String,
        require : true
    },
    productId : {
        type : String,
        require : true
    },
    productName : {
        type : String,
        require : true
    },
    productPrice : {
        type : Number,
        require : true
    },
    productPic : {
        type : String,
        require : true
    },
    merchantName : {
        type : String,
        require : true
    },
    customerName : {
        type : String,
        require : true
    },
    
    userEmail : {
        type : String,
        require : true
    },
    
    userPhone : {
        type : Number,
        require : true
    },
    userAddress : {
        type : String,
        require : true
    }
    

})

mongoose.model("ORDERS" , orderSchema)