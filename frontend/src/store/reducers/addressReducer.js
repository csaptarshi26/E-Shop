import { CREATE_MY_ADDRESS_FAIL, CREATE_MY_ADDRESS_REQUEST, CREATE_MY_ADDRESS_RESET, CREATE_MY_ADDRESS_SUCCESS, GET_ADDRESS_BY_ID_FAIL, GET_ADDRESS_BY_ID_REQUEST, GET_ADDRESS_BY_ID_SUCCESS, GET_ADDRESS_FAIL, GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS } from "../constants/addressConstant"

export const addressListReducer = (state = { addressList: [] }, action) => {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_ADDRESS_SUCCESS:
      return {
        loading: false,
        addressList: action.payload
      }
    case GET_ADDRESS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const addressSelectedReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case GET_ADDRESS_BY_ID_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_ADDRESS_BY_ID_SUCCESS:
      return {
        loading: false,
        address: action.payload
      }
    case GET_ADDRESS_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const addMyAddressReducer = (state = { address: {} }, action) => {
  switch (action.type) {
    case CREATE_MY_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_MY_ADDRESS_SUCCESS:
      return {
        loading: false,
        address: action.payload
      }
    case CREATE_MY_ADDRESS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CREATE_MY_ADDRESS_RESET:
      return {
        address: {}
      }
    default:
      return state
  }
}