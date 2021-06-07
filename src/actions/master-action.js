import { MENU_LOADED } from "../constants/action-types";

export const setMenu = (data) => {
    console.log(data);
    return ({ 
        type: MENU_LOADED, 
        payload: data
    });
}