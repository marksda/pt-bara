import ActionButton from 'antd/lib/modal/ActionButton';
import CryptoJS from 'crypto-js';
import { FILTER_CUSTOMER_LOADED, FILTER_CUSTOMER_RESET, LIST_CUSTOMER_LOADED, LIST_CUSTOMER_RESET, MENU_LOADED, PAGINATION_CUSTOMER_LOADED, PAGINATION_CUSTOMER_RESET, URUT_CUSTOMER_LOADED, URUT_CUSTOMER_RESET, FILTER_BENTUK_USAHA_LOADED, FILTER_BENTUK_USAHA_RESET, LIST_BENTUK_USAHA_LOADED, LIST_BENTUK_USAHA_RESET, PAGINATION_BENTUK_USAHA_LOADED, PAGINATION_BENTUK_USAHA_RESET, URUT_BENTUK_USAHA_LOADED, URUT_BENTUK_USAHA_RESET, FILTER_JABATAN_LOADED, FILTER_JABATAN_RESET, LIST_JABATAN_LOADED, LIST_JABATAN_RESET, PAGINATION_JABATAN_LOADED, PAGINATION_JABATAN_RESET, URUT_JABATAN_LOADED, URUT_JABATAN_RESET, FILTER_PEGAWAI_LOADED, FILTER_PEGAWAI_RESET, LIST_PEGAWAI_LOADED, LIST_PEGAWAI_RESET, PAGINATION_PEGAWAI_LOADED, PAGINATION_PEGAWAI_RESET, URUT_PEGAWAI_LOADED, URUT_PEGAWAI_RESET, FILTER_STRUKTUR_ORGANISASI_LOADED, FILTER_STRUKTUR_ORGANISASI_RESET, LIST_STRUKTUR_ORGANISASI_LOADED, LIST_STRUKTUR_ORGANISASI_RESET, PAGINATION_STRUKTUR_ORGANISASI_LOADED, PAGINATION_STRUKTUR_ORGANISASI_RESET, URUT_STRUKTUR_ORGANISASI_LOADED, URUT_STRUKTUR_ORGANISASI_RESET, FILTER_PENGEMBAN_JABATAN_LOADED, FILTER_PENGEMBAN_JABATAN_RESET, LIST_PENGEMBAN_JABATAN_LOADED, LIST_PENGEMBAN_JABATAN_RESET, PAGINATION_PENGEMBAN_JABATAN_LOADED, PAGINATION_PENGEMBAN_JABATAN_RESET, URUT_PENGEMBAN_JABATAN_LOADED, URUT_PENGEMBAN_JABATAN_RESET, FILTER_GROUP_HAK_AKSES_LOADED, FILTER_GROUP_HAK_AKSES_RESET, LIST_GROUP_HAK_AKSES_LOADED, LIST_GROUP_HAK_AKSES_RESET, PAGINATION_GROUP_HAK_AKSES_LOADED, PAGINATION_GROUP_HAK_AKSES_RESET, URUT_GROUP_HAK_AKSES_LOADED, URUT_GROUP_HAK_AKSES_RESET, MENU_TREE_SELECTED_LOADED, MENU_TREE_SELECTED_RESET, MENU_TREE_LOADED, MENU_TREE_RESET, FILTER_USER_LOADED, FILTER_USER_RESET, LIST_USER_LOADED, LIST_USER_RESET, PAGINATION_USER_LOADED, PAGINATION_USER_RESET, URUT_USER_LOADED, URUT_USER_RESET, FILTER_AKUN_LOADED, FILTER_AKUN_RESET, LIST_AKUN_LOADED, LIST_AKUN_RESET, PAGINATION_AKUN_LOADED, PAGINATION_AKUN_RESET, URUT_AKUN_LOADED, URUT_AKUN_RESET, FILTER_PROYEK_LOADED, FILTER_PROYEK_RESET, LIST_PROYEK_LOADED, LIST_PROYEK_RESET, PAGINATION_PROYEK_LOADED, PAGINATION_PROYEK_RESET, URUT_PROYEK_LOADED, URUT_PROYEK_RESET, STATUS_PROYEK_SELECTED_SAVE, STATUS_PROYEK_SELECTED_RESET, FILTER_STATUS_PROYEK_LOADED, FILTER_STATUS_PROYEK_RESET, LIST_STATUS_PROYEK_LOADED, LIST_STATUS_PROYEK_RESET, PAGINATION_STATUS_PROYEK_LOADED, PAGINATION_STATUS_PROYEK_RESET, URUT_STATUS_PROYEK_LOADED, URUT_STATUS_PROYEK_RESET, MODE_PROYEK_BARU_LOADED, ITEM_MENU_SELECTED_LOADED, ITEM_PROYEK_SELECTED_LOADED, ITEM_PROYEK_SELECTED_RESET } from "../constants/action-types";
import { FILTER_CUSTOMER, LIST_CUSTOMER, MENUS, PAGINATION_CUSTOMER, URUT_CUSTOMER, FILTER_BENTUK_USAHA, LIST_BENTUK_USAHA, PAGINATION_BENTUK_USAHA, URUT_BENTUK_USAHA, FILTER_JABATAN, LIST_JABATAN, PAGINATION_JABATAN, URUT_JABATAN, FILTER_PEGAWAI, LIST_PEGAWAI, PAGINATION_PEGAWAI, URUT_PEGAWAI, FILTER_STRUKTUR_ORGANISASI, LIST_STRUKTUR_ORGANISASI, PAGINATION_STRUKTUR_ORGANISASI, URUT_STRUKTUR_ORGANISASI, FILTER_PENGEMBAN_JABATAN, LIST_PENGEMBAN_JABATAN, PAGINATION_PENGEMBAN_JABATAN, URUT_PENGEMBAN_JABATAN, FILTER_GROUP_HAK_AKSES, LIST_GROUP_HAK_AKSES, PAGINATION_GROUP_HAK_AKSES, URUT_GROUP_HAK_AKSES, MENU_TREE, MENU_TREE_SELECTED, FILTER_USER, LIST_USER, PAGINATION_USER, URUT_USER, FILTER_AKUN, LIST_AKUN, PAGINATION_AKUN, URUT_AKUN, FILTER_PROYEK, LIST_PROYEK, PAGINATION_PROYEK, URUT_PROYEK, STATUS_PROYEK_SELECTED, FILTER_STATUS_PROYEK, LIST_STATUS_PROYEK, PAGINATION_STATUS_PROYEK, URUT_STATUS_PROYEK, MODE_PROYEK_BARU, ITEM_PROYEK_SELECTED, ITEM_MENU_SELECTED, ITEM_PROYEK_SELECTED } from "../constants/master-types";

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
    list_struktur_organisasi: null,
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
    list_pengemban_jabatan: null,
    filter_pengemban_jabatan: {
        field: null,
        search: null
    },
    pagination_pengemban_jabatan: {
        current: 1,
        pageSize: 10,
    },
    urut_pengemban_jabatan: {
        field: "m.id_struktur_organisasi",
        order: "asc"
    },
    list_group_hak_akses: null,
    filter_group_hak_akses: {
        field: null,
        search: null
    },
    pagination_group_hak_akses: {
        current: 1,
        pageSize: 10,
    },
    urut_group_hak_akses: {
        field: "m.id",
        order: "asc"
    },
    list_user: null,
    filter_user: {
        field: null,
        search: null
    },
    pagination_user: {
        current: 1,
        pageSize: 10,
    },
    urut_user: {
        field: "m.id",
        order: "asc"
    },
    list_akun: null,
    filter_akun: {
        field: null,
        search: null
    },
    pagination_akun: {
        current: 1,
        pageSize: 100,
    },
    urut_akun: {
        field: "m.id",
        order: "asc"
    },
    list_proyek: null,
    filter_proyek:  {
        field: null,
        search: null
    },
    pagination_proyek: {
        current: 1,
        pageSize: 100,
    },
    urut_proyek: {
        field: "m.no_job",
        order: "asc"
    },
    list_status_proyek: null,
    filter_status_proyek: {
        field: null,
        search: null
    },
    pagination_status_proyek: {
        current: 1,
        pageSize: 10,
    },
    urut_status_proyek: {
        field: "m.id",
        order: "asc"
    },
    menu_tree:[],
    menu_tree_selected:[],
    status_proyek_selected: '01',
    mode_proyek_baru: 'add',
    item_proyek_selected: null,
    item_menu_selected: null,
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
                [MENUS]: [...action.payload],
                [ITEM_MENU_SELECTED]: action.payload[0].menu_item[0].nama
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
        case FILTER_PENGEMBAN_JABATAN_LOADED:
            return {
                ...state,
                [FILTER_PENGEMBAN_JABATAN]: action.payload
            };
        case FILTER_PENGEMBAN_JABATAN_RESET:
            let tmpFilterPengembanJabatan = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_PENGEMBAN_JABATAN]: {...tmpFilterPengembanJabatan}
            };
        case LIST_PENGEMBAN_JABATAN_LOADED:
            return {
                ...state,
                [LIST_PENGEMBAN_JABATAN]: action.payload
            };  
        case LIST_PENGEMBAN_JABATAN_RESET:
            return {
                ...state,
                [LIST_PENGEMBAN_JABATAN]: null
            };      
        case PAGINATION_PENGEMBAN_JABATAN_LOADED:
            return {
                ...state,
                [PAGINATION_PENGEMBAN_JABATAN]: action.payload
            };
        case PAGINATION_PENGEMBAN_JABATAN_RESET:
            let tmpPaginationPengembanJabatan = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_PENGEMBAN_JABATAN]: {...tmpPaginationPengembanJabatan}
            };
        case URUT_PENGEMBAN_JABATAN_LOADED:
            return {
                ...state,
                [URUT_PENGEMBAN_JABATAN]: action.payload
            };
        case URUT_PENGEMBAN_JABATAN_RESET:
            let tmpUrutPengembanJabatan = {
                field: "m.id_pengemban_jabatan",
                order: "asc"
            }
            return {
                ...state,
                [URUT_PENGEMBAN_JABATAN]: {...tmpUrutPengembanJabatan}
            };  
        case FILTER_GROUP_HAK_AKSES_LOADED:
            return {
                ...state,
                [FILTER_GROUP_HAK_AKSES]: action.payload
            };
        case FILTER_GROUP_HAK_AKSES_RESET:
            let tmpFilterGroupHakAkses = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_GROUP_HAK_AKSES]: {...tmpFilterGroupHakAkses}
            };
        case LIST_GROUP_HAK_AKSES_LOADED:
            return {
                ...state,
                [LIST_GROUP_HAK_AKSES]: action.payload
            };  
        case LIST_GROUP_HAK_AKSES_RESET:
            return {
                ...state,
                [LIST_GROUP_HAK_AKSES]: null
            };      
        case PAGINATION_GROUP_HAK_AKSES_LOADED:
            return {
                ...state,
                [PAGINATION_GROUP_HAK_AKSES]: action.payload
            };
        case PAGINATION_GROUP_HAK_AKSES_RESET:
            let tmpPaginationGroupHakAkses = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_GROUP_HAK_AKSES]: {...tmpPaginationGroupHakAkses}
            };
        case URUT_GROUP_HAK_AKSES_LOADED:
            return {
                ...state,
                [URUT_GROUP_HAK_AKSES]: action.payload
            };
        case URUT_GROUP_HAK_AKSES_RESET:
            let tmpUrutGroupHakAkses = {
                field: "m.id",
                order: "asc"
            }
            return {
                ...state,
                [URUT_GROUP_HAK_AKSES]: {...tmpUrutGroupHakAkses}
            };   
        case FILTER_USER_LOADED:
            return {
                ...state,
                [FILTER_USER]: action.payload
            };
        case FILTER_USER_RESET:
            let tmpFilterUser = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_USER]: {...tmpFilterUser}
            };
        case LIST_USER_LOADED:
            return {
                ...state,
                [LIST_USER]: action.payload
            };  
        case LIST_USER_RESET:
            return {
                ...state,
                [LIST_USER]: null
            };      
        case PAGINATION_USER_LOADED:
            return {
                ...state,
                [PAGINATION_USER]: action.payload
            };
        case PAGINATION_USER_RESET:
            let tmpPaginationUser = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_USER]: {...tmpPaginationUser}
            };
        case URUT_USER_LOADED:
            return {
                ...state,
                [URUT_USER]: action.payload
            };
        case URUT_USER_RESET:
            let tmpUrutUser = {
                field: "m.id",
                order: "asc"
            }
            return {
                ...state,
                [URUT_USER]: {...tmpUrutUser}
            };   
        case FILTER_AKUN_LOADED:
            return {
                ...state,
                [FILTER_AKUN]: action.payload
            };
        case FILTER_AKUN_RESET:
            let tmpFilterAKUN = {
                field: null,
                search: null
            }
            return {
                ...state,
                [FILTER_AKUN]: {...tmpFilterAKUN}
            };
        case LIST_AKUN_LOADED:
            return {
                ...state,
                [LIST_AKUN]: action.payload
            };  
        case LIST_AKUN_RESET:
            return {
                ...state,
                [LIST_AKUN]: null
            };      
        case PAGINATION_AKUN_LOADED:
            return {
                ...state,
                [PAGINATION_AKUN]: {...action.payload}
            };
        case PAGINATION_AKUN_RESET:
            let tmpPaginationAKUN = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_AKUN]: {...tmpPaginationAKUN}
            };
        case URUT_AKUN_LOADED:
            return {
                ...state,
                [URUT_AKUN]: action.payload
            };
        case URUT_AKUN_RESET:
            let tmpUrutAKUN = {
                field: "m.id",
                order: "asc"
            }
            return {
                ...state,
                [URUT_AKUN]: {...tmpUrutAKUN}
            };   
            break;
        case FILTER_PROYEK_LOADED:
            return {
                ...state,
                [FILTER_PROYEK]: action.payload
            };
        case FILTER_PROYEK_RESET:
            return {
                ...state,
                [FILTER_PROYEK]: []
            };
        case LIST_PROYEK_LOADED:
            return {
                ...state,
                [LIST_PROYEK]: action.payload
            };  
        case LIST_PROYEK_RESET:
            return {
                ...state,
                [LIST_PROYEK]: null
            };      
        case PAGINATION_PROYEK_LOADED:
            return {
                ...state,
                [PAGINATION_PROYEK]: {...action.payload}
            };
        case PAGINATION_PROYEK_RESET:
            let tmpPaginationPROYEK = {
                current: 1,
                pageSize: 100,
            }
            return {
                ...state,
                [PAGINATION_PROYEK]: {...tmpPaginationPROYEK}
            };
        case URUT_PROYEK_LOADED:
            return {
                ...state,
                [URUT_PROYEK]: action.payload
            };
        case URUT_PROYEK_RESET:
            let tmpUrutPROYEK = {
                field: "m.no_job",
                order: "asc"
            }
            return {
                ...state,
                [URUT_PROYEK]: {...tmpUrutPROYEK}
            };   
            break;    
        case FILTER_STATUS_PROYEK_LOADED:
            return {
                ...state,
                [FILTER_STATUS_PROYEK]: action.payload
            };
        case FILTER_STATUS_PROYEK_RESET:
            return {
                ...state,
                [FILTER_STATUS_PROYEK]: []
            };
        case LIST_STATUS_PROYEK_LOADED:
            return {
                ...state,
                [LIST_STATUS_PROYEK]: action.payload
            };  
        case LIST_STATUS_PROYEK_RESET:
            return {
                ...state,
                [LIST_STATUS_PROYEK]: null
            };      
        case PAGINATION_STATUS_PROYEK_LOADED:
            return {
                ...state,
                [PAGINATION_STATUS_PROYEK]: {...action.payload}
            };
        case PAGINATION_STATUS_PROYEK_RESET:
            let tmpPaginationSTATUS_PROYEK = {
                current: 1,
                pageSize: 10,
            }
            return {
                ...state,
                [PAGINATION_STATUS_PROYEK]: {...tmpPaginationSTATUS_PROYEK}
            };
        case URUT_STATUS_PROYEK_LOADED:
            return {
                ...state,
                [URUT_STATUS_PROYEK]: action.payload
            };
        case URUT_STATUS_PROYEK_RESET:
            let tmpUrutSTATUS_PROYEK = {
                field: "m.id",
                order: "asc"
            }
            return {
                ...state,
                [URUT_STATUS_PROYEK]: {...tmpUrutSTATUS_PROYEK}
            };   
            break;    
        case MENU_TREE_LOADED:
            return {
                ...state,
                [MENU_TREE]: action.payload
            };
            break;
        case MENU_TREE_RESET:
            return {
                ...state,
                [MENU_TREE]: null
            };  
            break;
        case MENU_TREE_SELECTED_LOADED:
            return {
                ...state,
                [MENU_TREE_SELECTED]: action.payload
            };
            break;
        case MENU_TREE_SELECTED_RESET:
            return {
                ...state,
                [MENU_TREE_SELECTED]: []
            };
            break;
        case STATUS_PROYEK_SELECTED_SAVE:
            return {
                ...state,
                [STATUS_PROYEK_SELECTED]: action.payload
            };
            break;
        case STATUS_PROYEK_SELECTED_RESET:
            return {
                ...state,
                [STATUS_PROYEK_SELECTED]: '01'
            }; 
            break;
        case MODE_PROYEK_BARU_LOADED:
            return {
                ...state,
                [MODE_PROYEK_BARU]: action.payload
            }; 
            break;
        case ITEM_MENU_SELECTED_LOADED:
            return {
                ...state,
                [ITEM_MENU_SELECTED]: action.payload
            }; 
            break;
        case ITEM_PROYEK_SELECTED_LOADED:
            return {
                ...state,
                [ITEM_PROYEK_SELECTED]: action.payload
            }; 
            break;
        case ITEM_PROYEK_SELECTED_RESET:
            return {
                ...state,
                [ITEM_PROYEK_SELECTED]: null
            }; 
            break;
        default:
            let menuLoaded = loadLocalMenuFromStorage();
            if(menuLoaded.length > 0){
                return {
                    ...state,
                    [MENUS]: [...menuLoaded],
                    [ITEM_MENU_SELECTED]: menuLoaded[0].menu_item[0].nama
                }
            }
            else {
                return state;                    
            }
            break;
    }
}