import CryptoJS from 'crypto-js';
import { FILTER_CUSTOMER_LOADED, FILTER_CUSTOMER_RESET, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, PAGINATION_CUSTOMER_RESET, URUT_CUSTOMER_LOADED, URUT_CUSTOMER_RESET, FILTER_BENTUK_USAHA_LOADED, FILTER_BENTUK_USAHA_RESET, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, PAGINATION_BENTUK_USAHA_RESET, URUT_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_RESET, FILTER_JABATAN_LOADED, FILTER_JABATAN_RESET, LIST_JABATAN_LOADED, LIST_JABATAN_RESET, PAGINATION_JABATAN_LOADED, PAGINATION_JABATAN_RESET, URUT_JABATAN_LOADED, URUT_JABATAN_RESET, FILTER_PEGAWAI_LOADED, FILTER_PEGAWAI_RESET, LIST_PEGAWAI_LOADED, LIST_PEGAWAI_RESET, PAGINATION_PEGAWAI_LOADED, PAGINATION_PEGAWAI_RESET, URUT_PEGAWAI_LOADED, URUT_PEGAWAI_RESET, FILTER_STRUKTUR_ORGANISASI_LOADED, FILTER_STRUKTUR_ORGANISASI_RESET, LIST_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_RESET, PAGINATION_STRUKTUR_ORGANISASI_LOADED, PAGINATION_STRUKTUR_ORGANISASI_RESET, URUT_STRUKTUR_ORGANISASI_LOADED, URUT_STRUKTUR_ORGANISASI_RESET } from "../constants/action-types";
import { FILTER_CUSTOMER, LIST_CUSTOMER, MENUS, PAGINATION_CUSTOMER, URUT_CUSTOMER, FILTER_BENTUK_USAHA, LIST_BENTUK_USAHA, PAGINATION_BENTUK_USAHA, URUT_BENTUK_USAHA, FILTER_JABATAN, LIST_JABATAN, PAGINATION_JABATAN, URUT_JABATAN, FILTER_PEGAWAI, LIST_PEGAWAI, PAGINATION_PEGAWAI, URUT_PEGAWAI, FILTER_STRUKTUR_ORGANISASI, LIST_STRUKTUR_ORGANISASI, PAGINATION_STRUKTUR_ORGANISASI, URUT_STRUKTUR_ORGANISASI } from "../constants/master-types";

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
        field: "m.id",
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
    list_jabatan: null,
    filter_jabatan: {
        field: null,
        search: null
    },
    pagination_jabatan: {
        current: 1,
        pageSize: 10,
    },
    urut_jabatan: {
        field: "m.id",
        order: "asc"
    },
    list_pegawai: null,
    filter_pegawai: {
        field: null,
        search: null
    },
    pagination_pegawai: {
        current: 1,
        pageSize: 10,
    },
    urut_pegawai: {
        field: "m.nip",
        order: "asc"
    },
    filter_struktur_organisasi: {
        field: null,
        search: null
    },
    pagination_struktur_organisasi: {
        current: 1,
        pageSize: 10,
    },
    urut_struktur_organisasi: {
        field: "m.id",
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
                field: "m.id",
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
        case FILTER_JABATAN_LOADED:
            return {
                ...state,
                [FILTER_JABATAN]: action.payload
            };
        case FILTER_JABATAN_RESET:
            let tmpFilterJabatan = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_JABATAN]: {...tmpFilterJabatan}
            };
        case LIST_JABATAN_LOADED:
            return {
                ...state,
                [LIST_JABATAN]: action.payload
            };  
        case LIST_JABATAN_RESET:
            return {
                ...state,
                [LIST_JABATAN]: null
            };      
        case PAGINATION_JABATAN_LOADED:
            return {
                ...state,
                [PAGINATION_JABATAN]: action.payload
            };
        case PAGINATION_JABATAN_RESET:
            let tmpPaginationJabatan = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_JABATAN]: {...tmpPaginationJabatan}
            };
        case URUT_JABATAN_LOADED:
            return {
                ...state,
                [URUT_JABATAN]: action.payload
            };
        case URUT_JABATAN_RESET:
            let tmpUrutJabatan = {
                field: "m.id",
                order: "asc"
            }
            return {
                ...state,
                [URUT_JABATAN]: {...tmpUrutJabatan}
            };            
        case FILTER_PEGAWAI_LOADED:
            return {
                ...state,
                [FILTER_PEGAWAI]: action.payload
            };
        case FILTER_PEGAWAI_RESET:
            let tmpFilterPegawai = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_PEGAWAI]: {...tmpFilterPegawai}
            };
        case LIST_PEGAWAI_LOADED:
            return {
                ...state,
                [LIST_PEGAWAI]: action.payload
            };  
        case LIST_PEGAWAI_RESET:
            return {
                ...state,
                [LIST_PEGAWAI]: null
            };      
        case PAGINATION_PEGAWAI_LOADED:
            return {
                ...state,
                [PAGINATION_PEGAWAI]: action.payload
            };
        case PAGINATION_PEGAWAI_RESET:
            let tmpPaginationPEGAWAI = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_PEGAWAI]: {...tmpPaginationPEGAWAI}
            };
        case URUT_PEGAWAI_LOADED:
            return {
                ...state,
                [URUT_PEGAWAI]: action.payload
            };
        case URUT_PEGAWAI_RESET:
            let tmpUrutPegawai = {
                field: "m.nip",
                order: "asc"
            }
            return {
                ...state,
                [URUT_PEGAWAI]: {...tmpUrutPegawai}
            };
        case FILTER_STRUKTUR_ORGANISASI_LOADED:
            return {
                ...state,
                [FILTER_STRUKTUR_ORGANISASI]: action.payload
            };
        case FILTER_STRUKTUR_ORGANISASI_RESET:
            let tmpFilterStrukturOrganisasi = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_STRUKTUR_ORGANISASI]: {...tmpFilterStrukturOrganisasi}
            };
        case LIST_STRUKTUR_ORGANISASI_LOADED:
            return {
                ...state,
                [LIST_STRUKTUR_ORGANISASI]: action.payload
            };  
        case LIST_STRUKTUR_ORGANISASI_RESET:
            return {
                ...state,
                [LIST_STRUKTUR_ORGANISASI]: null
            };      
        case PAGINATION_STRUKTUR_ORGANISASI_LOADED:
            return {
                ...state,
                [PAGINATION_STRUKTUR_ORGANISASI]: action.payload
            };
        case PAGINATION_STRUKTUR_ORGANISASI_RESET:
            let tmpPaginationStrukturOrganisasi = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_STRUKTUR_ORGANISASI]: {...tmpPaginationStrukturOrganisasi}
            };
        case URUT_STRUKTUR_ORGANISASI_LOADED:
            return {
                ...state,
                [URUT_STRUKTUR_ORGANISASI]: action.payload
            };
        case URUT_STRUKTUR_ORGANISASI_RESET:
            let tmpUrutStrukturOrganisasi = {
                field: "m.id",
                order: "asc"
            }
            return {
                ...state,
                [URUT_STRUKTUR_ORGANISASI]: {...tmpUrutStrukturOrganisasi}
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