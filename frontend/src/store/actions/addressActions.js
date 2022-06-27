import { CREATE_MY_ADDRESS_FAIL, CREATE_MY_ADDRESS_REQUEST, CREATE_MY_ADDRESS_SUCCESS, GET_ADDRESS_FAIL, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS } from "../constants/addressConstant";
import axios from "axios";

export const getMyAddressList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ADDRESS_REQUEST })
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/address`, config);

    dispatch({ type: GET_ADDRESS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: GET_ADDRESS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
export const addMyAddress = (address) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_MY_ADDRESS_REQUEST })
    const { userLogin: { userInfo } } = getState();
    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`/api/address`,address, config);

    dispatch({ type: CREATE_MY_ADDRESS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_MY_ADDRESS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}