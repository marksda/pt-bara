import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getAkun, setIsProgress } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        filterAkun: store.master.filter_akun,
        headerAuthorization: store.credential.header_authorization,
        paginationAkun: store.master.pagination_akun,
        restfulServer: store.general.restful_domain,
        urutAkun: store.master.urut_akun,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getAkun: (url, headerAuthorization) => dispatch(getAkun(url, headerAuthorization)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};

class FormAddAkun extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemAkun = {};
        this.filterAkunHeader = [{ field: "m.status_header", header: true }];
        this.paginationAkunHeader = {current: 1, pageSize: 1000};
        this.sortAkunHeader = {field: 'm.nama', order: 'asc' };
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemAkun = {...data};
            setTimeout(() => {this.formRef.current.getFieldInstance('id').focus();}, 300);
        }
        else {
            this.itemAkun.status_header = false;
        }
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'id':
                if(mode === "edit") {
                    this.itemAkun.idbaru = e.currentTarget.value;
                }
				else {
                    this.itemAkun.id = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemAkun.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleChangeStatusHeader = (value) => {
        this.itemAkun.status_header = (value === 'true');
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateAkun();
        }
        else {
			this.saveAkun();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadAkun = (filter, pagination, urut) => {
        const { getAkun, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/akun?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        else {
            url = `${restfulServer}/master/akun?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        
        getAkun(url, headerAuthorization);
    }

    saveAkun = () => {
		const { 
			filterAkun, headerAuthorization, paginationAkun, restfulServer, urutAkun, 
            loadHeaderAkun, setIsProgress
		} = this.props;
	    let self = this;
        
	    // handleToggleOpenProgressDialog();
        setIsProgress(true);

	    axios({
            method: 'put',
            url: `${restfulServer}/master/akun`,
            headers: {...headerAuthorization},
            data: this.itemAkun
        })
	    .then((r) => {  
            setIsProgress(false);
	    	if(r.data.status === 200) {        
				self.loadAkun(filterAkun, paginationAkun, urutAkun);
                if(self.itemAkun.status_header === true) {
                    loadHeaderAkun(self.filterAkunHeader, self.paginationAkunHeader, self.sortAkunHeader);
                }
	    	} 
	    	self.handleReset();
            self.setState({disabledInput: false});
            // handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
            setIsProgress(false);
	    	self.setState({disabledInput: true});
	    });
	}    

    updateAkun = () => {
        const { filterAkun, headerAuthorization, paginationAkun, restfulServer, urutAkun, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/akun`,
            headers: {...headerAuthorization},
            data: this.itemAkun
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadAkun(
                    filterAkun,
                    paginationAkun,
                    urutAkun
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
        const { data, handleClose, isProgress, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Akun':'Formulir Add Akun'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--Akun"
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
                    rules={[{required: true, message: 'Kode akun harus diisi'}]}
                >
                    <Input 
                        data-jenis="id"
                        disabled={isProgress===true?true:disabledInput}
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
                        disabled={isProgress===true?true:disabledInput}
                        style={{width: 200}}
                    >
                        <Select.Option value="true">Header</Select.Option>
                        <Select.Option value="false">Detail</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama akun harus diisi'}]}
                >
                    <Input 
                        data-jenis="nama"
                        disabled={isProgress===true?true:disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    {
                        mode==='edit'?
                        <Button 
                            htmlType="button" 
                            onClick={this.handleReset} 
                            disabled={mode==='edit'?true:disabledInput}
                            style={{marginRight: 8}}
                        >
                            Reset
                        </Button>:
                        <Button 
                            htmlType="button" 
                            onClick={this.handleReset} 
                            disabled={isProgress===true?true:disabledInput}
                            style={{marginRight: 8}}
                        >
                            Reset
                        </Button>
                    }                    
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        disabled={isProgress===true?true:disabledInput}
                    >
                    Simpan
                    </Button>
                </Form.Item>
            </Form>
        </Modal>;

	    return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddAkun);