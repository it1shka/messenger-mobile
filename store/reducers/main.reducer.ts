import { MainAction, MainActionType, MainState } from "../types/main.types";

const mainDefaultState: MainState = {
  user: null
}

const mainReducer = (
  state = mainDefaultState,
  action: MainAction
): MainState => {
  switch(action.type) {
    case MainActionType.SET_USER:
      return {...state, user: action.payload}
    default:
      return state
  }
}

export default mainReducer