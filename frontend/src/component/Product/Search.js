import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';
import "./Search.css"

const Search = () => {


    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };




    return (
        <Fragment>
            

            <MetaData title="SEARCH A PRODUCTS -- THE MART" /> 

            <form className="searchbox" onSubmit={searchSubmitHandler}>

                <input 
                    type="text"
                    placeholder="Search a Product..."
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <input type="submit" value="Search" />

            </form>

        </Fragment>
    );
};

export default Search;