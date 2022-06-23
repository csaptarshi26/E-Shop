import { CLOSE_SIGN_UP_MODAL, OPEN_SIGN_UP_MODAL } from "../constants/appConstant"

export const setModalStatus = (isOpen) => async (dispatch) => {

  if (isOpen) {
    dispatch({ type: OPEN_SIGN_UP_MODAL })
  } else {
    dispatch({ type: CLOSE_SIGN_UP_MODAL })
  }
}