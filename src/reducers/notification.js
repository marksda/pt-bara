import { 
    AUTHORIZATION_RISE, UNAUTHORIZATION_RISE 
} from "../constants/action-types";
import { AUTHORIZATION_NOTIFY } from "../constants/master-types";


const initialState = {
	authorization_notify: 'unauthorization'
}

const loadLocalStorageNotification = () => {
    let tmpDataProfile = window.localStorage.getItem('{8e9cca41-2ddf-e5c8-5af2-6dd2f36ceae4}');
    let tmpDataCredential = window.localStorage.getItem('{ef535818-9c4d-1b92-9eea-43ad6d745c9a}');
    if(tmpDataProfile !== null && tmpDataCredential !== null) {
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