import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';


import './CSS/Navbar.css'

import { LoginContext } from "../context/LoginContext";

export default function Navbar({ login }) {

    const { setModalOpen } = useContext(LoginContext)

    const navigate = useNavigate();

    const loginStatus = () => {
        const token = localStorage.getItem("jwt");
        if (login || token) {
            return [
                <>
                    <Link className="nav-hower" to="/aboutus">
                        <li>About</li>
                    </Link>
                    {/* <Link className="nav-hower" to="/contactus">
                        <li>Contact Us</li>
                    </Link> */}

                    <Link className="nav-hower" to="/addtocart">
                        <span class="material-symbols-outlined">
                            shopping_bag
                        </span>
                    </Link>
                    <Link className="nav-hower" to="">
                        <span onClick={() => {setModalOpen(true)}} class="material-symbols-outlined">
                            logout
                        </span>
                    </Link>

                    {/* <button onClick={() => {setModalOpen(true)}}>Logout</button> */}
                </>,
            ];
        } else {
            return [
                <>
                    <Link className="nav-hower" to="/signup">
                        <li className="">signup</li>
                    </Link>
                    <Link className="nav-hower" to="/signin">
                        <li  className="">signin</li>
                    </Link>
                </>,
            ];
        }
    };
    return (
        <div className='navbar'>
            {/* <h1>Navbar</h1> */}

            <Link to={'/'} style={{cursor:"pointer"}}>
                {/* <img className="nav-logo" src={tweeterLogo} alt="" /> */}
                <h1 className="nav-logo-main">ArcZone</h1>
            </Link>
            <ul className="nav-menu">
                
                    {loginStatus()}

                    
                  
                    
            
            </ul>
        </div>
    )
}
