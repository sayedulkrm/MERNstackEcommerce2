import React, { Fragment, useState } from 'react';
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import "./Header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../../../action/userAction';
import { useDispatch, useSelector } from 'react-redux';









const UserOption = ({ user }) => {



    const navigate = useNavigate();

    const dispatch = useDispatch();


    const {cartItems} = useSelector((state) => state.cart)

    const [open, setOpen] = useState(false);

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ShoppingCartIcon style={{color:cartItems.length > 0 ? "tomato" : "unset"}} />, name: `Cart(${cartItems.length})`, func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];


    if(user.role==="admin"){
        options.unshift({
            
            icon: <DashboardIcon />, 
            name: "Dashboard", 
            func: dashboard, 
            
            });

            }



    function dashboard() {
        navigate("/admin/dashboard");

    }

    function orders() {
        navigate("/orders");

    }

    function account() {
        navigate("/account");

    }


    function cart() {
        navigate("/cart");

    }

    function logoutUser() {
        dispatch(logout());
        toast.success("Logout Successfully",{
            position:"bottom-center",
            theme:"colored"
        });


    }





    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDail tooltip example"
                onClose={()=> setOpen(false)}
                onOpen={()=> setOpen(true)}
                style={{ zIndex: "11" }}
                className="speedDial"
                open={open}
                direction="down"
                icon={ <img 
                            className="speedDailIcon"
                            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                            alt="Profile"

                
                    /> }
            
            >

                {options.map((item)=> (
                    <SpeedDialAction 
                        key={item.name}
                        icon={ item.icon } 
                        tooltipTitle={item.name} 
                        onClick={item.func}
                        tooltipOpen={window.innerWidth < 600 ? true : false} 
                    />
                ))}

            </SpeedDial>

        </Fragment>
    );
};

export default UserOption;