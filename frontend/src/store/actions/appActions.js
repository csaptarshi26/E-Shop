import { CLOSE_ADDRESS_MODAL, CLOSE_SIGN_UP_MODAL, OPEN_ADDRESS_MODAL, OPEN_SIGN_UP_MODAL } from "../constants/appConstant"

export const setSignUpModalStatus = (isOpen) => async (dispatch) => {
  let type = isOpen ? OPEN_SIGN_UP_MODAL : CLOSE_SIGN_UP_MODAL;
  dispatch({ type: type })
}

export const setAddressModalStatus = (isOpen, modalType) => async (dispatch) => {
  let type = isOpen ? OPEN_ADDRESS_MODAL : CLOSE_ADDRESS_MODAL;
  dispatch({ type: type, payload: modalType })

}