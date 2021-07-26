import React from 'react';
import { connect } from "react-redux";
import { Divider, Radio } from 'antd';
import { resetStatusProyekSelected, setStatusProyekSelected, resetItemProyekSelected } from "../../actions/master-action";
import FormBudget from '../forms/Form-Budget';
import FormMonitoring from '../forms/Form-Monitoring';
import FormPersiapanProyek from '../forms/Form-Persiapan-Proyek';
import FormProfileProyek from '../forms/Form-Profile-Proyek';

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

class ProyekBaru extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            itemTabSelected: null,
            disabledRadioPersiapan: false,
            disabledRadioProfile: false,
            disabledRadioBudget: false,
            disabledRadioMonitoring: false
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
        const { 
            itemTabSelected, disabledRadioPersiapan, disabledRadioProfile, disabledRadioBudget, 
            disabledRadioMonitoring
        } = this.state;
        const { isProgress } = this.props;

        let subPage = null;

        switch (itemTabSelected) {
            case 'Persiapan':
                subPage =
                <FormPersiapanProyek resetTab={this.resetTab} />;
                break;
            case 'Profile':
                subPage =
                <FormProfileProyek resetTab={this.resetTab} />;
                break;
            case 'Budget':
                subPage =
                <FormBudget resetTab={this.resetTab} />;
                break;
            case 'Monitoring':
                subPage =
                <FormMonitoring resetTab={this.resetTab} />;
                break;
            default:
                break;
        }

        let page =
        <>
            <div className="content-flex-center">
                <Radio.Group value={itemTabSelected} onChange={this.handleChangeItemTab}>
                    <Radio.Button value="Persiapan" disabled={isProgress===true?true:disabledRadioPersiapan}>Persiapan</Radio.Button>
                    <Radio.Button value="Profile" disabled={isProgress===true?true:disabledRadioProfile}>Profile</Radio.Button>
                    <Radio.Button value="Budget" disabled={isProgress===true?true:disabledRadioBudget}>Budget</Radio.Button>
                    <Radio.Button value="Monitoring" disabled={isProgress===true?true:disabledRadioMonitoring}>Monitoring</Radio.Button>
                </Radio.Group>  
            </div>                  
            <Divider style={{borderTop: '1px solid rgba(17, 123, 236, 0.54)'}}/>
            {subPage}
        </>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyekBaru);