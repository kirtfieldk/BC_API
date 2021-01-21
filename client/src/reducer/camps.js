import {FETCH_CAMPS} from "../config/variables"

export default function(state = [], action){
    switch(action.type){
        case FETCH_CAMPS:
            return action.payload
        default:
            return state
    }
}