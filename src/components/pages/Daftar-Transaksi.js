import React from 'react';

import TableProyek from '../tables/Table-Proyek';


class DaftarTransaksi extends React.Component {
    render() {
        let page =
        <div className="content-flex-center">
            <TableProyek title="Data Proyek" />
        </div>;
        return(page);
    }
}

export default DaftarTransaksi;