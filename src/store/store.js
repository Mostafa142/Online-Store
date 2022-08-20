import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import menuReducer from "../reducers/reducer";

const store = createStore(menuReducer, applyMiddleware(thunk));

export default store;
