import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getPegawai } from "../../actions/master-action";

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
		};

		this.formRef = React.createRef();
		this.itemPegawai = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemPegawai = {...data};
        }
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'id':
                if(mode === "edit") {
                    this.itemPegawai.idbaru = e.currentTarget.value;
                }
				else {
                    this.itemPegawai.id = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemPegawai.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updatePegawai();
        }
        else {
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
            data: this.itemPegawai
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadPegawai(filterPegawai, paginationPegawai, urutPegawai);
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

    updatePegawai = () => {
        const { filterPegawai, headerAuthorization, paginationPegawai, restfulServer, urutPegawai, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/pegawai`,
            headers: {...headerAuthorization},
            data: this.itemPegawai
        })
        .then((r) => {         
            if(r.data.status === 200) {
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
            self.setState({disabledInput: false});
        });        
    }

    render() {
        const { data, handleClose, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Pegawai':'Formulir Add Pegawai'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--Pegawai"
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
                    rules={[{required: true, message: 'Id pegawai harus diisi'}]}
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
                    rules={[{required: true, message: 'Nama pegawai harus diisi'}]}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAddPegawai);