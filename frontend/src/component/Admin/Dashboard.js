import React, { useEffect } from 'react';
import Slidebar from "./Slidebar.js";
import "./Dashboard.css";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {Chart as ChartJS} from 'chart.js/auto';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProduct } from '../../action/productAction.js';
import { getAllOrders } from '../../action/orderAction.js';
import { getAllUsers } from '../../action/userAction.js';




const Dashboard = () => {


    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const {  orders } = useSelector((state) => state.allOrders);

    const {users} = useSelector(state => state.allUsers)


    let outOfStock = 0;

    products && products.forEach((item) => {
        if(item.Stock === 0) {
            outOfStock +=1
        }
    });

    useEffect(() => {

        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers())

    }, [ dispatch ]);


    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });




    const lineState = {
        labels: ["Initial Amount", "Amount Earned" ],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["crimson"],
                data: [ 0, totalAmount],

            },

        ],


    };

    const doughnutState = {
        labels: ["Out Of Stock", "InStock"],

        datasets: [
            {
                backgroundColor: ["red","green"],
                hoverBackgroundColor: ["darkred","darkgreen"],
                data: [outOfStock, products.length - outOfStock]
            },
        ],

    };






    return (
        <div className='dashboard'>
            
            <Slidebar />


            <div className='dashboardContainer' >

                <Typography component="h1" >Dashboard</Typography>

                <div className="dashboardSummary">

                    <div>
                        <p>
                            Total Amount <br /> ${totalAmount}
                        </p>
                    </div>

                    <div className="dashboardSummaryBox2">


                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>


                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>


                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>

                    </div>
                </div>


                <div className="lineChart">
                    <Line
                        data={lineState}
                    
                    />
                </div>

                <div className="doughnutChart">
                <Doughnut data={doughnutState} />

                </div>






            </div>

        </div>
    )
}

export default Dashboard;