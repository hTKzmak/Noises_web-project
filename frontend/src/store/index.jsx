import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { musicReducer } from "./musicReducer";

const rootreducer = combineReducers({
    music: musicReducer,
})

export const store = createStore(rootreducer, applyMiddleware(thunk)) 