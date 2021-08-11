import React from 'react';
import { connect } from "react-redux";
import { Divider, Radio } from 'antd';
import FormMonitoring from '../forms/Form-Monitoring';
import FormLaporanPiutangProyek from '../forms/Form-Laporan-Piutang-Proyek';
import FormLaporanBudgetProyek from '../forms/Form-Laporan-Budget-Proyek';
import FormLaporanLabaRugiProyek from '../forms/Form-Laporan-LabaRugi-Proyek';
import FormLaporanPendapatanProyek from '../forms/Form-Laporan-Pendapatan-Proyek';


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
    constructor(props) {
		super(props);

        this.state = {
            itemTabSelected: 'Tagihan',
            disabledRadioPersiapan: false,
            disabledRadioProfile: false,
            disabledRadioBudget: false,
            disabledRadioMonitoring: false
        }
    }

    componentWillUnmount() {
        const { resetItemProyekSelected } = this.props;  
        resetItemProyekSelected(); 
    }

    handleChangeItemTab = (e) => {
        this.setState({ itemTabSelected: e.target.value });
    } 
    
    render() {
        const { 
            itemTabSelected, disabledRadioPersiapan, disabledRadioProfile, disabledRadioBudget, 
            disabledRadioMonitoring
        } = this.state;
        const { isProgress } = this.props;

        let subPage = null;

        switch (itemTabSelected) {
            case 'Tagihan':
                subPage =
                <FormLaporanPiutangProyek />;
                break;
            case 'Budget':
                subPage =
                <FormLaporanBudgetProyek />;
                break;
            case 'L/R':
                subPage =
                <FormLaporanLabaRugiProyek />;
                break;
            case 'Pendapatan':
                subPage =
                <FormLaporanPendapatanProyek />;
                break;
            case 'Pendapatan':
                subPage =
                <FormMonitoring  />;
                break;
            case 'Biaya':
                subPage =
                <FormMonitoring />;
                break;
            default:
                break;
        }

        let page =
        <>
            <div className="content-flex-center">
                <Radio.Group value={itemTabSelected} onChange={this.handleChangeItemTab}>
                    <Radio.Button value="Tagihan" disabled={isProgress===true?true:disabledRadioPersiapan}>Tagihan</Radio.Button>
                    <Radio.Button value="Budget" disabled={isProgress===true?true:disabledRadioProfile}>Budget</Radio.Button>
                    <Radio.Button value="L/R" disabled={isProgress===true?true:disabledRadioBudget}>L/R</Radio.Button>
                    <Radio.Button value="Pendapatan" disabled={isProgress===true?true:disabledRadioMonitoring}>Pendapatan</Radio.Button>
                    <Radio.Button value="Biaya" disabled={isProgress===true?true:disabledRadioMonitoring}>Biaya</Radio.Button>
                </Radio.Group>  
            </div>                  
            <Divider style={{borderTop: '1px solid rgba(191, 192, 194, 0.7)'}}/>
            {subPage}
        </>;

        return(page);

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaporanProyek);
