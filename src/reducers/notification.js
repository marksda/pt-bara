import { 
    AUTHORIZATION_RISE, UNAUTHORIZATION_RISE 
} from "../constants/action-types";
import { AUTHORIZATION_NOTIFY } from "../constants/master-types";


const initialState = {
	authorization_notify: 'unauthorization'
}

const loadLocalStorageNotification = () => {
    let tmpData = window.localStorage.getItem('{8e9cca41-2ddf-e5c8-5af2-6dd2f36ceae4}');
    if(tmpData !== null){
        return  'authorization';
    }
    else {
        return  'unauthorization';
    }
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
                [AUTHORIZATION_NOTIFY]: action.payload
            };
        default:
            let pfl = loadLocalStorageNotification();            
            return {
                ...state,
                [AUTHORIZATION_NOTIFY]: pfl
            }

    }
}