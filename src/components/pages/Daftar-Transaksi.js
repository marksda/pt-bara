import React from 'react';

import TableTransaksi from '../tables/Table-Transaksi';


class DaftarTransaksi extends React.Component {
    render() {
        let page =
        <div className="content-flex-center">
            <TableTransaksi title="Data Transaksi" />
        </div>;
        return(page);
    }
}

export default DaftarTransaksi;