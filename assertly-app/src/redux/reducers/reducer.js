import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import events from "./events";

const rootReducer = history =>
  combineReducers({
    events,
    router: connectRouter(history)
  });

export default rootReducer;
