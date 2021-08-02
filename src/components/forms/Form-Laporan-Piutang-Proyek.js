import React from 'react';
import { connect } from "react-redux";
import { setIsProgress } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        isProgress: store.master.is_progress
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class FormLaporanPiutangProyek extends React.Component {
    render() {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLaporanPiutangProyek);