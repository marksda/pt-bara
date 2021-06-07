import { MENU_LOADED } from "../constants/action-types";

export const setMenu = (data) => {
    return ({ 
        type: MENU_LOADED, 
        payload: data
    });
}