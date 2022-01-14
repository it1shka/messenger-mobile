import { combineReducers, createStore } from "redux";

import mainReducer from "./reducers/main.reducer";

const appReducer = combineReducers({
  main: mainReducer
})
export const store = createStore(appReducer)

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof appReducer>