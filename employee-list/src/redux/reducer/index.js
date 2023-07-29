import { combineReducers } from "redux";
import employee from "./employee";
import runtime from "./runtime";

export default combineReducers({
  employee,
  runtime,
});
