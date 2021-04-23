const getDomain = () => {
    let url_object = new URL(window.location.href);
    return `${url_object.protocol}//${url_object.hostname}`;
}

const initialState = {
    domain: getDomain(),
    restful_domain: `${getDomain()}:8080/PTBARA-war`
};

export default function(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}