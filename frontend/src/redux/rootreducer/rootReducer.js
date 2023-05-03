import { combineReducers } from "redux";
import counterReducer from "../reducer/counterReducer";

const rootReducer = combineReducers({
	counterReducer,
});

export default rootReducer;
