import React from 'react';

import TablePengajuan from '../tables/Table-Pengajuan';


class Pengajuan extends React.Component {
    render() {
        let page =
        <div className="content-flex-center">
            <TablePengajuan title="Data Pengajuan" />
        </div>;
        return(page);
    }
}

export default Pengajuan;