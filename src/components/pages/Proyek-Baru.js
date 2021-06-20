import React from 'react';
import { connect } from "react-redux";
import { Divider, Radio } from 'antd';

import { resetStatusProyek, setStatusProyek } from "../../actions/master-action";
import FormPersiapanProyek from '../forms/Form-Persiapan-Proyek';

const mapStateToProps = store => {
    return {      
        statusProyek: store.master.status_proyek,
        headerAuthorization: store.credential.header_authorization
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setStatusProyek: (nilai) => dispatch(setStatusProyek(nilai)),
        resetStatusProyek: (nilai) => dispatch(resetStatusProyek()),
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
        }
    }

    componentDidMount() {
        const { statusProyek } = this.props;

        switch (statusProyek) {
            case '01':
                this.setState({
                    disabledRadioPersiapan: false,
                    disabledRadioProfile: true,
                    disabledRadioBudget: true,
                    disabledRadioMonitoring: true
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

    handleChangeItemTab = (e) => {
        this.setState({ itemTabSelected: e.target.value });
    }

    render() {
        const { itemTabSelected, disabledRadioPersiapan, disabledRadioProfile, disabledRadioBudget, disabledRadioMonitoring  } = this.state;
        let subPage = null;

        switch (itemTabSelected) {
            case 'Persiapan':
                subPage =
                <FormPersiapanProyek />;
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
        </>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProyekBaru);