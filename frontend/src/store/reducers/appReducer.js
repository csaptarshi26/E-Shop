import { CLOSE_SIGN_UP_MODAL, OPEN_SIGN_UP_MODAL } from "../constants/appConstant"

export const appReducer = (state = { openModal: false }, action) => {
  switch (action.type) {
    case OPEN_SIGN_UP_MODAL:
      return {
        openModal: true
      }
    case CLOSE_SIGN_UP_MODAL:
      return {
        openModal: false
      }
    default:
      return state
  }
}
