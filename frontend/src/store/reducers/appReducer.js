import { CLOSE_ADDRESS_MODAL, CLOSE_SIGN_UP_MODAL, OPEN_ADDRESS_MODAL, OPEN_SIGN_UP_MODAL } from "../constants/appConstant"

const initialState = {
  openSignUpModal: false,
  addressModal: {
    openAddressModal: false,
    modalType: 'create',
  }
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SIGN_UP_MODAL:
      return { ...state, openSignUpModal: true }
    case CLOSE_SIGN_UP_MODAL:
      return { ...state, openSignUpModal: false }
    case OPEN_ADDRESS_MODAL:
      return {
        ...state,
        addressModal: {
          openAddressModal: true,
          modalType: action.payload,
        }
      }
    case CLOSE_ADDRESS_MODAL:
      return {
        ...state,
        addressModal: {
          openAddressModal: false,
          modalType: action.payload,
        }
      }
    default:
      return state
  }
}
