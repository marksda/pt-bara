import React from 'react';
import { connect } from "react-redux";
import { Divider, Radio } from 'antd';
import { resetStatusProyekSelected, setStatusProyekSelected, resetItemProyekSelected } from "../../actions/master-action";
import FormBudget from '../forms/Form-Budget';
import FormPersiapanProyek from '../forms/Form-Persiapan-Proyek';
import FormProfileProyek from '../forms/Form-Profile-Proyek';
import ProcessingDialog from '../dialogs/Processing-Dialog';

const mapStateToProps = store => {
    return {      
        statusProyekSelected: store.master.status_proyek_selected,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setStatusProyekSelected: (nilai) => dispatch(setStatusProyekSelected(nilai)),
        resetStatusProyekSelected: () => dispatch(resetStatusProyekSelected()),
        resetItemProyekSelected:() => dispatch(resetItemProyekSelected())
    };
};

class ProyekBaru extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            itemTabSelected: 'Persiapan',
            disabledRadioPersiapan: false,
            disabledRadioProfile: false,
            disabledRadioBudget: false,
            disabledRadioMonitoring: false,
            openProcessingDialog: false
        }
    }

    componentDidMount() {
        const { statusProyekSelected } = this.props;

        switch (statusProyekSelected) {
            case '01':
                this.setState({
                    disabledRadioPersiapan: false,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true,
                    itemTabSelected: 'Persiapan'
                });
                break;
            case '02':
                this.setState({
                    disabledRadioPersiapan: false,
                    disabledRadioProfile: false,
                    disabledRadioBudget: false,
                    disabledRadioMonitoring: false,
                    itemTabSelected: 'Profile'
                });
                break;
            case '03':
                this.setState({
                    disabledRadioPersiapan: true,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
                });
                break;
            case '04':
                this.setState({
                    disabledRadioPersiapan: true,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
                });
                break;        
            default:
                this.setState({
                    disabledRadioPersiapan: true,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
                });
                break;
        }
    }

    componentWillUnmount() {
        const { resetItemProyekSelected } = this.props;
        this.resetTab('01');
        resetItemProyekSelected();
    }

    handleChangeItemTab = (e) => {
        this.setState({ itemTabSelected: e.target.value });
    }   

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    resetTab = (statusProyek) => {
        const {statusProyekSelected, setStatusProyekSelected } = this.props;

        if(statusProyekSelected !== statusProyek) {
            setStatusProyekSelected(statusProyek);
        }
        
        switch (statusProyek) {
            case '01':
                this.setState({
                    disabledRadioPersiapan: false,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true,
                    itemTabSelected: 'Persiapan',
                });
                break;
            case '02':
                this.setState({
                    disabledRadioPersiapan: false,
                    disabledRadioProfile: false,
                    disabledRadioBudget: false,
                    disabledRadioMonitoring: false,
                    itemTabSelected: 'Profile'
                });
                break;
            case '03':
                this.setState({
                    disabledRadioPersiapan: true,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
                });
                break;
            case '04':
                this.setState({
                    disabledRadioPersiapan: true,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
                });
                break;        
            default:
                this.setState({
                    disabledRadioPersiapan: true,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
                });
                break;
        }
    }

    render() {
        const { itemTabSelected, disabledRadioPersiapan, disabledRadioProfile, disabledRadioBudget, disabledRadioMonitoring, openProcessingDialog  } = this.state;

        let subPage = null;

        switch (itemTabSelected) {
            case 'Persiapan':
                subPage =
                <FormPersiapanProyek 
                    handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
                    resetTab={this.resetTab}
                />;
                break;
            case 'Profile':
                subPage =
                <FormProfileProyek 
                    handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
                    resetTab={this.resetTab}
                />;
                break;
            case 'Budget':
                subPage =
                <FormBudget 
                    handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
                    resetTab={this.resetTab}
                />;
                break;
            default:
                break;
        }

        let page =
        <>
            <div className="content-flex-center">
                <Radio.Group value={itemTabSelected} onChange={this.handleChangeItemTab}>
                    <Radio.Button value="Persiapan" disabled={disabledRadioPersiapan}>Persiapan</Radio.Button>
                    <Radio.Button value="Profile" disabled={disabledRadioProfile}>Profile</Radio.Button>
                    <Radio.Button value="Budget" disabled={disabledRadioBudget}>Budget</Radio.Button>
                    <Radio.Button value="Monitoring" disabled={disabledRadioMonitoring}>Monitoring</Radio.Button>
                </Radio.Group>  
            </div>                  
            <Divider style={{borderTop: '1px solid rgba(17, 123, 236, 0.54)'}}/>
            {subPage}
            <ProcessingDialog open={openProcessingDialog} />
        </>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyekBaru);