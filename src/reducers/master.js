import CryptoJS from 'crypto-js';
import { FILTER_CUSTOMER_LOADED, FILTER_CUSTOMER_RESET, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, PAGINATION_CUSTOMER_RESET, URUT_CUSTOMER_LOADED, URUT_CUSTOMER_RESET, FILTER_BENTUK_USAHA_LOADED, FILTER_BENTUK_USAHA_RESET, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, PAGINATION_BENTUK_USAHA_RESET, URUT_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_RESET } from "../constants/action-types";
import { FILTER_CUSTOMER, LIST_CUSTOMER, MENUS, PAGINATION_CUSTOMER, URUT_CUSTOMER, FILTER_BENTUK_USAHA, LIST_BENTUK_USAHA, PAGINATION_BENTUK_USAHA, URUT_BENTUK_USAHA } from "../constants/master-types";

const initialState = {
    menus: [],
    list_customer: null,
    filter_customer: {
        field: null,
        search: null
    },
    pagination_customer: {
        current: 1,
        pageSize: 10,
    },
    urut_customer: {
        field: "m.nama",
        order: "asc"
    },
    list_bentuk_usaha: null,
    filter_bentuk_usaha: {
        field: null,
        search: null
    },
    pagination_bentuk_usaha: {
        current: 1,
        pageSize: 10,
    },
    urut_bentuk_usaha: {
        field: "m.nama",
        order: "asc"
    },
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
        case FILTER_CUSTOMER_LOADED:
            return {
                ...state,
                [FILTER_CUSTOMER]: action.payload
            };
        case FILTER_CUSTOMER_RESET:
            let tmpFilterCustomer = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_CUSTOMER]: {...tmpFilterCustomer}
            };
        case LIST_CUSTOMER_LOADED:
            return {
                ...state,
                [LIST_CUSTOMER]: action.payload
            };  
        case LIST_CUSTOMER_RESET:
            return {
                ...state,
                [LIST_CUSTOMER]: null
            };      
        case MENU_LOADED:
            let ciphertextprofile = CryptoJS.AES.encrypt(JSON.stringify(action.payload), '011d62bbd146b4722db66be10581cd54');
            window.localStorage.setItem('{rdDFD8vOc+Vje7RJ8FUGWYiNcu3MVKcpSUP37ZjFkP8=}', ciphertextprofile);
            return {
                ...state,
                [MENUS]: [...action.payload]
            };
        case PAGINATION_CUSTOMER_LOADED:
            return {
                ...state,
                [PAGINATION_CUSTOMER]: action.payload
            };
        case PAGINATION_CUSTOMER_RESET:
            let tmpPaginationCustomer = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_CUSTOMER]: {...tmpPaginationCustomer}
            };
        case URUT_CUSTOMER_LOADED:
            return {
                ...state,
                [URUT_CUSTOMER]: action.payload
            };
        case URUT_CUSTOMER_RESET:
            let tmpUrutCustomer = {
                field: "m.nama",
                order: "asc"
            }
            return {
                ...state,
                [URUT_CUSTOMER]: {...tmpUrutCustomer}
            };
        case FILTER_BENTUK_USAHA_LOADED:
            return {
                ...state,
                [FILTER_BENTUK_USAHA]: action.payload
            };
        case FILTER_BENTUK_USAHA_RESET:
            let tmpFilterBentukUsaha = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_BENTUK_USAHA]: {...tmpFilterBentukUsaha}
            };
        case LIST_BENTUK_USAHA_LOADED:
            return {
                ...state,
                [LIST_BENTUK_USAHA]: action.payload
            };  
        case LIST_BENTUK_USAHA_RESET:
            return {
                ...state,
                [LIST_BENTUK_USAHA]: null
            };      
        case PAGINATION_BENTUK_USAHA_LOADED:
            return {
                ...state,
                [PAGINATION_BENTUK_USAHA]: action.payload
            };
        case PAGINATION_BENTUK_USAHA_RESET:
            let tmpPaginationBentukUsaha = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_BENTUK_USAHA]: {...tmpPaginationBentukUsaha}
            };
        case URUT_BENTUK_USAHA_LOADED:
            return {
                ...state,
                [URUT_BENTUK_USAHA]: action.payload
            };
        case URUT_BENTUK_USAHA_RESET:
            let tmpUrutBentukUsaha = {
                field: "m.nama",
                order: "asc"
            }
            return {
                ...state,
                [URUT_BENTUK_USAHA]: {...tmpUrutBentukUsaha}
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