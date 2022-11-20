import { Avatar, Typography } from '@mui/material';
import React from 'react';
import "./About.css";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import myImage from "../../../images/mp.jpg"



const About = () => {
    
        return (
            <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>
        
                <div>
                <div>
                    <Avatar
                    style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                    src={myImage}
                    alt="Founder"
                    />
                    <Typography> <h3> <b> Sayedul Karim </b> </h3></Typography><br />
                    
                    <span>
                    This is a Demo Ecommerce wesbite made by Sayedul Karim. <br />
                    I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices. My objective is simply to be the best web developer that I can be and to contribute to the technology industry all that I know and can do. <br /> <br />
                    <b>MERN STACK E-Commerce Website</b>
                    </span>
                </div>
                <div className="aboutSectionContainer2">
                    <Typography component="h2">Our Brands</Typography>
                    <a
                    href="https://www.youtube.com/"
                    target="blank"
                    >
                    <YouTubeIcon className="youtubeSvgIcon" />
                    </a>
        
                    <a href="https://instagram.com/" target="blank">
                    <InstagramIcon className="instagramSvgIcon" />
                    </a>
                </div>
                </div>
            </div>
            </div>
        );

        };

    

export default About