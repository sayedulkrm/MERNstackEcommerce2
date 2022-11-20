import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import {useSelector,useDispatch} from 'react-redux'
import { clearErrors, getProduct } from '../../action/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import {useParams} from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider,Typography } from '@mui/material';
import { toast } from 'react-toastify';
import MetaData from '../layout/MetaData';





const categories = [
    "Laptop",
    "Footwear",
    "Camera",
    "SmartPhone",
    "Man's Fashion",
    "Women's Fashion",
    "Kids Fashion",
    "Monitor",
    "TV",
    "Electronics",
    "Furniture",
    "Watches",
    "Sunglass",

];








const Products = () => {


    const dispatch = useDispatch();
    const params = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 20000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const { products,loading,error,productsCount, resultPerPage,filteredProductsCount} = useSelector(state=> state.products);

    const keyword = params.keyword;

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)

    }

    const priceHandler = (event, newPrice) => {

        setPrice(newPrice);

    }


    useEffect(()=>{

        if(error){
            toast.error(error,{
                position:"bottom-center",
                theme:"colored"
            });
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage,price, category, ratings))

    },[dispatch,keyword, currentPage, price, category, ratings, error]);


    let count = filteredProductsCount;


    return (
        <Fragment>
            {loading ?  <Loader />  : 

                <Fragment>
                    <MetaData title="PRODUCTS -- THE MART" />
                    <h2 className='productsHeading'>Products</h2>

                    <div className="products">
                        {products && products.map((product)=>(
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>


                    <div className="filterBox">
                        
                        <Typography>Price</Typography>
                        <Slider 
                            value={price} 
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby='range-slider'
                            min={0}
                            max={20000}
                        
                        />


                        <Typography>Categories</Typography>
                            <ul className='categoryBox'>
                                {categories.map((category)=> (
                                    <li className='categoryLink' key={category} onClick={() => setCategory(category)}>
                                        {category}
                                    </li>
                                ))}

                            </ul>

                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>

                                <Slider 
                                    value={ratings}
                                    onChange={( e, newRating ) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby = "continuous-slider"
                                    min={0}
                                    max={5}
                                    valueLabelDisplay="auto"
                                
                                />




                            </fieldset>

                    </div>

                    {resultPerPage < count && (
                            <div className="paginationBox">
                            <Pagination 
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass='pageItemActive'
                                activeLinkClass='pageLinkActive'
                            />
                        </div>
                    )}


                </Fragment>
            }
        </Fragment>
    )
}

export default Products