import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducers';
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
const initialState = {
    cart: { cartItems, shippingAddress },
    userLogin: { userInfo }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy : orderListMyReducer
});

const store = configureStore({
    reducer,
    preloadedState: initialState
})

export default store;