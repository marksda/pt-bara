import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getBentukUsaha } from "../../actions/master-action";


const { TextArea } = Input;

const mapStateToProps = store => {
    return {      
        filterCustomer: store.master.filter_customer,
        headerAuthorization: store.credential.header_authorization,
        listBentukUsaha: store.master.list_bentuk_usaha,
        paginationCustomer: store.master.pagination_customer,
        restfulServer: store.general.restful_domain,
        urutCustomer: store.master.urut_customer
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getBentukUsaha: (url, headerAuthorization) => dispatch(getBentukUsaha(url, headerAuthorization)),
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

class FormAddCustomer extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemCustomer = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemCustomer = {...data};
        }
    }

    handleChangeJenisBentukUsaha = (value) => {
		this.itemCustomer.id_bentuk_usaha = Number(value);			
	}

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
            case 'alamat':
				this.itemCustomer.alamat = e.currentTarget.value;
				break;
            case 'email':
                this.itemCustomer.email = e.currentTarget.value;
                break;
			case 'nama':
				this.itemCustomer.nama = e.currentTarget.value;
				break;
            case 'telepone':
                this.itemCustomer.telepone = e.currentTarget.value;
                break;
			default:
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateCustomer();
        }
        else {
			this.saveCustomer();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadCustomer = (filter, pagination, urut) => {
        const { getCustomer, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/customer?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getCustomer(url, headerAuthorization);
    }

    saveCustomer = () => {
		const { 
			filterCustomer, headerAuthorization, paginationCustomer, restfulServer, urutCustomer, handleClose, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/customer`,
            headers: {...headerAuthorization},
            data: this.itemCustomer
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadCustomer(filterCustomer, paginationCustomer, urutCustomer);
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

    updateCustomer = () => {
        const { filterCustomer, headerAuthorization, paginationCustomer, restfulServer, urutCustomer, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/customer`,
            headers: {...headerAuthorization},
            data: this.itemCustomer
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadCustomer(
                    filterCustomer,
                    paginationCustomer,
                    urutCustomer
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
        const { data, handleClose, listBentukUsaha, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Customer':'Formulir Add Customer'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="40%"
        >
            <Form
                {...layout}
                name="form--Customer"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["nama"]: mode==='edit'?data.nama:'',
                    ["alamat"]: mode==='edit'?data.alamat:'',
                    ["telepone"]: mode==='edit'?data.telepone:'',
                    ["email"]: mode==='edit'?data.email:'',
                    ["bentuk_usaha"]: mode==='edit'?data.id_bentuk_usaha:'',
                }}
            >
                <Form.Item 
                    label="Bentuk Usaha"
                    name="bentuk_usaha"
                >
                    <Select 
                        onChange={this.handleChangeJenisBentukUsaha}
                        disabled={disabledInput}
                        style={{ width: 120 }}
                    >
                    {
                        listBentukUsaha !== null ? listBentukUsaha.data.map((row) => 
                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                        ):null
                    }	
                    </Select>
                </Form.Item>
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama Customer harus diisi'}]}
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
                    <TextArea 
                        data-jenis="alamat"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
	                label="Telepone"
                    name="telepone"
                >
                    <Input 
                        data-jenis="telepone"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                        style={{width: 250}}
                    />
                </Form.Item>
                <Form.Item
	                label="Email"
                    name="email"
                >
                    <Input 
                        data-jenis="email"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                        style={{width: 250}}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAddCustomer);