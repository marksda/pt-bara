import React from 'react';

import TableProyek from '../tables/Table-Proyek';


class Proyek extends React.Component {
    render() {
        let page =
        <div className="content-flex-center">
            <TableProyek title="Data Proyek" />
        </div>;
        return(page);
    }
}

export default Proyek;