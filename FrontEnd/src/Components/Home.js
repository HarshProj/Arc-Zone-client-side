import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import './CSS/Home.css'


import { useParams } from 'react-router-dom';


export default function Home() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();




  useEffect(() => {

    const token = localStorage.getItem("jwt");
    if(!token){
      navigate('/signin')
    }


    fetch("http://localhost:5000/allProducts", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
    }).then(res => res.json())
        .then(result => {
            console.log(result)
            setData(result)
        })
        .catch(err => console.log(err))
}, []);




  const check = () => {
    console.log(data)
  }

  


  return (
    <div className='product-page'>
      <div className="product-page-main">
       

        <div className="section1">
         
         <h4>Trade-in-offer.</h4>
          <h2>Super value deals</h2>
          <h1>On all products</h1>
         
          <p>Save more with coupons & up to 70% off!</p>

          <button>Shop Now</button>

        </div>


        <div className="section2">
          <div className="section2Products">
          {
            data.map((posts) => {
              return(

                <div className="allProductCardHome">
                  <Link to={`/productpage/${posts._id}`}> 
                    <img src={posts.pic} alt="" />
                  </Link>
                    <p className='home-product-name'>{posts.title}</p>
                    <p className='home-product-desc'>{posts.desc}</p>
                    <p className='home-product-price'> {posts.price} Rs</p>
                    {/* <p>{posts._id}</p> */}
                    <Link to={`/buynow/${posts._id}`}>
                      <button className='home-product-button button1'>Buy Now</button>
                    </Link>
                </div>
              )
            })
          }
          </div>

          
        </div>

        
        
      </div>
    </div>
  )
}
