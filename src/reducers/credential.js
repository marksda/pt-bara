import CryptoJS from 'crypto-js';
import { CREDENTIAL_LOADED, CREDENTIAL_RESET, USER_LOADED } from "../constants/action-types";
import { CREDENTIAL, HEADER_AUTHORIZATION, USER_PROFILE } from "../constants/master-types";

const initialState = {
    user_profile: {
        accountId: null,
        accountRealName: null
    },
    credential_profile: {
        id: 0,
        token: null
    },
    header_authorization: {
        Authorization: 'invalid'
    }
}

const loadLocalCredentialStorage = () => {
    let tmpData = window.localStorage.getItem('{$2a$04$uNYaQhd6v9Em48tVM/duVOYI6L1AdCMdPNvKdMJ0/mQxnmsRIN0G2}');
    if(tmpData !== null){
        let bytes  = CryptoJS.AES.decrypt(tmpData.toString(), 'e4ac72eb583f85965fbaa52641546107');
        let pengaturan = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return pengaturan;
    }
    else {
        return null;
    }
}

const loadLocalProfileStorage = () => {
    let tmpData = window.localStorage.getItem('{$2a$04$LEBKjg.jyXK7IJzEBHBe/erI/fRXwEiLdoWTB0Lva64GGCFXn51aG}');
    if(tmpData !== null){
        let bytes  = CryptoJS.AES.decrypt(tmpData.toString(), '79cec0fc8a27bb1d1e99e5661e42f842');
        let pengaturan = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return pengaturan;
    }
    else {
        return null;
    }
}

export default function credential(state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            let userProfile = {
                accountId: action.payload.nip,
                accountRealName: action.payload.nama
            }
            let ciphertextprofile = CryptoJS.AES.encrypt(JSON.stringify(userProfile), '79cec0fc8a27bb1d1e99e5661e42f842');
            window.localStorage.setItem('{$2a$04$LEBKjg.jyXK7IJzEBHBe/erI/fRXwEiLdoWTB0Lva64GGCFXn51aG}', ciphertextprofile);
            return {
                ...state,
                [USER_PROFILE]: userProfile
            };
        case CREDENTIAL_LOADED:
            let ciphertexttoken = CryptoJS.AES.encrypt(JSON.stringify(action.payload), 'e4ac72eb583f85965fbaa52641546107');
            window.localStorage.setItem('{$2a$04$uNYaQhd6v9Em48tVM/duVOYI6L1AdCMdPNvKdMJ0/mQxnmsRIN0G2}', ciphertexttoken);
            return {
                ...state,
                [CREDENTIAL]: action.payload,
                [HEADER_AUTHORIZATION]: {Authorization: 'Bearer ' + action.payload.token}
            };
        case CREDENTIAL_RESET:
            window.localStorage.clear();
            return{
                ...state,
                [USER_PROFILE]: initialState.userProfile,
                [CREDENTIAL]: initialState.credential_profile,
                [HEADER_AUTHORIZATION]: initialState.header_authorization
            };
        default:
            let cr = loadLocalCredentialStorage();
            let pfl = loadLocalProfileStorage();
            if(cr === null){
                return state;
            }
            else {
                return {
                    ...state,
                    [USER_PROFILE]: pfl,
                    [CREDENTIAL]: cr,
                    [HEADER_AUTHORIZATION]: {Authorization: `Bearer ${cr.token}`}
                }
            }
    }
}