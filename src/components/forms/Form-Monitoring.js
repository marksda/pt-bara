import React from 'react';
import axios from 'axios';
import { Button, Dropdown, Form, Input, InputNumber, Menu, Progress, Tooltip, Upload } from 'antd';
import { connect } from "react-redux";
import { setItemProyekSelected, setIsProgress } from "../../actions/master-action";
import { UploadOutlined, FileExcelOutlined, FileOutlined, FilePdfOutlined,FileWordOutlined } from '@ant-design/icons';


const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        modeProyekBaru: store.master.mode_proyek_baru,
        itemProyekSelected: store.master.item_proyek_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {             
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class FormMonitoring extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            disabledInput: true,
            disabledInputEdit: true,
            totalBudget: 0.0
        }

        this.formRef = React.createRef();
        this.itemProyek = null;
    }

    componentDidMount() {
        this.getTotalBudget();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.itemProyekSelected);
        if(this.itemProyek === null && nextProps.itemProyekSelected !== null) {
            this.itemProyek = {
                no_job: nextProps.itemProyekSelected.no_job,
                nama_customer: nextProps.itemProyekSelected.nama_customer,
                nama_proyek: nextProps.itemProyekSelected.nama_proyek
            };

            this.formRef.current.setFieldsValue({
                no_job: nextProps.itemProyekSelected.no_job,
                nama_customer: nextProps.itemProyekSelected.nama_customer,
                nama_proyek: nextProps.itemProyekSelected.nama_proyek,
                nilai_kontrak: nextProps.itemProyekSelected.nilai_kontrak
            });  
        }

        if(nextState.totalBudget !== this.state.totalBudget) {
            this.formRef.current.setFieldsValue({
                total_budget: nextState.totalBudget,
                persentase_realisasi_biaya: 90.88
            });  
        }

        return true;
    }

    getTotalBudget = () => {
        const { headerAuthorization, itemProyekSelected, restfulServer } = this.props;

        let self = this;    
                
        axios({
            method: 'get',
            url: `${restfulServer}/master/totalbudget`,
            headers: {...headerAuthorization},
            params: { no_job: itemProyekSelected.no_job }
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.setState({totalBudget: r.data.keterangan});
            }
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
        });        
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

    formatterPersen = (value) => {        
        let tmp = value.split('.');
        if(tmp.length>1){
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `${tmp[0]},${tmp[1]} %`;
        }
        else {
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `${tmp[0]} %`;
        }
    }

    parserPersen = (value) => {
        value = value.replace(/\s?%|(\.*)/g, '')
        return value.replace(/\,/g, '.');
    }

    render() {
        const { itemProyekSelected, modeProyekBaru } = this.props;
        const { totalBudget } = this.state;
        let page =
        <Form
            name="form-budget"
            ref={this.formRef}
            layout='vertical'
            initialValues={{
                ["no_job"]: null,
                ["nama_proyek"]: null,
                ["nama_customer"]: null,
                ["nilai_kontrak"]: null,
                ["total_budget"]: null
            }}
        >
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="content-flex-center">
                    <table className="table-proyek-monitoring">
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
                                        style={{ width: 150, color: 'blue' }}
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
                                        style={{minWidth: 250, color: 'blue'}}
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
                                        style={{minWidth: 250, color: 'blue'}}
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
                                            disabled={true}
                                            style={{width: 150, color: 'blue'}}
                                            formatter={this.formatterRupiah}
                                            parser={this.parserRupiah}
                                        />
                                    </Form.Item>
                                </td>
                                <td colSpan="2">
                                    <div style={{display: 'flex'}}>
                                        <Form.Item
                                            label="Jumlah Budget"
                                            name="total_budget"
                                            style={{marginBottom: 16, marginRight: 16}}
                                        >
                                            <InputNumber
                                                disabled={true}
                                                style={{width: 150, color: 'blue'}}
                                                formatter={this.formatterRupiah}
                                                parser={this.parserRupiah}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Realisasi Biaya"
                                            name="realisasi_biaya"
                                            style={{marginBottom: 16, marginRight: 4}}
                                        >
                                            <InputNumber
                                                disabled={true}
                                                style={{width: 150, color: 'blue'}}
                                                formatter={this.formatterRupiah}
                                                parser={this.parserRupiah}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label=" "
                                            name="persentase_realisasi_biaya"
                                            style={{marginBottom: 16}}
                                        >
                                            <InputNumber
                                                disabled={true}
                                                style={{width: 75, color: 'blue'}}
                                                formatter={this.formatterPersen}
                                                parser={this.parserPersen}
                                            />
                                        </Form.Item>
                                    </div>
                                </td>
                            </tr>   
                    </tbody>
                    </table>
                </div>
                <div className="content-flex-center">
                    <table className="table-container-transaksi-baru">
                    </table>
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMonitoring);