import React, { Component } from "react";
import TablePencarianProyek from '../tables/Table-Pencarian-Proyek';
import { connect } from "react-redux";


const mapDispatchToProps = dispatch => {    
    return {   
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
    };
};

class FormPencarianProyek extends Component {

    render() {
        let page = null;

        page =
        <div className="content-flex-center" style={{height: 300}}>
            <TablePencarianProyek title="Data Proyek"/>
        </div>

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPencarianProyek);