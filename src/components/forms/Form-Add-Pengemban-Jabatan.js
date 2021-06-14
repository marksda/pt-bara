import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getPengembanJabatan } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        filterPengembanJabatan: store.master.filter_pengemban_jabatan,
        headerAuthorization: store.credential.header_authorization,
        paginationPengembanJabatan: store.master.pagination_pengemban_jabatan,
        restfulServer: store.general.restful_domain,
        urutPengembanJabatan: store.master.urut_pengemban_jabatan
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getPengembanJabatan: (url, headerAuthorization) => dispatch(getPengembanJabatan(url, headerAuthorization))
    };
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

class FormAddPengembanJabatan extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemPengembanJabatan = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemPengembanJabatan = {...data};
        }
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'id':
                if(mode === "edit") {
                    this.itemPengembanJabatan.idbaru = e.currentTarget.value;
                }
				else {
                    this.itemPengembanJabatan.id = e.currentTarget.value;
                }
				break;
			case 'nama':
				this.itemPengembanJabatan.nama = e.currentTarget.value;
				break;
			default:
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updatePengembanJabatan();
        }
        else {
			this.savePengembanJabatan();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    loadPengembanJabatan = (filter, pagination, urut) => {
        const { getPengembanJabatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pengembanjabatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPengembanJabatan(url, headerAuthorization);
    }

    savePengembanJabatan = () => {
		const { 
			filterPengembanJabatan, headerAuthorization, paginationPengembanJabatan, restfulServer, urutPengembanJabatan, handleClose, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/pengembanjabatan`,
            headers: {...headerAuthorization},
            data: this.itemPengembanJabatan
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadPengembanJabatan(filterPengembanJabatan, paginationPengembanJabatan, urutPengembanJabatan);
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

    updatePengembanJabatan = () => {
        const { filterPengembanJabatan, headerAuthorization, paginationPengembanJabatan, restfulServer, urutPengembanJabatan, handleClose } = this.props;

        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/pengembanjabatan`,
            headers: {...headerAuthorization},
            data: this.itemPengembanJabatan
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadPengembanJabatan(
                    filterPengembanJabatan,
                    paginationPengembanJabatan,
                    urutPengembanJabatan
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
            title={mode==='edit'?'Formulir Edit PengembanJabatan':'Formulir Add PengembanJabatan'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--PengembanJabatan"
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
                    rules={[{required: true, message: 'Id pengembanjabatan harus diisi'}]}
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
                    rules={[{required: true, message: 'Nama pengembanjabatan harus diisi'}]}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormAddPengembanJabatan);