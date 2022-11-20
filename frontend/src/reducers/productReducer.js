import { 
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL, 
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    PRODUCT_Details_REQUEST,
    PRODUCT_Details_SUCCESS,
    PRODUCT_Details_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERROR
} from "../constants/productConstants";





export const productsReducer = (state={products:[]},action) => {

    switch (action.type) {

            case ALL_PRODUCT_REQUEST:
            case ADMIN_PRODUCT_REQUEST:
            return{
                loading:true,
                products:[]
            };
            
            
            case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                filteredProductsCount:action.payload.filteredProductsCount,
            };
            
            


            case ADMIN_PRODUCT_SUCCESS:
                return {
                    loading: false,
                    products: action.payload,
                }





            case ALL_PRODUCT_FAIL:
            case ADMIN_PRODUCT_FAIL:
            return{
                loading: false,
                error: action.payload
            };

            case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};




// ----------------         ADMIN        --------------//

// Creating New Product
export const newProductReducer = (state = { product: {} },action) => {

    switch (action.type) {

        case NEW_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,
            };
            
        
        case NEW_PRODUCT_SUCCESS:
            return{
                loading:false,
                success: action.payload.success,
                product: action.payload.product,
            };
            

        case NEW_PRODUCT_RESET:
            return{
                ...state,
                success: false,
            };


        
        case NEW_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};



// DELETE PRODUCT
export const productReducer = (state = { },action) => {

    switch (action.type) {

        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return{
                ...state,
                loading:true,
            };
            
        
        case DELETE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                isDeleted: action.payload
            };
            

        
        case UPDATE_PRODUCT_SUCCESS:
            return{
                ...state,
                loading:false,
                isUpdated: action.payload
            };
            

        case DELETE_PRODUCT_RESET:
            return{
                ...state,
                isDeleted: false,
            };


        case UPDATE_PRODUCT_RESET:
            return{
                ...state,
                isUpdated: false,
            };
    
    

        
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};

//------------ Admin REVIEW--------

//  Product Review Reducer
export const productReviewsReducer = (state={ reviews: [] },action) => {

    switch (action.type) {

            case ALL_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            };
            
            
            case ALL_REVIEW_SUCCESS:
            return{
                loading:false,
                reviews: action.payload
            };
            
            
            case ALL_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

            case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};


// Delete Review Reducer
export const reviewReducer = (state = { },action) => {

    switch (action.type) {

        case DELETE_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            };
            
        
        case DELETE_REVIEW_SUCCESS:
            return{
                loading:false,
                isDeleted: action.payload
            };
            

        case DELETE_REVIEW_RESET:
            return{
                ...state,
                isDeleted: false,
            };


        
        case DELETE_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};


// -----------------------//-----------------


//  Product Details Reducer
export const productDetailsReducer = (state={product: {}},action) => {

    switch (action.type) {

            case PRODUCT_Details_REQUEST:
            return{
                loading:true,
                ...state,
            };
            
            
            case PRODUCT_Details_SUCCESS:
            return{
                loading:false,
                product: action.payload
            };
            
            
            case PRODUCT_Details_FAIL:
            return{
                loading: false,
                error: action.payload
            };

            case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};


// Review Reducer
export const newReviewReducer = (state = { },action) => {

    switch (action.type) {

        case NEW_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            };
            
        
        case NEW_REVIEW_SUCCESS:
            return{
                loading:false,
                success: action.payload
            };
            

        case NEW_REVIEW_RESET:
            return{
                ...state,
                success: false,
            };


        
        case NEW_REVIEW_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR:
            return{

                ...state,
                error: null
            };


        default:
            return state;
    }

};