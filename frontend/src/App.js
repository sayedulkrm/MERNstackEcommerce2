import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"; 
import Header from "./component/layout/Header/Header.js";
import webFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './action/userAction';
import UserOption from "./component/layout/Header/UserOption.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/RestPassword.js";
import Cart from "./component/Cart/Cart.js"
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";

import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct.js';
import ProcessOrder from './component/Admin/ProcessOrder.js';
import OrderList from './component/Admin/OrderList.js';


import './App.css';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import UsersList from './component/Admin/UsersList.js';
import UpdateUser from './component/Admin/UpdateUser.js';
import ProductReviews from './component/Admin/ProductReviews.js';
import Contact from './component/layout/Contact/Contact.js';
import About from './component/layout/About/About.js';
import NotFound from './component/layout/Not Found/NotFound.js';











function App() {



  const {isAuthenticated, user} = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey() {

    const { data } = await axios.get("/api/v1/stripeapikey");


    setStripeApiKey(data.stripeApiKey);



  }



useEffect(() => {


  webFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka"]
    },
  });

  store.dispatch(loadUser());

  getStripeApiKey();


}, [])


window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    
    <Router>
      
      <Header />

      {isAuthenticated && <UserOption user={user} />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        
        <Route path="/search" element={<Search />} />

        <Route path="/cart" element={<Cart />} />
        
        <Route path="/login" element={<LoginSignUp />} />


        
        
        <Route element={ <ProtectedRoute isAuthenticated={isAuthenticated} /> } >
          
            <Route path="/account" element={ <Profile /> } />
            <Route path="/me/update" element={ <UpdateProfile /> } />
            <Route path="/password/update" element={ <UpdatePassword /> } />
            <Route path="/shipping" element={ <Shipping /> } />
            <Route path="/order/confirm" element={ <ConfirmOrder /> } />
            <Route path="/success" element={ <OrderSuccess /> } />
            <Route path="/orders" element={ <MyOrders /> } />
            <Route path="/order/:id" element={ <OrderDetails /> } />

            <Route path="/process/payment" element={ stripeApiKey && 
              <Elements stripe={loadStripe(stripeApiKey)}> <Payment/> </Elements>} />


            


          <Route path="/admin/dashboard" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <Dashboard /> </ProtectedRoute> } />
          
          <Route path="/admin/products" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <ProductList /> </ProtectedRoute> } />
          
          <Route path="/admin/product" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <NewProduct /> </ProtectedRoute> } />

          <Route path="/admin/product/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <UpdateProduct /> </ProtectedRoute> } />

          <Route path="/admin/orders" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <OrderList /> </ProtectedRoute> } />

          <Route path="/admin/order/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <ProcessOrder /> </ProtectedRoute> } />

          <Route path="/admin/users" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <UsersList /> </ProtectedRoute> } />
            
          <Route path="/admin/user/:id" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <UpdateUser /> </ProtectedRoute> } />

          <Route path="/admin/reviews" element={ <ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={true} > <ProductReviews /> </ProtectedRoute> } />

          
          
          


        </Route>

        

        <Route path="/password/forgot" element={ <ForgotPassword /> } />
        
        <Route path="/password/reset/:token" element={ <ResetPassword /> } />


        <Route path="/*" element={ window.location.pathname === "/process/payment" ? null : <NotFound />} />



      </Routes>


      <Footer />
      
    </Router>
    
  );
}

export default App;
