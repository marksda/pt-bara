import React from 'react';
import axios from 'axios';
import { Button, Dropdown, Form, Input, InputNumber, Menu, Progress, Tooltip, Upload } from 'antd';
import { connect } from "react-redux";
import { setModeProyekBaru, setItemProyekSelected } from "../../actions/master-action";
import TableBudget from '../tables/Table-Budget';
import ProcessingDialog from '../dialogs/Processing-Dialog';
import { UploadOutlined, FileExcelOutlined, FileOutlined, FilePdfOutlined,FileWordOutlined } from '@ant-design/icons';

    
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
            isUploadFile: false,
            openProcessingDialog: false
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
        setTimeout(() => {this.handleUpload();}, 300);
        return false;
    }

    deleteFile = () => {
		const { 
			headerAuthorization, itemProyekSelected, restfulServer, setItemProyekSelected
		} = this.props;
                        
        this.handleToggleOpenProgressDialog();

        axios({
            method: 'delete',
            url: `${restfulServer}/master/file_budget`,
            headers: {...headerAuthorization},
            params: {no_job: itemProyekSelected.no_job, nama_file: itemProyekSelected.file_budget},
        })
        .then((r) => {  
            setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${itemProyekSelected.no_job}`, headerAuthorization);
            this.handleToggleOpenProgressDialog();    
        })
        .catch((r) => { 
            console.log(r.toString());
            this.handleToggleOpenProgressDialog();
        });
	}

    downloadFile = () => {  
		const { 
    		restfulServer, headerAuthorization, itemProyekSelected
    	} = this.props;

    	let self = this;   
        this.handleToggleOpenProgressDialog();

        axios({
            method: 'GET',
            url: `${restfulServer}/master/file_budget`,
            headers: {...headerAuthorization},
            params: {nama_file: itemProyekSelected.file_budget},
            responseType: 'blob'
        })
        .then((r) => {   
        	let namaFile = itemProyekSelected.nama_file_budget;
			this.handleToggleOpenProgressDialog();              
            let url = window.URL.createObjectURL(new Blob([r.data]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', namaFile);
            document.body.appendChild(link);
            
        	link.click();
        	link.remove();
        	window.URL.revokeObjectURL(url);                
        })
        .catch((r) => {
            console.log(r.toString());
            this.handleToggleOpenProgressDialog();
        });
    }

    handleIconFile = (ext) => {
		switch(ext) {
			case 'pdf':
				return (
					<FilePdfOutlined 
						style={{ 
							fontSize: '24px', 
							color: 'rgba(232, 69, 69, 0.81)' 
						}}
					/>
				);
			case 'xls':
				return (
					<FileExcelOutlined 
						style={{ 
							fontSize: '24px', 
							color: 'rgb(42, 123, 2)' 
						}}
					/>
				);
			case 'xlsx':
				return (
					<FileExcelOutlined 
						style={{ 
							fontSize: '24px', 
							color: 'rgb(42, 123, 2)' 
						}}
					/>
				);
			case 'doc':
				return (
					<FileWordOutlined 
						style={{ 
							fontSize: '24px', 
							color: 'rgb(19, 94, 189)' 
						}}
					/>
				);
			case 'docx':
				return (
					<FileWordOutlined 
						style={{ 
							fontSize: '24px', 
							color: 'rgb(19, 94, 189)' 
						}}
					/>
				);
			default:
				return (
					<FileOutlined 
						style={{ 
							fontSize: '24px', 
							color: 'rgb(27, 26, 26)' 
						}}
					/>
				);
		}
	}

    handleMenuFile = (e) => {
		if(e.key === "download") {
			this.downloadFile();
		}
		else {
			this.deleteFile();
		}
	}

    handleUpload = async () => {
    	const { headerAuthorization, itemProyekSelected, restfulServer, setItemProyekSelected } = this.props;    	
	    const formData = new FormData();	    
	    const option = {
	        headers: { ...headerAuthorization }
	    };

	    formData.append('no_job', itemProyekSelected.no_job);
        formData.append('file', this.fileBudget);
	    
        this.setState({isUploadFile: true});
	    let self = this;

	    await axios.put(
	        `${restfulServer}/master/file_budget`, 
	        formData, 
	        option
	    )
	    .then((r) => {  
	        if(r.data.status === 200) {       
                setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${itemProyekSelected.no_job}`, headerAuthorization); 
				self.setState({isUploadFile: false});
	        }                      
	    })
	    .catch((r) => {
            console.log(r.toString());
            self.setState({isUploadFile: false});
	    });
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
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
        const { isUploadFile, openProcessingDialog, totalBudget } = this.state;

        let initEdit;
        let iconFile = null;
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
            
            if(itemProyekSelected.file_budget !== null) {
                iconFile =
                <Tooltip title={itemProyekSelected.nama_file_budget}>
                    <Dropdown 
                        overlay={
                            <Menu onClick={this.handleMenuFile}>
                                <Menu.Item key="download">Download</Menu.Item>
                                <Menu.Item key="delete">Delete</Menu.Item>
                            </Menu>
                        }
                    >
                        <Button 
                            type="text" 
                            style={{marginLeft: 8}}
                        >
                            {
                                this.handleIconFile(itemProyekSelected.file_budget.split('.')[1])
                            }
                        </Button>
                    </Dropdown>
                </Tooltip>;
            }
            else {
                iconFile =
                <Upload 
                    beforeUpload={this.beforeUploadfile}
                    multiple={false}
                    showUploadList={false}
                    action={this.handleUpload}
                >
                    <Button type="dashed" danger disabled={isUploadFile}>
                        <UploadOutlined /> Upload file budget
                    </Button>
                </Upload>;
            }
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true
            };
        }

        let page =
        <>
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
                                    {iconFile}
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
        </Form>
        <ProcessingDialog open={openProcessingDialog} />
        </>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBudget);