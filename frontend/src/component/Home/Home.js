import React, { Fragment, useEffect } from 'react'
import { GiClick } from 'react-icons/gi';
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from "../../action/productAction";
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';








const Home = () => {


const dispatch = useDispatch();

const { loading,error,products } = useSelector(state => state.products)

useEffect(() => {

    if(error){
        toast.error(error,{
            position:"bottom-center",
            theme:"colored"
        });
        dispatch(clearErrors());
    }
    dispatch(getProduct());


}, [dispatch,error])




    return (
        <Fragment>


            {loading ? (<Loader />) : (
                    <Fragment>

                    <MetaData title="The Mart - Ecommerce || SK"/>
            
                    <div className="bannar">
                        <p>Welcome to THE MART Ecommerce Store</p>
                        <h1>FIND AMAGING PRODUCT BELOW</h1>
            
                        <a href="#container">
                            <button>
                                Scroll <GiClick />
                            </button>
                        </a>
            
            
                    </div>
            
                        <h2 className='homeHeading'>Featured Products</h2>
            
                        <div className='container' id='container'>
                            
            
                            {products && products.map(product => (
                                <ProductCard key={product._id} product={product}/>
                            ))}
            
                        </div>
            
                </Fragment>
            )};


        </Fragment>
    );
};

export default Home