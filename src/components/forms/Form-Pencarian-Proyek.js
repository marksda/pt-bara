import React, { Component } from "react";
import TablePencarianProyek from '../tables/Table-Pencarian-Proyek';


class FormPencarianProyek extends Component {

    render() {
        let page = null;

        page =
        <div className="content-flex-center" style={{padding: 16}}>
            <TablePencarianProyek title="Data Proyek"/>
        </div>

        return(page);
    }
}

export default FormPencarianProyek;