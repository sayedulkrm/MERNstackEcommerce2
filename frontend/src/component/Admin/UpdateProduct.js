import React, { Fragment, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, updateProduct, getProductDetails } from '../../action/productAction';
import MetaData from '../layout/MetaData';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StorageIcon from '@mui/icons-material/Storage';
import "./NewProduct.css";
import Slidebar from './Slidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';







const UpdateProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();


    const { error, product } = useSelector((state) => state.productDetails)

    const { loading, error:updateError, isUpdated } = useSelector((state) => state.product);
    


    const [name, setName ] = useState("");
    const [price, setPrice] = useState(0);

    const [ description, setDescription ] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages ] = useState([]);
    const [oldImages, setOldImages ] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);


    const categories = [


        "Camera",
        "Laptop",
        "Footwear",
        "SmartPhone",
        "Man's Fashion",
        "Women's Fashion",
        "Kids Fashion",
        "Electronics",
        "Furniture",
        "Sunglass",
        "Watches",
        "Monitor",
        "TV",


    ];

    const productId = params.id;

    useEffect(() => {


        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.Stock);
            setOldImages(product.images);
            setCategory(product.category);
        }

        if(error) {
            toast.error(error,{
                position: "bottom-center",
                theme: "dark"
            });
            dispatch(clearErrors());
        }

        if(updateError) {
            toast.error(updateError,{
                position: "bottom-center",
                theme: "dark"
            });
            dispatch(clearErrors());
        }


        if(isUpdated) {
            toast.success("Product Updated Successfully",{
                position: "bottom-center",
                theme: "dark"
            });
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, error, navigate, updateError, isUpdated, product, productId]);


    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);


        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(updateProduct(productId, myForm));

    };


    const updateProductImagesChange = (e) => {

        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };



            reader.readAsDataURL(file);
        })


    };







    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Slidebar />
                <div className="newProductContainer">
                    <form className="createProductForm" encType='multipart/form-data' 
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input type="text" 
                                placeholder='Product Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <AttachMoneyIcon />
                            <input type="number" 
                                placeholder='Price'
                                required
                                value={price}
                                
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder='Product Description'
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            
                            ></textarea>
                        </div>
                        
                        <div>
                            <AccountTreeIcon />
                            <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>{cate}</option>
                                ))};
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input type="number" 
                                placeholder='Stock'
                                required
                                value={Stock}
                                
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id='createProductFormFile'>
                            <input 
                                type="file"
                                name='avatar'
                                accept='image/*'
                                multiple
                                onChange={updateProductImagesChange}
                            />
                        </div>

                        <div id='createProductFormImage'>
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}

                        </div>

                        <div id='createProductFormImage'>
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}

                        </div>

                        <Button
                            id='createProductBtn'
                            type='submit'
                            disabled={loading ? true : false}
                        
                        >
                            Update
                        </Button>






                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateProduct;