import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { FilterOutlined, FilePdfTwoTone, FileExcelTwoTone } from '@ant-design/icons';
import { setIsProgress, resetFilterProyek } from "../../actions/master-action";
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import FormPencarianProyek from '../forms/Form-Pencarian-Proyek';

const { Text } = Typography;

const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        isProgress: store.master.is_progress,
        itemProyekSelected: store.master.item_proyek_selected,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        resetFilterProyek: () => dispatch(resetFilterProyek()),
    };
};

class FormLaporanLabaRugiProyek extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            anchorEl: null,
            listLaporanLabaRugi: null
        }

        this.formRef = React.createRef();
        this.prevDataPencarianProyek = null;
    }

    componentDidMount() {
        setTimeout(() => {this.formRef.current.getFieldInstance('btncariproyek').focus();}, 100);
    }

    componentWillUnmount() {
        this.props.resetFilterProyek();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.prevDataPencarianProyek !== nextProps.itemProyekSelected) {
            this.prevDataPencarianProyek = nextProps.itemProyekSelected;
            this.formRef.current.setFieldsValue({
                no_job: nextProps.itemProyekSelected.no_job,
                nama_customer: nextProps.itemProyekSelected.nama_customer,
                nama_proyek: nextProps.itemProyekSelected.nama_proyek,
                nilai_kontrak:  nextProps.itemProyekSelected.nilai_kontrak
            });
            this.loadLaporanLabaRugi(nextProps.itemProyekSelected.no_job);
        }

        return true;
    }

    getTotalBudget = (noJob) => {
        const { headerAuthorization, restfulServer, setIsProgress } = this.props;
        setIsProgress(true);
        let self = this;    
                
        axios({
            method: 'get',
            url: `${restfulServer}/master/totalbudget`,
            headers: {...headerAuthorization},
            params: { no_job: noJob }
        })
        .then((r) => {         
            if(r.data.status === 200) {
                setIsProgress(false);
                self.formRef.current.setFieldsValue({
                    total_budget: r.data.keterangan
                });
            }
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
            setIsProgress(false);
        });        
    }

    handleCloseWindowProyekSearch = () => {
        this.setState({anchorEl: null});
    }

    handleOpenWindowProyekSearch = (e) => {
        this.setState({anchorEl: e.currentTarget});
    }

    formatterRupiah = (value) => {        
        let tmp = value.split('.');
        if(tmp.length>1){
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `Rp ${tmp[0]},${tmp[1]}`;
        }
        else {
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `Rp ${tmp[0]}`;
        }
    }

    parserRupiah = (value) => {
        value = value.replace(/Rp\s?|(\.*)/g, '')
        return value.replace(/\,/g, '.');
    }

    loadLaporanLabaRugi = (noJob) => {
		const { 
			headerAuthorization, restfulServer, setIsProgress
		} = this.props;
	    let self = this;
        setIsProgress(true);

	    axios({
            method: 'get',
            url: `${restfulServer}/master/laporan_labarugi`,
            headers: {...headerAuthorization},
            params: {no_job: noJob}
        })
	    .then((r) => {  
            setIsProgress(false);
	    	if(r.data.status === 200) {      
			    self.setState({listLaporanLabaRugi: r.data.keterangan});  
                self.getTotalBudget(noJob);
	    	} 
	    })
	    .catch((r) => {
	    	setIsProgress(false);
	    });
	}

    render() {
        const { anchorEl, listLaporanLabaRugi } = this.state;

        let page = 
        <Form
            name="form-laporan-labarugi"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={
                {
                    remember: true,
                    ["no_job"]: null,
                    ["nama_customer"]: null,
                    ["nama_proyek"]:  null,
                    ["nilai_kontrak"]: null,
                    ["total_budget"]: null
                }
            }     
        >
            <div className="content-flex-center">
                <div className="kontainer-left-lp-labarugi">
                    
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLaporanLabaRugiProyek);