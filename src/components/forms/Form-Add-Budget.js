import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getBudget } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        filterBudget: store.master.filter_budget,
        headerAuthorization: store.credential.header_authorization,
        paginationBudget: store.master.pagination_budget,
        restfulServer: store.general.restful_domain,
        urutBudget: store.master.urut_budget
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getBudget: (url, headerAuthorization) => dispatch(getBudget(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};

class FormAddBudget extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemBudget = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemBudget = {...data};
        }
        else {
            this.itemBudget.status_header = false;
        }
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'id':
                if(mode === "edit") {
                    this.itemBudget.idbaru = e.currentTarget.value;
                }
				else {
                    this.itemBudget.id = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemBudget.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleChangeStatusHeader = (value) => {
        this.itemBudget.status_header = (value === 'true');
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateBudget();
        }
        else {
			this.saveBudget();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadBudget = (filter, pagination, urut) => {
        const { getBudget, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/budget?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getBudget(url, headerAuthorization);
    }

    saveBudget = () => {
		const { 
			filterBudget, headerAuthorization, paginationBudget, restfulServer, urutBudget, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/budget`,
            headers: {...headerAuthorization},
            data: this.itemBudget
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadBudget(filterBudget, paginationBudget, urutBudget);
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

    updateBudget = () => {
        const { filterBudget, headerAuthorization, paginationBudget, restfulServer, urutBudget, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/budget`,
            headers: {...headerAuthorization},
            data: this.itemBudget
        })
        .then((r) => {         
            if(r.data.status === 200) {
                console.log(paginationBudget);
                self.loadBudget(
                    filterBudget,
                    paginationBudget,
                    urutBudget
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
            title={mode==='edit'?'Formulir Edit Budget':'Formulir Add Budget'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--Budget"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["id"]: mode==='edit'?data.id:'',
                    ["nama"]: mode==='edit'?data.nama:'',
                    ["status_header"]: mode==='edit'?data.status_header.toString():'false'
                }}
            >                
                <Form.Item
	                label="Id"
                    name="id"
                    rules={[{required: true, message: 'Kode budget harus diisi'}]}
                >
                    <Input 
                        data-jenis="id"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                        style={{width: 150}}
                    />
                </Form.Item>                
                <Form.Item 
                    label="Header/Detail"
                    name="status_header"
                    rules={[{required: true, message: 'Status header harus harus diisi'}]}
                >
                    <Select 
                        onChange={this.handleChangeStatusHeader}
                        disabled={disabledInput}
                        style={{width: 200}}
                    >
                        <Select.Option value="true">Header</Select.Option>
                        <Select.Option value="false">Detail</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama budget harus diisi'}]}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAddBudget);