import { AUTHORIZATION_RISE, UNAUTHORIZATION_RISE } from "../constants/action-types";

export const setAuthorization = () => {
    return ({ 
        type: AUTHORIZATION_RISE, 
        payload: 'authorization'
    });
}

export const setUnauthorization = () => {
    return ({ 
        type: UNAUTHORIZATION_RISE, 
        payload: 'unauthorization'
    });
}