import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getBudget } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        itemProyekSelected: store.master.item_proyek_selected,
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
            isHeader: true
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
            this.itemBudget.status_header = true;
        }
    }

    handleChangeNilaiNumeric = (value) => {
        this.itemBudget.saldo = value;
	}

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
			case 'nama':
				this.itemBudget.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleChangeStatusHeader = (value) => {
        this.itemBudget.status_header = (value === 'true');
        this.setState({isHeader:  this.itemBudget.status_header});
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
        this.setState({isHeader:  true});
	}

    loadBudget = (filter, pagination, urut) => {
        const { getBudget, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/budget?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getBudget(url, headerAuthorization);
    }

    saveBudget = () => {
		const { 
			filterBudget, headerAuthorization, itemProyekSelected, paginationBudget, restfulServer, urutBudget, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;

        this.itemBudget.no_job = itemProyekSelected.no_job;
        
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
        const { data, handleClose, mode, visible } = this.props;
		const { disabledInput, isHeader } = this.state;

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
                    ["nama"]: mode==='edit'?data.nama:'',
                    ["status_header"]: mode==='edit'?data.status_header.toString():'true',
                    ["id_parent"]: mode==='edit'?data.id_parent:null,
                    ["saldo"]: mode==='edit'?data.saldo:null
                }}
            >                   
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
                {
                    isHeader === false ?
                    <Form.Item 
                        label="Parent Pos"
                        name="id_parent"
                        rules={[{required: true, message: 'Parent pos harus harus diisi'}]}
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
                    :null
                }
                <Form.Item
	                label="Nama Pos"
                    name="nama"
                    rules={[{required: true, message: 'Nama pos budget harus diisi'}]}
                >
                    <Input 
                        data-jenis="nama"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                {
                    isHeader === false ?
                    <Form.Item
                        label="Saldo"
                        name="saldo"
                        style={{ marginBottom: 16 }}
                        rules={[{required: true, message: 'Saldo pos harus harus diisi'}]}
                    >
                        <InputNumber  
                            data-jenis="saldo"
                            disabled={disabledInput}
                            onChange={this.handleChangeNilaiNumeric}
                            style={{ width: 250 }}
                            precision={2}
                            formatter={this.formatterRupiah}
                            parser={this.parserRupiah}
                        />
                    </Form.Item>
                    :null
                }
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