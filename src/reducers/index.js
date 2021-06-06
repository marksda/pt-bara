import { combineReducers } from "redux";
import credential from "./credential";
import general from "./general";
import master from "./master";
import notification from "./notification";

export default combineReducers({credential, general, master, notification});