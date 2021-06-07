import CryptoJS from 'crypto-js';
import { MENU_LOADED } from "../constants/action-types";
import { MENUS } from "../constants/master-types";

const initialState = {
    menus: []
}

const loadLocalMenuFromStorage = () => {
    let tmpData = window.localStorage.getItem('{rdDFD8vOc+Vje7RJ8FUGWYiNcu3MVKcpSUP37ZjFkP8=}');
    if(tmpData !== null){
        let bytes  = CryptoJS.AES.decrypt(tmpData.toString(), '011d62bbd146b4722db66be10581cd54');
        let menu = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return menu;
    }
    else {
        return [];
    }
}

export default function master(state = initialState, action) {
    switch (action.type) {
        case MENU_LOADED:
            let ciphertextprofile = CryptoJS.AES.encrypt(JSON.stringify(action.payload), '011d62bbd146b4722db66be10581cd54');
            window.localStorage.setItem('{rdDFD8vOc+Vje7RJ8FUGWYiNcu3MVKcpSUP37ZjFkP8=}', ciphertextprofile);
            return {
                ...state,
                [MENUS]: [...action.payload]
            };
            default:
                let menuLoaded = loadLocalMenuFromStorage();
                if(menuLoaded.length > 0){
                    return {
                        ...state,
                        [MENUS]: [...menuLoaded]
                    }
                }
                else {
                    return state;                    
                }
    }
}