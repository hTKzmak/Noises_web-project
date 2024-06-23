import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { musicReducer } from "./musicReducer";
import { musicDataReducer } from "./MusicDataReducer";

const rootreducer = combineReducers({
    // music: musicReducer,
    musicData: musicDataReducer,
})

export const store = createStore(rootreducer, applyMiddleware(thunk)) 