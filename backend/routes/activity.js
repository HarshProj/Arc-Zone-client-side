const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require('dotenv').config()
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const USER = mongoose.model("USER");
const MERCHANT = mongoose.model("MERCHANT");
const PRODUCT = mongoose.model("PRODUCT");
const ORDERS = mongoose.model("ORDERS");

const Jwt_secret  = process.env.Jwt_secretw;
const requireLogin = require("../middleWares/requireLogin");

router.get("/allProducts", (req, res) => {
  PRODUCT.find()
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.get("/getproduct/:productid", (req, res) => {
  PRODUCT.findOne({ _id: req.params.productid }).then((product) => {
    // console.log(product)
    return res.json(product);
  });
});

router.get("/getuser", requireLogin, (req, res) => {
  USER.findOne({ _id: req.user._id }).then((user) => {
    return res.json(user);
  });
});

router.get("/getmerchant/:merchantid", (req, res) => {
  MERCHANT.findOne({ _id: req.params.merchantid }).then((merchant) => {
    return res.json(merchant);
  });
});

// router.put("/addtocart/:productId" , requireLogin , (req,res) => {
//     const temp = req.params.productId;

//     USER.findByIdAndUpdate(req.user._id , {

//             $push : {cart : req.params.productId}

//     })
//     .then( usr => {
//         console.log(usr.cart)
//         return res.json(usr)
//     })

// })

router.put("/addtocart/:productid", requireLogin, (req, res) => {
  PRODUCT.findByIdAndUpdate(
    req.params.productid,
    {
      $push: { cart: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/addtousercart/:productid", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $push: { cart: req.params.productid },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

router.put("/removetocart/:productid", requireLogin, (req, res) => {
  PRODUCT.findByIdAndUpdate(
    req.params.productid,
    {
      $pull: { cart: req.user._id },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});
router.put("/removetousercart/:productid", requireLogin, (req, res) => {
  USER.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { cart: req.params.productid },
    },
    {
      new: true,
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      return res.status(422).json({ error: err });
    });
});

// router.put("/addtocart/:productid" , requireLogin , (req , res) => {
//    return res.json(req.paramsproductid)
// })

router.post("/orders", requireLogin, (req, res) => {
  const {
    productId,
    merchantId,
    userId,
    productName,
    productPrice,
    productPic,
    merchantName,
    userName,
    userEmail,
    userPhone,
    userAddress,
  } = req.body;

  const order = new ORDERS({
    productId,
    merchantId,
    userId,
    productName,
    productPrice,
    productPic,
    merchantName,
    userName,
    userEmail,
    userPhone,
    userAddress,
  });

  order
    .save()
    .then((order) => {
      res.json({ message: "Order Registered" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.put("/customerorder/:merchantId" ,async (req , res) => {
//     const mid = req.params.merchantId
//     const updatedData = req.body;

//     try{
//         const updateMerchantBag = await MERCHANT.findByIdAndUpdate(mid , updatedData , {new : true});
//         res.json(updateMerchantBag);
//     }catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

// })

router.put("/customerorder/:merchantId", async (req, res) => {
  const mid = req.params.merchantId;
  const updatedData = req.body;

  try {
    const mercant = await MERCHANT.findById(mid);
    if (!mercant) {
      return res.status(404).json({ error: "Merchant not found" });
    }
    console.log(updatedData);
    mercant.order.push(updatedData);

    await mercant.save();
    console.log("updated");

    return res.json({
      message: "Document updated successfully",
      updatedDocument: mercant,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/getcartitems", async (req, res) => {
//   try {
//     let productIds = req.body; //----------------->it's an object type
    
//     const validIds = productIds.map(id => mongoose.Types.ObjectId(id));

//     console.log(typeof(productIds))
//     console.log(productIds)
//     PRODUCT.find({ _id: { $in: validIds }}, (err, products) => {
//       if (err) {
//           console.error(err);
//           // Handle error
//       } else {
//           console.log(products);
//           // return res.json(products)
          
//           // Do something with the products
//       }
//   });
  
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


router.post("/getcartitems", async (req, res) => {
  try {
    // Assuming productIds is an object containing an array under the key "ids"
    let productIds = req.body.cart;
    let ids = productIds.cart

    const products = await PRODUCT.find({ _id: { $in: productIds } });

    console.log(products);
    return res.json(products)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
