import { 
    AUTHORIZATION_RISE, UNAUTHORIZATION_RISE 
} from "../constants/action-types";
import { AUTHORIZATION_NOTIFY } from "../constants/master-types";


const initialState = {
	authorization_notify: 'unauthorization'
}

export default function notification(state = initialState, action) {
	switch (action.type) {
        case AUTHORIZATION_RISE:
        	return {
                ...state,
                [AUTHORIZATION_NOTIFY]: action.payload
            };
        case UNAUTHORIZATION_RISE:
            return {
                ...state,
                [AUTHORIZATION_NOTIFY]: 'unauthorization'
            };
        default:
        	return(state);
    }
}