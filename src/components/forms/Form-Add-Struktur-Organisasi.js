import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal } from 'antd';
import { connect } from "react-redux";
import { getStrukturOrganisasi } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        filterStrukturOrganisasi: store.master.filter_struktur_organisasi,
        headerAuthorization: store.credential.header_authorization,
        paginationStrukturOrganisasi: store.master.pagination_struktur_organisasi,
        restfulServer: store.general.restful_domain,
        urutStrukturOrganisasi: store.master.urut_struktur_organisasi
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getStrukturOrganisasi: (url, headerAuthorization) => dispatch(getStrukturOrganisasi(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

class FormAddStrukturOrganisasi extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemStrukturOrganisasi = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemStrukturOrganisasi = {...data};
        }
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'id':
                if(mode === "edit") {
                    this.itemStrukturOrganisasi.idbaru = e.currentTarget.value;
                }
				else {
                    this.itemStrukturOrganisasi.id = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemStrukturOrganisasi.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateStrukturOrganisasi();
        }
        else {
			this.saveStrukturOrganisasi();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadStrukturOrganisasi = (filter, pagination, urut) => {
        const { getStrukturOrganisasi, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/strukturorganisasi?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStrukturOrganisasi(url, headerAuthorization);
    }

    saveStrukturOrganisasi = () => {
		const { 
			filterStrukturOrganisasi, headerAuthorization, paginationStrukturOrganisasi, restfulServer, urutStrukturOrganisasi, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/strukturorganisasi`,
            headers: {...headerAuthorization},
            data: this.itemStrukturOrganisasi
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadStrukturOrganisasi(filterStrukturOrganisasi, paginationStrukturOrganisasi, urutStrukturOrganisasi);
	    	} 
	    	self.handleReset();
            self.setState({disabledInput: false});
            // handleClose();
            handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
	    	self.setState({disabledInput: true});
	    });
	}    

    updateStrukturOrganisasi = () => {
        const { filterStrukturOrganisasi, headerAuthorization, paginationStrukturOrganisasi, restfulServer, urutStrukturOrganisasi, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/strukturorganisasi`,
            headers: {...headerAuthorization},
            data: this.itemStrukturOrganisasi
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadStrukturOrganisasi(
                    filterStrukturOrganisasi,
                    paginationStrukturOrganisasi,
                    urutStrukturOrganisasi
                );
            }
            self.setState({disabledInput: false});
            handleClose();
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
        });        
    }

    render() {
        const { data, handleClose, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit StrukturOrganisasi':'Formulir Add Struktur Organisasi'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--Struktur-Organisasi"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["id"]: mode==='edit'?data.id:'',
                    ["nama"]: mode==='edit'?data.nama:''
                }}
            >                
                <Form.Item
	                label="Id"
                    name="id"
                    rules={[{required: true, message: 'Id struktur organisasi harus diisi'}]}
                >
                    <Input 
                        data-jenis="id"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                        style={{width: 150}}
                    />
                </Form.Item>
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama struktur organisasi harus diisi'}]}
                >
                    <Input 
                        data-jenis="nama"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAddStrukturOrganisasi);