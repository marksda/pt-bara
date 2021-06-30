import React from 'react';
import axios from 'axios';
import { Button, Form, Input, InputNumber, Progress, Upload } from 'antd';
import { connect } from "react-redux";
import { setModeProyekBaru, setItemProyekSelected } from "../../actions/master-action";
import TableBudget from '../tables/Table-Budget';
import { UploadOutlined } from '@ant-design/icons';

    
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
            disabledInputEdit: true,
            totalBudget: 0.0,
            isUploadFile: false
        }

        this.formRef = React.createRef();
        this.itemProyek = {};
        this.fileBudget = null;
    }

    componentDidMount() {
        this.getTotalBudget();
    }

    beforeUploadfile = (file) => {
        this.fileBudget = file;
        console.log(file);
        return true;
    }

    handleUpload = async () => {
        this.setState({isUploadFile: true});
    	// const { headerAuthorization, restfulServer } = this.props;    	
	    // const formData = new FormData();
	    
	    // const option = {
	    //     headers: { ...headerAuthorization }
	    // };

	    // formData.append('no_job', idReimburse);
        // formData.append('file', file);
	    
	    // this.setState({uploading: true});
	    // let self = this;

	    // await axios.put(
	    //     `${restfulServer}/reimburse/dokumen_pendukung`, 
	    //     formData, 
	    //     option
	    // )
	    // .then((r) => {  
	    //     if(r.data.status === 200) {        
		// 		self.setState({uploading: false});
		// 		handleClose();
	    //     }                      
	    // })
	    // .catch((r) => {
        //     console.log(r.toString());
	    // });
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

    render() {
        const { itemProyekSelected, modeProyekBaru } = this.props;
        const { isUploadFile, totalBudget } = this.state;

        let initEdit;
        if(modeProyekBaru === 'edit' && itemProyekSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["no_job"]: itemProyekSelected.no_job,
                ["nama_proyek"]: itemProyekSelected.nama_proyek,
                ["nama_customer"]: itemProyekSelected.nama_customer,
                ["nilai_kontrak"]: itemProyekSelected.nilai_kontrak,
                ["total_budget"]: totalBudget
            };
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true
            };
        }

        let page =
        <Form
            name="form-budget"
            ref={this.formRef}
            layout='vertical'
            initialValues={initEdit}
            key={totalBudget}
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
                                    name="total_budget"
                                    style={{marginBottom: 16, marginRight: 16}}
                                >
                                    <InputNumber
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
                                    <Upload 
                                        beforeUpload={this.beforeUploadfile}
                                        multiple={false}
                                        showUploadList={false}
                                        action={this.handleUpload}
                                    >
                                        <Button type="dashed" danger disabled={isUploadFile}>
                                            <UploadOutlined /> Upload file budget
                                        </Button>
                                    </Upload>
                                    {
                                        isUploadFile === true ?
                                        <div style={{ width: 170 }}>
                                            <Progress percent={30} size="small" />
                                        </div>:null
                                    }                                    
                                </Form.Item>
                            </td>
                        </tr>                        
                    </tbody>
                </table> 
                </div>
                <div className="content-flex-center">
                    <TableBudget title="Data Budget" getTotalBudget={this.getTotalBudget}/>
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBudget);