import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CSS/AddToCart.css'

function AddToCart() {

  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);


  const navigate = useNavigate();



  const removeProductFromUserCart = (productId) => {
    fetch(`http://localhost:5000/removetousercart/${productId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result)
      })
  }



  const getUser = async () => {
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
    setCart(UjsonData.cart);

    // const response = await fetch('http://localhost:5000/getcartitems', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ cart }),
    //   }).then(res => res.json())
    //   .then(result => console.log(result))

  }



  const fetchProductDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/getcartitems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setProducts(data);
      // console.log(products)

    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      fetchProductDetails();
    }
  }, [cart]);

//   useEffect(() => {
//     getUser();


//     fetchProductDetails();
//     // fetchProductDetails();
//     // fetch('http://localhost:5000/getcartitems' ,{
//     //    method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ cart }),
//     //   }).then(res => res.json())
//     //   .then(result => console.log(result))

// // check()

//   }, []);


  // const check = () => {
  //   products.map(items => {
  //     console.log(items.price)
  //     // console.log(items.pic)
  //   })
  // }



  return (
    <div className="adt">

      <div className="atc-heaing">
        ArcZone
      </div>

      {/* <p>{products.price}</p> */}


      <div className="cart_main">
        <div className="cart-info">

          



          {products?.map((item, index) => {
            return (
            // You can use the return statement here
              <div className="adt-temp">

                <div className="adt-image">
                  <Link to={`/productpage/${item._id}`}>
                    <img className="adt-img" src={item.pic} alt="" />
                  </Link>
                </div>

                <div className="adt-product-info">
                  <div className="adt-name-desc">
                    <p className="adt-name"> {item.title}</p>
                    <p className="adt-desc"> {item.desc}</p>
                  </div>
                  <div className="adt-price">
                    <p className="adt-pprice"> {item.price} Rs</p>

                  </div>

                </div>


                <div className="adt-buttons">
                  <button className="adt-adtrtc" onClick={() => { removeProductFromUserCart(item._id); window.location.reload() }}>Remove from cart</button>
                  <Link to={`/buynow/${item._id}`}>
                    <button className='adt-buynow'>Buy Now</button>
                  </Link>
                </div>


                <br />

                {/* <p>{item.price}</p> */}
                

              </div>
            );
          })}
        </div>



      </div>

          {/* <div className="adt-open-btn">
            <button className="adt-open-button" onClick={() => { fetchProductDetails() }}>Open cart</button>
          </div> */}

    </div>
  )
}

export default AddToCart