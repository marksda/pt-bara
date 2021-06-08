import { 
    AUTHORIZATION_RISE, UNAUTHORIZATION_RISE 
} from "../constants/action-types";
import { AUTHORIZATION_NOTIFY } from "../constants/master-types";


const initialState = {
	authorization_notify: 'unauthorization'
}

const loadLocalStorageNotification = () => {
    let tmpDataProfile = window.localStorage.getItem('{$2a$04$LEBKjg.jyXK7IJzEBHBe/erI/fRXwEiLdoWTB0Lva64GGCFXn51aG}');
    let tmpDataCredential = window.localStorage.getItem('{$2a$04$uNYaQhd6v9Em48tVM/duVOYI6L1AdCMdPNvKdMJ0/mQxnmsRIN0G2}');
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