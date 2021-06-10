import React, { Component } from "react";
import { Button, DatePicker, Form, Input, Modal, Select, Upload } from 'antd';
import { connect } from "react-redux";
import { getCustomer } from "../../actions/master-action";

const mapStateToProps = store => {
    return {
        filterCustomer: store.master.filter_customer,
        headerAuthorization: store.credential.header_authorization,
        paginationCustomer: store.master.pagination_customer,
        restfulServer: store.general.restful_domain,
        urutCustomer: store.master.urut_customer
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

class FormAddCustomer extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false
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

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
			case 'nama':
				this.itemCustomer.nama = e.currentTarget.value;
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

    saveCustomer = () => {
		const { 
			filterCustomer, headerAuthorization, paginationCustomer, restfulServer, urutCustomer, handleClose, handleToggleOpenProgressDialog
		} = this.props;
		const option = {headers: { ...headerAuthorization }};
	    let self = this;

	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/Customer`,
            headers: {...headerAuthorization},
            data: this.itemCustomer
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadCustomer(filterCustomer, paginationCustomer, urutCustomer);
	    	} 
	    	self.handleReset();
            self.setState({disabledInput: false});
            handleClose();
            handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
	    	self.setState({disabledInput: true});
	    });
	}

    loadCustomer = (filter, pagination, urut) => {
        const { getCustomer, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/customer?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getCustomer(url, headerAuthorization);
    }

    updateCustomer = () => {
        const { filterCustomer, headerAuthorization, paginationCustomer, restfulServer, urutCustomer, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/Customer`,
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
        const { data, handleClose, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Customer':'Formulir Add Customer'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 25}}      
            width="40%"
        >
            <Form
                {...layout}
                name="form--Customer"
                initialValues={{remember: true}}
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["nama"]: mode==='edit'?data.nama:''
                }}
            >
                <Form.Item
	                label="Nama Customer"
                    name="nama"
                    rules={[{required: true, message: 'Nama Customer harus diisi'}]}
                >
                    <Input 
                        data-jenis="nama"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
            </Form>
        </Modal>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddCustomer);