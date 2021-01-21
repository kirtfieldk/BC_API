import {combineReducers} from "redux";
import user from "./user"
import allCamps from './camps'
import currentUser from './currentUser';
export default combineReducers({
    user,
    allCamps,
    currentUser
});