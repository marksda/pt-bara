import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { connect } from "react-redux";
import { getPegawai } from "../../actions/master-action";

import { DeleteOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';


const mapStateToProps = store => {
    return {      
        filterPegawai: store.master.filter_pegawai,
        headerAuthorization: store.credential.header_authorization,
        paginationPegawai: store.master.pagination_pegawai,
        restfulServer: store.general.restful_domain,
        urutPegawai: store.master.urut_pegawai
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getPegawai: (url, headerAuthorization) => dispatch(getPegawai(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

class FormAddPegawai extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
            imageUrl: null,
            loading: false
		};

        this.formData = null;
		this.formRef = React.createRef();
		this.itemPegawai = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemPegawai = {...data};
        }
    }

    beforeUpload = (file) => {       
		let oFReader = new FileReader();
		oFReader.readAsDataURL(file);
		let img = document.getElementById("img-preview-pegawai");
		oFReader.onload = function(oFREvent) {   
	    	img.src = oFREvent.target.result;
	    	img.onload = function () {
				if(this.width >= this.height) {
					alert("ratio image harus portrait");
				}
				else {
					let elt = document.querySelectorAll("[data-id='foto_pegawai']");
					elt[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.display = "none";
					let imgPegawaiPreview = elt[0].childNodes[1].childNodes[0].childNodes[0].childNodes[1]; //className="container-preview-img-pegawai"
					if(this.width>=100) {
                        this.width = this.width/10;
						this.height = this.height/10;
					}
                    imgPegawaiPreview.style.width = this.width.toString() + 'px';
					imgPegawaiPreview.style.display = "block";
                    imgPegawaiPreview.childNodes[1].style.marginLeft = (this.width/2-8).toString()+'px';
				}
			};
	    };

		if(this.formData === null) {
	    	this.formData = new FormData();
	    }
	    this.formData.append('file', file);

	    return false;	
	}

    handleBtnDeleteImgPegawai = (e) => {
		let elt = document.querySelectorAll("[data-id='foto_pegawai']");
		elt[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].style.display = "block";
		elt[0].childNodes[1].childNodes[0].childNodes[0].childNodes[1].style.display = "none";
		this.formData.delete('file');
	}

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'nip':
                if(mode === "edit") {
                    this.itemPegawai.nipbaru = e.currentTarget.value;
                }
				else {
                    this.itemPegawai.nip = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemPegawai.nama = e.currentTarget.value;
				break;
            case 'alamat':
                this.itemPegawai.alamat = e.currentTarget.value;
                break;
            case 'no_handphone':
                this.itemPegawai.no_handphone = e.currentTarget.value;
                break;
            case 'email':
                this.itemPegawai.email = e.currentTarget.value;
                break;
			default:
		}
	}

    handleChangeStatus = (value) => {
		this.itemPegawai.status = value;			
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
        if(this.formData === null) {
	    	this.formData = new FormData();
	    }

        this.formData.append('nama', this.itemPegawai.nama);
        this.formData.append('no_handphone', this.itemPegawai.no_handphone !== undefined ? this.itemPegawai.no_handphone:'-');
        this.formData.append('alamat', this.itemPegawai.alamat !== undefined ? this.itemPegawai.alamat:'-');
        this.formData.append('email', this.itemPegawai.email !== undefined ? this.itemPegawai.email:'-');
        this.formData.append('status', this.itemPegawai.status !== undefined ? this.itemPegawai.status:false);

		if(mode === 'edit') {
            this.formData.append('niplama', this.itemPegawai.nip);
            this.formData.append('nip', this.itemPegawai.nipbaru);
            this.updatePegawai();
        }
        else {          
            this.formData.append('nip', this.itemPegawai.nip);          
			this.savePegawai();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadPegawai = (filter, pagination, urut) => {
        const { getPegawai, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pegawai?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPegawai(url, headerAuthorization);
    }

    savePegawai = () => {
		const { 
			filterPegawai, headerAuthorization, paginationPegawai, restfulServer, urutPegawai, handleClose, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/pegawai`,
            headers: {...headerAuthorization},
            data: this.formData
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
                self.formData = null;
                self.itemPegawai = {};
				self.loadPegawai(filterPegawai, paginationPegawai, urutPegawai);
	    	} 
	    	self.handleReset();
            self.setState({disabledInput: false});
            handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
            self.formData = null;
            self.itemPegawai = {};
	    	self.setState({disabledInput: true});
	    });
	}    

    updatePegawai = () => {
        const { filterPegawai, headerAuthorization, paginationPegawai, restfulServer, urutPegawai, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/pegawai`,
            headers: {...headerAuthorization},
            data: this.formData
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.formData = null;
                self.itemPegawai = {};
                self.loadPegawai(
                    filterPegawai,
                    paginationPegawai,
                    urutPegawai
                );
            }
            self.setState({disabledInput: false});
            handleClose();
        })
        .catch((r) => {         
            self.formData = null;
            self.itemPegawai = {};
            self.setState({disabledInput: false});
        });        
    }

    render() {
        const { data, handleClose, mode, visible } = this.props;
		const { disabledInput, imageUrl, loading } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Pegawai':'Formulir Add Pegawai'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 84}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--Pegawai"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["nip"]: mode==='edit'?data.nip:'',
                    ["nama"]: mode==='edit'?data.nama:'',
                    ["alamat"]: mode==='edit'?data.alamat:'',
                    ["no_handphone"]: mode==='edit'?data.no_handphone:'',
                    ["email"]: mode==='edit'?data.email:'',
                    ["url_photo"]: mode==='edit'?data.url_photo:'',
                    ["status"]: mode==='edit'?data.status:''
                }}
            >                
                <Form.Item
	                label="Nip"
                    name="nip"
                    rules={[{required: true, message: 'Nip pegawai harus diisi'}]}
                >
                    <Input 
                        data-jenis="nip"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                        style={{ width: 120 }}
                    />
                </Form.Item>
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama pegawai harus diisi'}]}
                >
                    <Input 
                        data-jenis="nama"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
	                label="Alamat"
                    name="alamat"
                >
                    <Input 
                        data-jenis="alamat"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
	                label="Telepone"
                    name="no_handphone"
                >
                    <Input 
                        data-jenis="no_handphone"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
	                label="E-mail"
                    name="email"
                >
                    <Input 
                        data-jenis="email"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item 
                    label="Status"
                >
                    <Select 
                        onChange={this.handleChangeStatus}
                        disabled={disabledInput}
                        style={{ width: 120 }}
                    >                    
                        <Select.Option  value={true}>Aktif</Select.Option>
                        <Select.Option  value={false}>Non Aktif</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Foto"
                    name="foto"
                    style={{marginTop: 16}}	                    
                    data-id="foto_pegawai"
                >
                    <Upload
                        name="foto_pegawai"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={this.beforeUpload}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    <div className="container-preview-img-pegawai" onClick={this.handleBtnDeleteImgPegawai}>
                        <img id="img-preview-pegawai" alt="foto" className="preview-img-pegawai" />
                        <div className="preview-img-pegawai-middle">
                            <DeleteOutlined style={{ fontSize: '18px' }} />                              
                        </div>
                    </div>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button 
                        htmlType="button" 
                        onClick={this.handleReset} 
                        disabled={mode==='edit'?true:disabledInput}
                        style={{marginRight: 8}}
                    >
                    Reset
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        disabled={disabledInput}
                    >
                    Simpan
                    </Button>
                </Form.Item>
            </Form>
        </Modal>;

	    return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddPegawai);