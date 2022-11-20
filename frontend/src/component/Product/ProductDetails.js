import React, { Fragment,useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useSelector,useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { clearErrors, getProductDetails, newReview } from '../../action/productAction';
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../action/cartAction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';








const ProductDetails = () => {



    const dispatch = useDispatch();

    const params = useParams(); //initialize the constant

    const { product,loading,error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview)

    
    const options = {
        
        value: product.ratings,
        readOnly: true,
        size: "large",
        precision: 0.5,
        // size: window.innerWidth < 600 ? 15 : 25,
    }

    
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    
    
    
    const increaseQuantity = () => {
        
        if(product.Stock <= quantity) return;
        
        const qty = quantity + 1;
        
        setQuantity(qty)
    };
    
    
    const decreaseQuantity = () => {
        
        if(1 >= quantity) return;
        
        const qty = quantity - 1;
        
        setQuantity(qty)
        
    };
    


    const addToCartHandler = () => {
        dispatch(addItemsToCart(params.id, quantity));
        toast.success("Item Added To Cart", {
            position: "bottom-center",
            theme: "dark",
        })
    };


    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }

    

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", params.id);


        dispatch(newReview(myForm));
        setOpen(false);
    }


    
    useEffect(() => {

        if(error){
            toast.error(error,{
                position:"bottom-center",
                theme:"colored"
            });
            dispatch(clearErrors());
        }


        if(reviewError) {
            toast.error(reviewError,{
                position:"bottom-center",
                theme:"colored"
            });
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Review Submitted Successfully", {
                position: "bottom-center",
                theme: "dark"
            });
            dispatch({ type: NEW_REVIEW_RESET })
        }


        dispatch(getProductDetails(params.id));
    }, [dispatch, params.id, error, reviewError, success])

    




    return (
        <Fragment>
            {loading ? <Loader /> : (
                    <Fragment>

                        <MetaData title={`${product.name} -- THE MART`} />

                        <div className="productdetails">
                            <div className='left'>
                                <Carousel className='leftCaro'>
                                    {
                                        product.images && product.images.map((item, i) => (
                                            <img
                                                className="CarouselImage"
                                                key={item.url} 
                                                src={item.url}
                                                alt={`${i} Slide`}
                                            />
                                        ))
                                        }
                                </Carousel>
                            </div>
                            <div className='right'>
                                <div className='detailsBlock-1'>
                                    <h2>{product.name}</h2>
                                    <p>Product #{product._id}</p>
                                </div>
                                <div className="detailsBlock-2">
                                    <Rating {...options} />
                                    <span className='detailsBlock-2-span'>({product.numOfReviews} Reviews)</span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`$${product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input readOnly value={quantity} type="number" />
                                            <button onClick={increaseQuantity}>+</button>
                                        
                                        </div>
                                        
                                        <button disabled={ product.Stock < 1 ? true : false } onClick={addToCartHandler}>Add to Cart</button>
                                    
                                    </div>
                                        
                                    <p>
                                        Status: {" "}
                                        <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                            {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                        
                                        </b>
                                    </p>
                                        
                                </div>
                                        
                                <div className="detailsBlock-4">
                                    Description: <p>{product.description}</p>
                                </div>
                                        
                                <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                                        
                                        
                                        
                            </div>
                        </div>
                        
                        
                        <h3 className="reviewsHeading">REVIEWS</h3>

                        

                        <Dialog
                            aria-labelledby='simple-dialog-title'
                            open = {open}
                            onClose= {submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating 
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className='submitDialogTextArea'
                                    cols="30"
                                    rows= "5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value) }
                                >
                                </textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary" >Cancel</Button>
                                <Button onClick={reviewSubmitHandler} color='primary' >Submit</Button>
                            </DialogActions>


                        </Dialog>






            
                        {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                            </div>
                        ) : (
                            <p className="noreviews">No Reviews Yet</p>
                        )}
            
            
            
                    </Fragment>
            ) }
        </Fragment>

);
};

export default ProductDetails;

