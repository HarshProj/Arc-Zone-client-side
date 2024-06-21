import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CSS/ProductFile.css'
import photo from './Images/hero4.png'

function ProductFile() {

  const { productid } = useParams();
  const [pic, setPic] = useState([]);
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const isUserInCart = pic && pic.cart && pic.cart.includes(JSON.parse(localStorage.getItem("user"))._id);
  const isProductInCart = user && user.cart && user.cart.includes(productid);

  useEffect(() => {
    fetch(`/getproduct/${productid}`, {
      headers: {

        "Content-Type": "application/json"
      },
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result.price)
        // setTitle(result.title)
        // setDesc(result.desc)
        // setPrice(result.price)
        setPic(result)
        // console.log(result)
      })

    fetch("http://localhost:5000/getuser", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
    }).then(res => res.json())
      .then(result => {
        setUser(result)
      })
  }, []);





  const check = () => {
    console.log(product)
  }



  // const addToCart = () => {
  //   fetch(`http://localhost:5000/addtocart/${productid}`, {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt")
  //     }
  //   })
  //     .then(res => res.json())
  //     .then((result) => {
  //       console.log(result)
  //     })

  // }
  const addToUserCart = () => {
    fetch(`http://localhost:5000/addtousercart/${productid}`, {
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




  // const removeToCart = () => {
  //   fetch(`http://localhost:5000/removetocart/${productid}`, {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt")
  //     }
  //   })
  //     .then(res => res.json())
  //     .then((result) => {
  //       console.log(result)
  //     })
  // }

  const removeToUserCart = () => {
    fetch(`http://localhost:5000/removetousercart/${productid}`, {
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



  return (
    <div className='Product-page-parent'>
      <div className="product-main-page">
        <div className="product-box2">


          <div className="product-photo">
            <img src={pic.pic} alt="" />
          </div>
        </div>






        <div className="product-box1">
          <div className="product-box1-details">

            <h1>ArcZone</h1>
            <br />
            <h1 className='season'>Winter Colloetion</h1>
            
            <h1 className='product-name'>{pic.title}</h1>
            <br />
            <h1 className='product-price'><span className='price-span'>Rs</span> {pic.price}</h1>
            <br />
            <h1 className='product-desc'>{pic.desc}</h1>
            <br />


            <div className="product-button">
            {isProductInCart ? (
              // <button className='product-btn1' onClick={() => { removeToUserCart(); window.location.reload() }}>Remove from cart</button>
              <span onClick={() => { removeToUserCart(); window.location.reload() }} class="product-foot"><i></i>Remove from cart</span>
            ) : (
              // <button className='product-btn1' onClick={() => { addToUserCart(); window.location.reload() }}>Add to cart</button>
              <span onClick={() => { addToUserCart(); window.location.reload() }} class="product-foot"><i></i>Add to cart</span>
              
            )}

            <Link to={`/buynow/${productid}`}>
              {/* <button className='p-btn1' >Buy Now</button> */}
              <span class="product-foot"><i class="fa fa-shopping-bag" ></i>Buy Now</span>
            </Link>
            </div>

            
          </div>
        </div>
      </div>
    </div>




  )
}

export default ProductFile




// <div className="product-temp">
//               <div className="product-buttons">
//                 <Link to={`/buynow/${productid}`}>
//                   <button className='p-btn1' >Buy Now</button>
//                 </Link>

//                 {/* <p>{user.name}</p> */}

// {
//   isProductInCart ? (
//     <button className='p-btn2' onClick={() => { removeToUserCart(); window.location.reload() }}>Remove from cart</button>
//   ) : (
//     <button className='p-btn2' onClick={() => { addToUserCart(); window.location.reload() }}>Add to cart</button>
//   )
// }

//               </div>
//             </div>