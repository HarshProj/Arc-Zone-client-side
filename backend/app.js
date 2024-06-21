const express = require("express")
const cors = require("cors")
const path = require('path')
require('dotenv').config()
const app = express();
const port = process.env.PORT;

app.use(cors()) 
require('./models/user')
require('./models/merchant')
require('./models/products')
require('./models/orders')
require('./models/customerOrders')

app.use(express.json()) 
app.use(require("./routes/auth"))
app.use(require('./routes/activity'))

const mongoose = require("mongoose");
const mongoUrl = process.env.mongo_url;
//serving the frontEnd
app.use(express.static(path.join(__dirname , "./frontend/build")))

app.get("*"  ,(req,res)=> {
    res.sendFile(
        path.join(__dirname , "./frontend/build/index.html"),

        function(err){
            res.status(500).send(err)
        }
    )
})
app.listen(port , () => {
    console.log("Server is ruuning on " + port)
})

// ----------------------------------------------------------------------


mongoose.connect(mongoUrl);

mongoose.connection.on("connected" , () => {
    console.log("Connected to MongoDB")
})

mongoose.connection.on("error" , () => {
    console.log("Not Connected to mongDB")
}) 




// app.get('/' , (req,res)=> {
//     console.log("Hello")
//     res.json("Hello shubh")

// })