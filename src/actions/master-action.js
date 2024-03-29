import { CREDENTIAL_RESET, FILTER_CUSTOMER_LOADED, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, UNAUTHORIZATION_RISE, URUT_CUSTOMER_LOADED, FILTER_JABATAN_LOADED, LIST_JABATAN_LOADED, LIST_JABATAN_RESET, PAGINATION_JABATAN_LOADED, URUT_JABATAN_LOADED, FILTER_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_LOADED, FILTER_PEGAWAI_LOADED, LIST_PEGAWAI_LOADED, LIST_PEGAWAI_RESET, PAGINATION_PEGAWAI_LOADED, URUT_PEGAWAI_LOADED, FILTER_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_RESET, PAGINATION_STRUKTUR_ORGANISASI_LOADED, URUT_STRUKTUR_ORGANISASI_LOADED, FILTER_PENGEMBAN_JABATAN_LOADED, LIST_PENGEMBAN_JABATAN_LOADED, LIST_PENGEMBAN_JABATAN_RESET, PAGINATION_PENGEMBAN_JABATAN_LOADED, URUT_PENGEMBAN_JABATAN_LOADED, FILTER_GROUP_HAK_AKSES_LOADED, LIST_GROUP_HAK_AKSES_LOADED, LIST_GROUP_HAK_AKSES_RESET, PAGINATION_GROUP_HAK_AKSES_LOADED, URUT_GROUP_HAK_AKSES_LOADED, MENU_TREE_SELECTED_LOADED, MENU_TREE_SELECTED_RESET, MENU_TREE_LOADED, MENU_TREE_RESET, FILTER_USER_LOADED, LIST_USER_LOADED, LIST_USER_RESET, PAGINATION_USER_LOADED, URUT_USER_LOADED, FILTER_AKUN_LOADED, LIST_AKUN_LOADED, LIST_AKUN_RESET, PAGINATION_AKUN_LOADED, URUT_AKUN_LOADED, FILTER_PROYEK_LOADED, FILTER_PROYEK_RESET, LIST_PROYEK_LOADED, LIST_PROYEK_RESET, PAGINATION_PROYEK_LOADED, URUT_PROYEK_LOADED, STATUS_PROYEK_SELECTED_SAVE, STATUS_PROYEK_SELECTED_RESET, FILTER_STATUS_PROYEK_LOADED, LIST_STATUS_PROYEK_LOADED, LIST_STATUS_PROYEK_RESET, PAGINATION_STATUS_PROYEK_LOADED, URUT_STATUS_PROYEK_LOADED, MODE_PROYEK_BARU_LOADED, ITEM_MENU_SELECTED_LOADED, ITEM_PROYEK_SELECTED_LOADED, ITEM_PROYEK_SELECTED_RESET, FILTER_PROPINSI_LOADED, LIST_PROPINSI_LOADED, LIST_PROPINSI_RESET, PAGINATION_PROPINSI_LOADED, URUT_PROPINSI_LOADED, FILTER_KABUPATEN_LOADED, LIST_KABUPATEN_LOADED, LIST_KABUPATEN_RESET, PAGINATION_KABUPATEN_LOADED, URUT_KABUPATEN_LOADED, FILTER_KECAMATAN_LOADED, LIST_KECAMATAN_LOADED, LIST_KECAMATAN_RESET, PAGINATION_KECAMATAN_LOADED, URUT_KECAMATAN_LOADED, FILTER_DESA_LOADED, LIST_DESA_LOADED, LIST_DESA_RESET, PAGINATION_DESA_LOADED, URUT_DESA_LOADED, FILTER_JENIS_PROYEK_LOADED, LIST_JENIS_PROYEK_LOADED, LIST_JENIS_PROYEK_RESET, PAGINATION_JENIS_PROYEK_LOADED, URUT_JENIS_PROYEK_LOADED, FILTER_BUDGET_LOADED, LIST_BUDGET_LOADED, LIST_BUDGET_RESET, PAGINATION_BUDGET_LOADED, URUT_BUDGET_LOADED, FILTER_STATUS_PENGAJUAN_LOADED, LIST_STATUS_PENGAJUAN_LOADED, LIST_STATUS_PENGAJUAN_RESET, PAGINATION_STATUS_PENGAJUAN_LOADED, URUT_STATUS_PENGAJUAN_LOADED, FILTER_PENGAJUAN_LOADED, LIST_PENGAJUAN_LOADED, LIST_PENGAJUAN_RESET, PAGINATION_PENGAJUAN_LOADED, URUT_PENGAJUAN_LOADED, MODE_PENGAJUAN_BARU_LOADED, MODE_TRANSAKSI_BARU_LOADED, ITEM_PENGAJUAN_SELECTED_LOADED, ITEM_PENGAJUAN_SELECTED_RESET, IS_PROGRESS_SET, FILTER_AKUN_RESET, FILTER_JENIS_TRANSAKSI_LOADED, JENIS_TRANSAKSI_LOADED, JENIS_TRANSAKSI_RESET, PAGINATION_JENIS_TRANSAKSI_LOADED, URUT_JENIS_TRANSAKSI_LOADED, FILTER_TRANSAKSI_LOADED, LIST_TRANSAKSI_LOADED, LIST_TRANSAKSI_RESET, PAGINATION_TRANSAKSI_LOADED, URUT_TRANSAKSI_LOADED, ITEM_TRANSAKSI_SELECTED_LOADED, ITEM_TRANSAKSI_SELECTED_RESET } from "../constants/action-types";


export const setIsProgress = (value) => {
    return ({type: IS_PROGRESS_SET, payload: value});
}

export const getStatusPengajuan = (url='', authorization) => {
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
                    dispatch({ type: LIST_STATUS_PENGAJUAN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_STATUS_PENGAJUAN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_STATUS_PENGAJUAN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterStatusPengajuan = (value) => {
    return({type: FILTER_STATUS_PENGAJUAN_LOADED, payload: value});
}

export const setPaginationStatusPengajuan = (value) => {
    return({type: PAGINATION_STATUS_PENGAJUAN_LOADED, payload: value});
}

export const setUrutStatusPengajuan = (value) => {
    return({type: URUT_STATUS_PENGAJUAN_LOADED, payload: value});
}

export const setItemMenuSelected = (nilai) => {
    return({type: ITEM_MENU_SELECTED_LOADED, payload: nilai});
}

export const setItemPengajuanSelected = (nilai) => {
    return({type: ITEM_PENGAJUAN_SELECTED_LOADED, payload: nilai});
}

export const resetItemPengajuanSelected = () => {
    return({type: ITEM_PENGAJUAN_SELECTED_RESET, payload: null});
}

export const setItemProyekSelected = (url='', authorization) => {
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
                    dispatch({ type: ITEM_PROYEK_SELECTED_LOADED, payload: null });
                }
                else {
                    dispatch({ type: ITEM_PROYEK_SELECTED_LOADED, payload: json.keterangan });
                }
            }
        )
        .catch((e) => {
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const resetItemProyekSelected = () => {
    return({type: ITEM_PROYEK_SELECTED_RESET, payload: null});
}

export const setItemTransaksiSelected = (url='', authorization) => {
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
                    dispatch({ type: ITEM_TRANSAKSI_SELECTED_LOADED, payload: null });
                }
                else {
                    dispatch({ type: ITEM_TRANSAKSI_SELECTED_LOADED, payload: json.keterangan });
                }
            }
        )
        .catch((e) => {
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const resetItemTransaksiSelected = () => {
    return({type: ITEM_TRANSAKSI_SELECTED_RESET, payload: null});
}

export const setModePengajuanBaru = (nilai) => {
    return({type: MODE_PENGAJUAN_BARU_LOADED, payload: nilai});
}

export const setModeTransaksiBaru = (nilai) => {
    return({type: MODE_TRANSAKSI_BARU_LOADED, payload: nilai});
}

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

export const getPropinsi = (url='', authorization) => {
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
                    dispatch({ type: LIST_PROPINSI_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_PROPINSI_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_PROPINSI_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterPropinsi = (value) => {
    return({type: FILTER_PROPINSI_LOADED, payload: value});
}

export const setPaginationPropinsi = (value) => {
    return({type: PAGINATION_PROPINSI_LOADED, payload: value});
}

export const setUrutPropinsi = (value) => {
    return({type: URUT_PROPINSI_LOADED, payload: value});
}

export const getKabupaten = (url='', authorization) => {
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
                    dispatch({ type: LIST_KABUPATEN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_KABUPATEN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_KABUPATEN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterKabupaten = (value) => {
    return({type: FILTER_KABUPATEN_LOADED, payload: value});
}

export const setPaginationKabupaten = (value) => {
    return({type: PAGINATION_KABUPATEN_LOADED, payload: value});
}

export const setUrutKabupaten = (value) => {
    return({type: URUT_KABUPATEN_LOADED, payload: value});
}

export const getKecamatan = (url='', authorization) => {
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
                    dispatch({ type: LIST_KECAMATAN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_KECAMATAN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_KECAMATAN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterKecamatan = (value) => {
    return({type: FILTER_KECAMATAN_LOADED, payload: value});
}

export const setPaginationKecamatan = (value) => {
    return({type: PAGINATION_KECAMATAN_LOADED, payload: value});
}

export const setUrutKecamatan = (value) => {
    return({type: URUT_KECAMATAN_LOADED, payload: value});
}

export const getDesa = (url='', authorization) => {
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
                    dispatch({ type: LIST_DESA_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_DESA_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_DESA_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterDesa = (value) => {
    return({type: FILTER_DESA_LOADED, payload: value});
}

export const setPaginationDesa = (value) => {
    return({type: PAGINATION_DESA_LOADED, payload: value});
}

export const setUrutDesa = (value) => {
    return({type: URUT_DESA_LOADED, payload: value});
}

export const getJenisProyek = (url='', authorization) => {
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
                    dispatch({ type: LIST_JENIS_PROYEK_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_JENIS_PROYEK_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_JENIS_PROYEK_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterJenisProyek = (value) => {
    return({type: FILTER_JENIS_PROYEK_LOADED, payload: value});
}

export const setPaginationJenisProyek = (value) => {
    return({type: PAGINATION_JENIS_PROYEK_LOADED, payload: value});
}

export const setUrutJenisProyek = (value) => {
    return({type: URUT_JENIS_PROYEK_LOADED, payload: value});
}

export const getBudget = (url='', authorization) => {
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
                    dispatch({ type: LIST_BUDGET_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_BUDGET_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: LIST_BUDGET_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterBudget = (value) => {
    return({type: FILTER_BUDGET_LOADED, payload: value});
}

export const setPaginationBudget = (value) => {
    return({type: PAGINATION_BUDGET_LOADED, payload: value});
}

export const setUrutBudget = (value) => {
    return({type: URUT_BUDGET_LOADED, payload: value});
}

export const getJenisTransaksi = (url='', authorization) => {
    return (dispatch) => {
        dispatch({type: IS_PROGRESS_SET, payload: true});
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
                dispatch({type: IS_PROGRESS_SET, payload: false});
                if(json.status === 200 ) {
                    dispatch({ type: JENIS_TRANSAKSI_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: JENIS_TRANSAKSI_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: IS_PROGRESS_SET, payload: false});
            dispatch({type: JENIS_TRANSAKSI_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterJenisTransaksi = (value) => {
    return({type: FILTER_JENIS_TRANSAKSI_LOADED, payload: value});
}

export const setPaginationJenisTransaksi = (value) => {
    return({type: PAGINATION_JENIS_TRANSAKSI_LOADED, payload: value});
}

export const setUrutJenisTransaksi = (value) => {
    return({type: URUT_JENIS_TRANSAKSI_LOADED, payload: value});
}

export const getPengajuan = (url='', authorization) => {
    return (dispatch) => {
        dispatch({type: IS_PROGRESS_SET, payload: true});
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
                dispatch({type: IS_PROGRESS_SET, payload: false});
                if(json.status === 200 ) {
                    dispatch({ type: LIST_PENGAJUAN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_PENGAJUAN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: IS_PROGRESS_SET, payload: false});
            dispatch({type: LIST_PENGAJUAN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterPengajuan = (value) => {
    return({type: FILTER_PENGAJUAN_LOADED, payload: value});
}

export const setPaginationPengajuan = (value) => {
    return({type: PAGINATION_PENGAJUAN_LOADED, payload: value});
}

export const setUrutPengajuan = (value) => {
    return({type: URUT_PENGAJUAN_LOADED, payload: value});
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
        dispatch({type: IS_PROGRESS_SET, payload: true});   
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
                dispatch({type: IS_PROGRESS_SET, payload: false});  
                if(json.status === 200 ) {
                    dispatch({ type: LIST_PROYEK_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_PROYEK_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: IS_PROGRESS_SET, payload: false});
            dispatch({type: LIST_PROYEK_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterProyek = (value) => {
    return({type: FILTER_PROYEK_LOADED, payload: value});
}

export const resetFilterProyek = () => {
    return({type: FILTER_PROYEK_RESET, payload: null});
}

export const setPaginationProyek = (value) => {
    return({type: PAGINATION_PROYEK_LOADED, payload: value});
}

export const setUrutProyek = (value) => {
    return({type: URUT_PROYEK_LOADED, payload: value});
}

export const getTransaksi = (url='', authorization) => {    
    return (dispatch) => {     
        dispatch({type: IS_PROGRESS_SET, payload: true});   
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
                dispatch({type: IS_PROGRESS_SET, payload: false});  
                if(json.status === 200 ) {
                    dispatch({ type: LIST_TRANSAKSI_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_TRANSAKSI_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: IS_PROGRESS_SET, payload: false});
            dispatch({type: LIST_TRANSAKSI_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterTransaksi = (value) => {
    return({type: FILTER_TRANSAKSI_LOADED, payload: value});
}

export const setPaginationTransaksi = (value) => {
    return({type: PAGINATION_TRANSAKSI_LOADED, payload: value});
}

export const setUrutTransaksi = (value) => {
    return({type: URUT_TRANSAKSI_LOADED, payload: value});
}

export const getAkun = (url='', authorization) => {
    return (dispatch) => {
        dispatch({type: IS_PROGRESS_SET, payload: true});
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
                dispatch({type: IS_PROGRESS_SET, payload: false});   
                if(json.status === 200 ) {
                    dispatch({ type: LIST_AKUN_LOADED, payload: json.keterangan });
                }
                else {
                    dispatch({ type: LIST_AKUN_LOADED, payload: null });                    
                }
            }
        )
        .catch((e) => {
            dispatch({type: IS_PROGRESS_SET, payload: false});
            dispatch({type: LIST_AKUN_RESET}); 
            dispatch({type: CREDENTIAL_RESET});
            dispatch({type: UNAUTHORIZATION_RISE});
        });
    };
}

export const setFilterAkun = (value) => {
    return({type: FILTER_AKUN_LOADED, payload: value});
}

export const resetFilterAkun = () => {
    return({type: FILTER_AKUN_RESET, payload: null});
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