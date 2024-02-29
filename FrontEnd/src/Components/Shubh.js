import React from 'react'
import './CSS/Shubh.css'
import { useParams, useNavigate, Link } from 'react-router-dom';

import shubh from './Images/shubh.jpg'

function Shubh() {
    return (
        <div className='Global-center'>
            <div className="person-main">
                <div className="aboutBox1">
                    <h1>ArcZone</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui id enim repellendus, eos quidem hic veniam omnis accusantium modi itaque quibusdam, nostrum sequi accusamus dolorum tenetur magnam ipsum, vel nobis?</p>

                    <Link to={'/'}>
                        <button className='hover-button'>Explore</button>
                    </Link>


                </div>
                <div className="personBox2">
                    <img src={shubh} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Shubh