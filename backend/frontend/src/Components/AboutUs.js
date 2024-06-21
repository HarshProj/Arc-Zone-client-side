import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CSS/AboutUs.css'
import photo from './Images/hero4.png'
import kuldeep from './Images/kuldeep.jpg'
import shubh from './Images/shubh.jpg'
import harsh from './Images/harsh.jpg'
import mkop from './Images/maheep.jpg'

function AboutUs() {
    return (
        <div className='Global-center'>
            <div className="about-bg">
            </div>
            <div className="about-main">
                <div className="aboutBox1">
                    <h1>ArcZone</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui id enim repellendus, eos quidem hic veniam omnis accusantium modi itaque quibusdam, nostrum sequi accusamus dolorum tenetur magnam ipsum, vel nobis?</p>

                    <Link to={'/'}>
                        <button className='hover-button'>Explore</button>
                    </Link>

                </div>
                <div className="aboutBox2">

                    <div className="about-photo">

                        <div className="Arow1">
                            <div className="Aphoto1">
                                <Link to={'/shubh'}>
                                    <img className='img-aphoto-hover' src={shubh} alt="" />
                                </Link>
                            </div>
                            <div className="Aphoto1">
                                <Link to={'/harsh'}>
                                    <img className='img-aphoto-hover' src={harsh} alt="" />
                                </Link>

                            </div>
                        </div>



                        <div className="Arow2">
                            <div className="Aphoto1">
                                <Link to={'/mkop'}>
                                    <img className='img-aphoto-hover' src={mkop} alt="" />
                                </Link>

                            </div>
                            <div className="Aphoto1">
                                <Link to={'/kuldeep'}>
                                    <img className='img-aphoto-hover' src={kuldeep} alt="" />
                                </Link>

                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs