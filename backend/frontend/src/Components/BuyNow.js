import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import './CSS/BuyNow.css'

function BuyNow() {
  const { productid } = useParams();
  const [product, setProduct] = useState([]);
  const [merchant, setMerchant] = useState([]);
  const [user, setUser] = useState([]);
  const [mId, setMId] = useState("");
  const merchantId = mId;

  let [count, setCount] = useState(0);

  let [size, setSize] = useState('');

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const [values, setValues] = useState({
    productId: "",
    merchantId: "",
    userId: "",
    productName: "",
    productPrice: "",
    productpic: "",
    merchantName: "",
    customerName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    quantity : "",
    size : "",
  });


  const [temp, setTemp] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const navigate = useNavigate();

  // const mId = product.postedBy

  useEffect(() => {
    const getproduct = async () => {
      const response1 = await fetch(
        `http://localhost:5000/getproduct/${productid}`
      );
      if (!response1.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response1.json();



      const response2 = await fetch("http://localhost:5000/getuser", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      if (!response2.ok) {
        throw new Error("Network response was not ok");
      }

      const UjsonData = await response2.json();
      setUser(UjsonData)



      // console.log(UjsonData);
      setProduct(jsonData);
      setMId(jsonData.postedBy);

      fetch(`http://localhost:5000/getmerchant/${jsonData.postedBy}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setMerchant(result);
          console.log(result)

            setValues({
              productId: jsonData._id,
              merchantId: result._id,
              productName: jsonData.title,
              productPrice: jsonData.price,
              productpic: jsonData.pic,
              merchantName: result.name,
              userId: UjsonData._id,
              customerName: UjsonData.name,
              userEmail: UjsonData.email,
              userPhone: UjsonData.phone,
              userAddress: UjsonData.address,
            })
          
        });


    };

    getproduct();
  }, []);



  const verify = () => {
    console.log(values.count);
  };



  const updateItem = async () => {
    try {

      if (size == ''){
        notifyB("Plaese select your size")
      }else if(count == 0){
        notifyB("Plaese select Quantity")
      }else{
        const updatedValues = {
          ...values,
          quantity: count,
          size: size
        };
        const response = await fetch(
          `http://localhost:5000/customerorder/${merchantId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedValues),
          }
        );
  
        const updatedItem = await response.json();
        console.log(values.size)
        console.log(values.quantity)

        notifyB("Order Registered");
        // console.log(updatedItem);
        navigate('/')
        
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const registerOrder = () => {
    fetch("http://localhost:5000/orders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        userId: user._id,
        merchantId: merchant._id,
        productId: product._id,

        productName: product.title,
        productPrice: product.price,
        productPic: product.pic,

        merchantName: merchant.name,

        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        userAddress: user.address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/");
        }

        console.log(data);
      });
  };






  function incrementCount() {
    setCount(prevCount => prevCount + 1);
  }

  function decrementCount() {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  }
  return (
    <div>

      <div class="card">
        <div class="left">
          <img src={product.pic} alt="" />
          <i class="fa fa-long-arrow-left"></i>
          <i class="fa fa-long-arrow-right"></i>
        </div>
        <div class="right">
          <div class="product-info">
            <div class="product-name">
              <h1>ArcZone</h1>
              <i class="fa fa-search"></i>
              <i class="fa fa-user"></i>
              <i class="fa fa-shopping-cart"></i>
            </div>
            <div class="details">
              <h3>Winter Collection</h3>
              <h2>{product.title}</h2>

              <h5>{product.desc}</h5>
              <br />

              <h4><span class="fa fa-dollar"></span>Rs {product.price} </h4>
            </div>




            <h4 className="buynow-count"><span class="fa fa-dollar"></span>{count} </h4>
            <button className="buynow-button-plus" onClick={incrementCount}>+</button>
            <button className="buynow-button-minus" onClick={decrementCount}>-</button>
            {/* <ul>
              <li>SIZE</li>
              <li class="bg">7</li>
              <li class="bg">8</li>
              <li class="bg">9</li>
              <li class="bg">10</li>
              <li class="bg">11</li>
            </ul> */}

            <ul className="buynow-ul-tags">
              <li><label><input type="radio" name="size" value="7" onChange={handleSizeChange} /><span className="bg">XS</span></label></li>
              <li><label><input type="radio" name="size" value="8" onChange={handleSizeChange} /><span className="bg">S</span></label></li>
              <li><label><input type="radio" name="size" value="9" onChange={handleSizeChange} /><span className="bg">L</span></label></li>
              <li><label><input type="radio" name="size" value="10" onChange={handleSizeChange} /><span className="bg">XL</span></label></li>
              <li><label><input type="radio" name="size" value="11" onChange={handleSizeChange} /><span className="bg">XXl</span></label></li>
              <li><label><input type="radio" name="size" value="11" onChange={handleSizeChange} /><span className="bg">customized</span></label></li>
            </ul>


            {/* <h4 className="buynow-count"><span class="fa fa-dollar"></span>Selected Size: {size} </h4> */}
            {/* <h4 className="buynow-count"><span class="fa fa-dollar"></span>Selected Quantity: {count} </h4> */}

            <span onClick={() => { updateItem() }} class="foot"><i class="fa fa-shopping-bag" ></i>Buy Now</span>
            {/* <span onClick={() => { verify() }} class="foot"><i class="fa fa-shopping-bag" ></i> Verify</span> */}
          </div>
        </div>
      </div>














    </div>
  );
}

export default BuyNow;
