import { CREDENTIAL_RESET, FILTER_CUSTOMER_LOADED, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, UNAUTHORIZATION_RISE, URUT_CUSTOMER_LOADED, FILTER_JABATAN_LOADED, LIST_JABATAN_LOADED, LIST_JABATAN_RESET, PAGINATION_JABATAN_LOADED, URUT_JABATAN_LOADED, FILTER_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_LOADED, FILTER_PEGAWAI_LOADED, LIST_PEGAWAI_LOADED, LIST_PEGAWAI_RESET, PAGINATION_PEGAWAI_LOADED, URUT_PEGAWAI_LOADED, FILTER_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_RESET, PAGINATION_STRUKTUR_ORGANISASI_LOADED, URUT_STRUKTUR_ORGANISASI_LOADED, FILTER_PENGEMBAN_JABATAN_LOADED, LIST_PENGEMBAN_JABATAN_LOADED, LIST_PENGEMBAN_JABATAN_RESET, PAGINATION_PENGEMBAN_JABATAN_LOADED, URUT_PENGEMBAN_JABATAN_LOADED, FILTER_GROUP_HAK_AKSES_LOADED, LIST_GROUP_HAK_AKSES_LOADED, LIST_GROUP_HAK_AKSES_RESET, PAGINATION_GROUP_HAK_AKSES_LOADED, URUT_GROUP_HAK_AKSES_LOADED, MENU_TREE_SELECTED_LOADED, MENU_TREE_SELECTED_RESET, MENU_TREE_LOADED, MENU_TREE_RESET, FILTER_USER_LOADED, LIST_USER_LOADED, LIST_USER_RESET, PAGINATION_USER_LOADED, URUT_USER_LOADED, FILTER_AKUN_LOADED, LIST_AKUN_LOADED, LIST_AKUN_RESET, PAGINATION_AKUN_LOADED, URUT_AKUN_LOADED, FILTER_PROYEK_LOADED, LIST_PROYEK_LOADED, LIST_PROYEK_RESET, PAGINATION_PROYEK_LOADED, URUT_PROYEK_LOADED, STATUS_PROYEK_SELECTED_SAVE, STATUS_PROYEK_SELECTED_RESET, FILTER_STATUS_PROYEK_LOADED, LIST_STATUS_PROYEK_LOADED, LIST_STATUS_PROYEK_RESET, PAGINATION_STATUS_PROYEK_LOADED, URUT_STATUS_PROYEK_LOADED, MODE_PROYEK_BARU_LOADED } from "../constants/action-types";


export const setModeProyekBaru = (nilai) => {
    return({type: MODE_PROYEK_BARU_LOADED, payload: nilai});
}

export const setStatusProyekSelected = (nilai) => {
    return({type: STATUS_PROYEK_SELECTED_SAVE, payload: nilai});
}

export const resetStatusProyekSelected = () => {
    return({type: STATUS_PROYEK_SELECTED_RESET, payload: null});
}

export const getMenuTree = (url='', authorization) => {
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
                if(json.status !== 200) {
                    dispatch({ type: MENU_TREE_LOADED, payload: [] });
                }
                else {
                    dispatch({ type: MENU_TREE_LOADED, payload: json.keterangan });
                }
            }
        )
        .catch((e) => {
            dispatch({type: MENU_TREE_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const resetMenuTree = () => {
    return({type: MENU_TREE_RESET, payload: null});
}

export const setMenuTreeSelected = (menuTreeelected) => {
    return ({ type: MENU_TREE_SELECTED_LOADED, payload: menuTreeelected });                
}

export const resetMenuTreeSelected = () => {
    return({type: MENU_TREE_SELECTED_RESET, payload: []});
}

export const getStatusProyek = (url='', authorization) => {
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
                    dispatch({ type: LIST_STATUS_PROYEK_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_STATUS_PROYEK_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_STATUS_PROYEK_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterStatusProyek = (value) => {
    return({type: FILTER_STATUS_PROYEK_LOADED, payload: value});
}

export const setPaginationStatusProyek = (value) => {
    return({type: PAGINATION_STATUS_PROYEK_LOADED, payload: value});
}

export const setUrutStatusProyek = (value) => {
    return({type: URUT_STATUS_PROYEK_LOADED, payload: value});
}

export const getProyek = (url='', authorization) => {
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
                    dispatch({ type: LIST_PROYEK_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_PROYEK_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_PROYEK_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterProyek = (value) => {
    return({type: FILTER_PROYEK_LOADED, payload: value});
}

export const setPaginationProyek = (value) => {
    return({type: PAGINATION_PROYEK_LOADED, payload: value});
}

export const setUrutProyek = (value) => {
    return({type: URUT_PROYEK_LOADED, payload: value});
}

export const getAkun = (url='', authorization) => {
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
                    dispatch({ type: LIST_AKUN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_AKUN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_AKUN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterAkun = (value) => {
    return({type: FILTER_AKUN_LOADED, payload: value});
}

export const setPaginationAkun = (value) => {
    return({type: PAGINATION_AKUN_LOADED, payload: value});
}

export const setUrutAkun = (value) => {
    return({type: URUT_AKUN_LOADED, payload: value});
}

export const getUser = (url='', authorization) => {
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
                    dispatch({ type: LIST_USER_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_USER_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_USER_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterUser = (value) => {
    return({type: FILTER_USER_LOADED, payload: value});
}

export const setPaginationUser = (value) => {
    return({type: PAGINATION_USER_LOADED, payload: value});
}

export const setUrutUser = (value) => {
    return({type: URUT_USER_LOADED, payload: value});
}

export const getGroupHakAkses = (url='', authorization) => {
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
                    dispatch({ type: LIST_GROUP_HAK_AKSES_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_GROUP_HAK_AKSES_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_GROUP_HAK_AKSES_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterGroupHakAkses = (value) => {
    return({type: FILTER_GROUP_HAK_AKSES_LOADED, payload: value});
}

export const setPaginationGroupHakAkses = (value) => {
    return({type: PAGINATION_GROUP_HAK_AKSES_LOADED, payload: value});
}

export const setUrutGroupHakAkses = (value) => {
    return({type: URUT_GROUP_HAK_AKSES_LOADED, payload: value});
}

export const getPengembanJabatan = (url='', authorization) => {
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
                    dispatch({ type: LIST_PENGEMBAN_JABATAN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_PENGEMBAN_JABATAN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_PENGEMBAN_JABATAN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterPengembanJabatan = (value) => {
    return({type: FILTER_PENGEMBAN_JABATAN_LOADED, payload: value});
}

export const setPaginationPengembanJabatan = (value) => {
    return({type: PAGINATION_PENGEMBAN_JABATAN_LOADED, payload: value});
}

export const setUrutPengembanJabatan = (value) => {
    return({type: URUT_PENGEMBAN_JABATAN_LOADED, payload: value});
}

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
            // dispatch({type: CREDENTIAL_RESET});
            // dispatch({type: UNAUTHORIZATION_RISE});
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