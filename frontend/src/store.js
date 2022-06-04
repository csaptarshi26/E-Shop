import { applyMiddleware, combineReducers, createStore } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";


const initialState = {};
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer
});

const store = configureStore({
    reducer,
    preloadedState: initialState
})

export default store;