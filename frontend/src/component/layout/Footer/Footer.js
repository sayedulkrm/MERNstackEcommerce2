import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/appstore.png";
import { FaFacebookSquare,FaLinkedin,FaInstagram } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer" >
            <div className='leftFooter'>
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download our app for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appstore" />
            </div>


            <div className='midFooter'>
                <h1>The Mart</h1>
                <h2>Ecommerce Site</h2>
                <p>We Focus Quality Over Quantity</p>

                <p>Copyright 2024 &copy; <br />
                Made by Sayedul Karim</p>
            
            </div>
            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href='www.facebook.com'><FaFacebookSquare  /></a>
                <a href='www.facebook.com'><FaLinkedin  /></a>            
                <a href='www.facebook.com'><FaInstagram /></a>            
            </div>

        </footer>

    ); 
}

export default Footer