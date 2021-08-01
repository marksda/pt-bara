import React from 'react';
import { connect } from "react-redux";

import { resetStatusProyekSelected, setStatusProyekSelected, resetItemProyekSelected } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        statusProyekSelected: store.master.status_proyek_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setStatusProyekSelected: (nilai) => dispatch(setStatusProyekSelected(nilai)),
        resetStatusProyekSelected: () => dispatch(resetStatusProyekSelected()),
        resetItemProyekSelected:() => dispatch(resetItemProyekSelected())
    };
};
class LaporanProyek extends React.Component {

}

export default connect(mapStateToProps, mapDispatchToProps)(LaporanProyek);
