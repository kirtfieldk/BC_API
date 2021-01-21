import {USER} from "../config/variables"

export default function(state = null, action){
    switch(action.type){
        case USER:
            return action.payload;
        default:
            return state;
    }
}