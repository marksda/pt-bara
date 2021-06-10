import { CREDENTIAL_RESET, FILTER_CUSTOMER_LOADED, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, UNAUTHORIZATION_RISE, URUT_CUSTOMER_LOADED, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_LOADED } from "../constants/action-types";


export const getBentukUsaha = (url='', authorization) => {
    return (dispatch) => {
        return fetch(url, {
            method: 'GET', 
            headers: authorization
        })
        .then(            
            (response) => {
                return response.json();
            }
        )
        .then(
            json => {          
                if(json.status === 200 ) {
                    dispatch({ type: LIST_BENTUK_USAHA_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_BENTUK_USAHA_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_BENTUK_USAHA_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setPaginationBentukUsaha = (value) => {
    return({type: PAGINATION_BENTUK_USAHA_LOADED, payload: value});
}

export const setUrutBentukUsaha = (value) => {
    return({type: URUT_BENTUK_USAHA_LOADED, payload: value});
}

export const getCustomer = (url='', authorization) => {
    return (dispatch) => {
        return fetch(url, {
            method: 'GET', 
            headers: authorization
        })
        .then(            
            (response) => {
                return response.json();
            }
        )
        .then(
            json => {          
                if(json.status === 200 ) {
                    dispatch({ type: LIST_CUSTOMER_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_CUSTOMER_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_CUSTOMER_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterCustomer = (value) => {
    return({type: FILTER_CUSTOMER_LOADED, payload: value});
}

export const setPaginationCustomer = (value) => {
    return({type: PAGINATION_CUSTOMER_LOADED, payload: value});
}

export const setUrutCustomer = (value) => {
    return({type: URUT_CUSTOMER_LOADED, payload: value});
}

export const setMenu = (data) => {
    return ({ 
        type: MENU_LOADED, 
        payload: data
    });
}