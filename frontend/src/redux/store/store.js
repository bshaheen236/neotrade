import { createStore } from "redux";
import rootReducer from "../rootreducer/rootReducer";

const store = createStore(rootReducer);

export default store;
