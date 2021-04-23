import CryptoJS from 'crypto-js';

const initialState = {
    user_profile: {
        accountId: null,
        accountRealName: null
    },
    credential_profile: {
        id: 5,
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

export default function(state = initialState, action) {
    switch (action.type) {
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