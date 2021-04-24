import { CREDENTIAL_LOADED, CREDENTIAL_RESET, USER_LOADED } from "../constants/action-types";

export const setUser = (data) => {
    return ({ 
        type: USER_LOADED, 
        payload: data
    });
}

export const setCredential = (data) => {
    return ({ 
        type: CREDENTIAL_LOADED, 
        payload: data
    });
}

export const resetCredential = () => {
	return({type: CREDENTIAL_RESET});
}