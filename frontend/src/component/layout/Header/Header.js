import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { BsSearch,BsFillBagFill,BsPersonCircle } from 'react-icons/bs';

    const options = {
            burgerColorHover: "#028C6A",
            logo,
            logoWidth: "20vmax",
            navColor1: "#D1EDE1",
            logoHoverSize: "10px",
            logoHoverColor: "none",
            link1Text: "Home",
            link2Text: "Products",
            link3Text: "Contact",
            link4Text: "About",
            link1Url: "/",
            link2Url: "/products",
            link3Url: "/contact",
            link4Url: "/about",
            link1Size: "1.3vmax",
            link1Color: "#7BC5AE",
            nav1justifyContent: "flex-end",
            nav2justifyContent: "flex-end",
            nav3justifyContent: "flex-start",
            nav4justifyContent: "flex-start",
            link1ColorHover: "#028C6A",
            link1Margin: "3vmax",
            profileIcon: true,
            ProfileIconElement: BsPersonCircle,
            profileIconUrl: "/login",
            profileIconColor: "#7BC5AE",
            searchIconColor: "#7BC5AE",
            cartIconColor: "#7BC5AE",
            profileIconColorHover: "#028C6A",
            searchIcon:true,
            SearchIconElement: BsSearch,
            searchIconColorHover: "#028C6A",
            searchIconUrl: "/search",
            cartIconColorHover: "#028C6A",
            cartIconMargin: "2vmax",
            cartIcon: true,
            cartIconUrl: "/cart",
            
            CartIconElement: BsFillBagFill
            
        };

const Header = () => {
    return (
    
        <ReactNavbar {...options}  />    
    
    )
};

export default Header;