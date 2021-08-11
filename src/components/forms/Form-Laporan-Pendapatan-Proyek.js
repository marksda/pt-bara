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

class FormLaporanPendapatanProyek extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            anchorEl: null,
            listLaporanPendapatan: null,
            heighKontainer: 200
        }

        this.formRef = React.createRef();
        this.prevDataPencarianProyek = null;
    }

    componentDidMount() {
        // setTimeout(() => {this.formRef.current.getFieldInstance('btncariproyek').focus();}, 100);
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
            // this.loadLaporanLabaRugi(nextProps.itemProyekSelected.no_job);
        }

        return true;
    }

    render() {
        const { anchorEl, heighKontainer, listLaporanLabaRugi, nilaiLabaRugi } = this.state;

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
            <div 
                className="content-flex-center scrool-bar-cso" 
                style={{
                    height: `Calc(100vh - ${heighKontainer}px)`, 
                    overflow: 'auto', paddingRight: 16
                }}
            >
                <div className="kontainer-left-lp-pendapatan-proyek">
                    <div className="content-flex-left">
                        <Form.Item
                            label="No. Job"
                            name="no_job"
                            style={{marginBottom: 16, marginRight: 16}}
                        >
                            <Input 
                                data-jenis="nojob"
                                disabled={true}
                                style={{ width: 150, color: '#646463'}}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Client"
                            name="nama_customer"
                            style={{flexGrow: 1, marginBottom: 16, marginRight: 16}}
                        >
                            <Input disabled={true} style={{color: '#646463'}}/>
                        </Form.Item>
                        <Form.Item 
                            label="Proyek"
                            name="nama_proyek"
                            style={{ flexGrow: 1, marginBottom: 16, marginRight: 8}}
                        >
                            <Input disabled={true} style={{color: '#646463'}}/>
                        </Form.Item>
                        
                    </div>
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLaporanPendapatanProyek);