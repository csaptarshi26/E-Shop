import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    cart:{
        cartItems:  cartItems
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});

const store = configureStore({
    reducer,
    preloadedState: initialState
})

export default store;