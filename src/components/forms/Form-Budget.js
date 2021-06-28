import React from 'react';
import { Button, Form, Input, InputNumber  } from 'antd';
import { connect } from "react-redux";
import { setModeProyekBaru, setItemProyekSelected } from "../../actions/master-action";
import TableBudget from '../tables/Table-Budget';
import { PlusOutlined } from '@ant-design/icons';

    
const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        modeProyekBaru: store.master.mode_proyek_baru,
        itemProyekSelected: store.master.item_proyek_selected,
    };
};

const mapDispatchToProps = dispatch => {    
    return {             
        setModeProyekBaru: (nilai) => dispatch(setModeProyekBaru(nilai)), 
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
    };
};

class FormBudget extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            disabledInput: true,
            disabledInputEdit: true
        }

        this.formRef = React.createRef();
        this.itemProyek = {};
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

    render() {
        const { itemProyekSelected, modeProyekBaru } = this.props;

        let keyForm;
        let initEdit;
        if(modeProyekBaru === 'edit' && itemProyekSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["no_job"]: itemProyekSelected.no_job,
                ["nama_proyek"]: itemProyekSelected.nama_proyek,
                ["nama_customer"]: itemProyekSelected.nama_customer,
                ["nilai_kontrak"]: itemProyekSelected.nilai_kontrak,
            };
            keyForm = 'edit'
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true
            };
            keyForm = 'add';
        }

        let page =
        <Form
            name="form-budget"
            ref={this.formRef}
            layout='vertical'
            initialValues={initEdit}
            key={keyForm}
        >
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="content-flex-center">
                <table className="table-container-proyek-baru" style={{width: '80%'}}>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Item
                                    label="No. Job"
                                    name="no_job"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        disabled={true}
                                        style={{ minWidth: 150, color: 'red' }}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Customer"
                                    name="nama_customer"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        disabled={true}
                                        style={{color: 'red'}}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="Proyek"
                                    name="nama_proyek"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="namaproyek"
                                        disabled={true}
                                        style={{minWidth: 250, color: 'red'}}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Nilai Kontrak/PO"
                                    name="nilai_kontrak"
                                    style={{marginBottom: 16}}
                                >
                                    <InputNumber
                                        data-jenis="nilaikontrak"
                                        disabled={true}
                                        style={{minWidth: 250, color: 'red'}}
                                        formatter={this.formatterRupiah}
                                        parser={this.parserRupiah}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="Total Budget"
                                    name="jumlah_budget"
                                    style={{marginBottom: 16, marginRight: 16}}
                                >
                                    <InputNumber
                                        data-jenis="jumlahbudget"
                                        disabled={true}
                                        style={{minWidth: 250, color: 'red'}}
                                        formatter={this.formatterRupiah}
                                        parser={this.parserRupiah}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="File Budged"
                                    style={{marginBottom: 16}}
                                >
                                    <Button
                                        type="dashed"
                                        icon={<PlusOutlined />}
                                        disabled={false}
                                    >
                                        Upload file
                                    </Button>
                                </Form.Item>
                            </td>
                        </tr>                        
                    </tbody>
                </table> 
                </div>
                <div className="content-flex-center">
                    <TableBudget title="Data Budget" />
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBudget);