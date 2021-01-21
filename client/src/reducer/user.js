import {LOGIN_USER} from "../config/variables"

export default function(state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return action.payload;
        default:
            return state;
    }
}