import { CREDENTIAL_RESET, FILTER_CUSTOMER_LOADED, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, UNAUTHORIZATION_RISE, URUT_CUSTOMER_LOADED, FILTER_JABATAN_LOADED, LIST_JABATAN_LOADED, LIST_JABATAN_RESET, PAGINATION_JABATAN_LOADED, URUT_JABATAN_LOADED, FILTER_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_LOADED, FILTER_PEGAWAI_LOADED, LIST_PEGAWAI_LOADED, LIST_PEGAWAI_RESET, PAGINATION_PEGAWAI_LOADED, URUT_PEGAWAI_LOADED, FILTER_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_RESET, PAGINATION_STRUKTUR_ORGANISASI_LOADED, URUT_STRUKTUR_ORGANISASI_LOADED } from "../constants/action-types";


export const getStrukturOrganisasi = (url='', authorization) => {
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
                    dispatch({ type: LIST_STRUKTUR_ORGANISASI_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_STRUKTUR_ORGANISASI_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_STRUKTUR_ORGANISASI_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterStrukturOrganisasi = (value) => {
    return({type: FILTER_STRUKTUR_ORGANISASI_LOADED, payload: value});
}

export const setPaginationStrukturOrganisasi = (value) => {
    return({type: PAGINATION_STRUKTUR_ORGANISASI_LOADED, payload: value});
}

export const setUrutStrukturOrganisasi = (value) => {
    return({type: URUT_STRUKTUR_ORGANISASI_LOADED, payload: value});
}

export const getPegawai = (url='', authorization) => {
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
                    dispatch({ type: LIST_PEGAWAI_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_PEGAWAI_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_PEGAWAI_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterPegawai = (value) => {
    return({type: FILTER_PEGAWAI_LOADED, payload: value});
}

export const setPaginationPegawai = (value) => {
    return({type: PAGINATION_PEGAWAI_LOADED, payload: value});
}

export const setUrutPegawai = (value) => {
    return({type: URUT_PEGAWAI_LOADED, payload: value});
}

export const getJabatan = (url='', authorization) => {
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
                    dispatch({ type: LIST_JABATAN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_JABATAN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_JABATAN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterJabatan = (value) => {
    return({type: FILTER_JABATAN_LOADED, payload: value});
}

export const setPaginationJabatan = (value) => {
    return({type: PAGINATION_JABATAN_LOADED, payload: value});
}

export const setUrutJabatan = (value) => {
    return({type: URUT_JABATAN_LOADED, payload: value});
}

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

export const setFilterBentukUsaha = (value) => {
    return({type: FILTER_BENTUK_USAHA_LOADED, payload: value});
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