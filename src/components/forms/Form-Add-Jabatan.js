import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getJabatan } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        filterJabatan: store.master.filter_jabatan,
        headerAuthorization: store.credential.header_authorization,
        paginationJabatan: store.master.pagination_jabatan,
        restfulServer: store.general.restful_domain,
        urutJabatan: store.master.urut_jabatan
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getJabatan: (url, headerAuthorization) => dispatch(getJabatan(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

class FormAddJabatan extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemJabatan = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemJabatan = {...data};
        }
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'id':
                if(mode === "edit") {
                    this.itemJabatan.idbaru = e.currentTarget.value;
                }
				else {
                    this.itemJabatan.id = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemJabatan.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateJabatan();
        }
        else {
			this.saveJabatan();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadJabatan = (filter, pagination, urut) => {
        const { getJabatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/jabatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getJabatan(url, headerAuthorization);
    }

    saveJabatan = () => {
		const { 
			filterJabatan, headerAuthorization, paginationJabatan, restfulServer, urutJabatan, handleClose, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/jabatan`,
            headers: {...headerAuthorization},
            data: this.itemJabatan
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadJabatan(filterJabatan, paginationJabatan, urutJabatan);
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

    updateJabatan = () => {
        const { filterJabatan, headerAuthorization, paginationJabatan, restfulServer, urutJabatan, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/jabatan`,
            headers: {...headerAuthorization},
            data: this.itemJabatan
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadJabatan(
                    filterJabatan,
                    paginationJabatan,
                    urutJabatan
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
            title={mode==='edit'?'Formulir Edit Jabatan':'Formulir Add Jabatan'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--Jabatan"
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
                    rules={[{required: true, message: 'Id jabatan harus diisi'}]}
                >
                    <Input 
                        data-jenis="id"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama jabatan harus diisi'}]}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAddJabatan);