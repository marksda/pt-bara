import React from 'react';

import TableProyek from '../tables/Table-Proyek';


class Master extends React.Component {
    render() {
        const { handleAddProyekBaru, handleEditProyekBaru } = this.props;
        let page =
        <div className="content-flex-center">
            <TableProyek 
                title="Data Proyek" 
                handleAddProyekBaru={handleAddProyekBaru}
                handleEditProyekBaru={handleEditProyekBaru}
            />
        </div>;
        return(page);
    }
}

export default Master;