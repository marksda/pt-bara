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
    let tmpData = window.localStorage.getItem('{ef535818-9c4d-1b92-9eea-43ad6d745c9a}');
    if(tmpData !== null){
        let bytes  = CryptoJS.AES.decrypt(tmpData.toString(), '6MjSltMV8cadJWcKh_nR4Ds7vc$!ftDw');
        let pengaturan = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return pengaturan;
    }
    else {
        return null;
    }
}

const loadLocalProfileStorage = () => {
    let tmpData = window.localStorage.getItem('{8e9cca41-2ddf-e5c8-5af2-6dd2f36ceae4}');
    if(tmpData !== null){
        let bytes  = CryptoJS.AES.decrypt(tmpData.toString(), '6MjSltMV8cadJWcKh_nR4Ds7vc$!ftDw');
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
            let ciphertextprofile = CryptoJS.AES.encrypt(JSON.stringify(userProfile), '6MjSltMV8cadJWcKh_nR4Ds7vc$!ftDw');
            window.localStorage.setItem('{8e9cca41-2ddf-e5c8-5af2-6dd2f36ceae4}', ciphertextprofile);
            return {
                ...state,
                [USER_PROFILE]: userProfile
            };
        case CREDENTIAL_LOADED:
            let ciphertexttoken = CryptoJS.AES.encrypt(JSON.stringify(action.payload), '6MjSltMV8cadJWcKh_nR4Ds7vc$!ftDw');
            window.localStorage.setItem('{ef535818-9c4d-1b92-9eea-43ad6d745c9a}', ciphertexttoken);
            return {
                ...state,
                [CREDENTIAL]: action.payload,
                [HEADER_AUTHORIZATION]: 'Bearer ' + action.payload.token
            };
        case CREDENTIAL_RESET:
            window.localStorage.clear();
            return{
                ...state,
                [USER_PROFILE]: initialState.userProfile,
                [CREDENTIAL]: initialState.credential_profile,
                [HEADER_AUTHORIZATION]: initialState.header_authorization
            }
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