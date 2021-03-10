import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { authentication } from "./Structure/Admin/index"
import {admin} from './Structure/Admin/index'

const reducers = {
  admin, 
  authentication
}

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer, enhancer);

export { store, reducers };