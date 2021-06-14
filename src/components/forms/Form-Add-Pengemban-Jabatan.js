import React, { Component } from "react";
import axios from 'axios';
import { AutoComplete, Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getPegawai, getPengembanJabatan, getStrukturOrganisasi } from "../../actions/master-action";

const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const mapStateToProps = store => {
    return {      
        filterPengembanJabatan: store.master.filter_pengemban_jabatan,
        headerAuthorization: store.credential.header_authorization,
        paginationPengembanJabatan: store.master.pagination_pengemban_jabatan,
        restfulServer: store.general.restful_domain,
        urutPengembanJabatan: store.master.urut_pengemban_jabatan,
        listPegawai: store.master.list_pegawai,
        filterPegawai: store.master.filter_pegawai,
        paginationPegawai: store.master.pagination_pegawai,
        urutPegawai: store.master.urut_pegawai,
        listStrukturOrganisasi: store.master.list_struktur_organisasi,        
        filterStrukturOrganisasi: store.master.filter_struktur_organisasi
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getPegawai: (url, headerAuthorization) => dispatch(getPegawai(url, headerAuthorization)),
        getPengembanJabatan: (url, headerAuthorization) => dispatch(getPengembanJabatan(url, headerAuthorization)),
        getStrukturOrganisasi: (url, headerAuthorization) => dispatch(getStrukturOrganisasi(url, headerAuthorization)),        
    };
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
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
        const { data, filterStrukturOrganisasi, mode } = this.props;
        let tmpPaginationSO = {
            current: 1,
            pageSize: 100,
        };
        let urutSO = {
            field: "m.nama",
            order: "asc"
        };

        this.loadStrukturOrganisasi(filterStrukturOrganisasi, tmpPaginationSO, urutSO);
               
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

    handleChangeStrukturOrganisasi = (value) => {
		this.itemPengembanJabatan.id_struktur_organisasi = value;			
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

    handleSearchPegawai = (value) => {
        const { paginationPegawai, urutPegawai} = this.props;
		let tmpFilter = {
        	field: "m.nama",
        	search: value
        };
        this.loadPegawai(tmpFilter, paginationPegawai, urutPegawai);
	}

    handleSelectPegawai = (value, option) => {
		this.itemPengembanJabatan.nip_pegawai = option.key;
		this.itemPengembanJabatan.nama = value;
	}

    loadPegawai = (filter, pagination, urut) => {
        const { getPegawai, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pegawai?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPegawai(url, headerAuthorization);
    }

    loadPengembanJabatan = (filter, pagination, urut) => {
        const { getPengembanJabatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pengembanjabatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPengembanJabatan(url, headerAuthorization);
    }

    loadStrukturOrganisasi = (filter, pagination, urut) => {
        const { getStrukturOrganisasi, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/strukturorganisasi?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStrukturOrganisasi(url, headerAuthorization);
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
        const { data, handleClose, listPegawai, listStrukturOrganisasi, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Pengemban Jabatan':'Formulir Add Pengemban Jabatan'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="40%"
        >
            <Form
                {...layout}
                name="form--PengembanJabatan"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["priode"]: mode==='edit'?[data.priode_start,data.priode_start]:null,
                    ["nip_pegawai"]: mode==='edit'?data.nip_pegawai:null,
                    ["id_struktur_organisasi"]: mode==='edit'?data.id_struktur_organisasi:null,
                    ["nama"]: mode==='edit'?data.nama:'',
                }}
            >      
                <Form.Item
	                label="Priode Jabatan"
                    name="priode"
                    rules={[{required: true, message: 'Priode jabatan harus harus diisi'}]}
                >
                    <RangePicker 
                        picker="year" 
                        style={{width: 150}}
                    />
                </Form.Item>   
                <Form.Item 
                    label="Pegawai"
                    name="nip_pegawai"
                    rules={[{required: true, message: 'Pegawai harus harus diisi'}]}
                >
                    <AutoComplete 
                        onSearch={this.handleSearchPegawai}
                        onSelect={this.handleSelectPegawai}
                        disabled={disabledInput}
                    >
                    {
                        listPegawai !== null ? listPegawai.data.map((row) => 
                            <Option key={row.nip_pegawai} value={row.nama}>
                                {row.nama}
                            </Option>
                        ):null
                    }
                    </AutoComplete>
                </Form.Item> 
                <Form.Item 
                    label="Struktur Organisasi"
                    name="id_struktur_organisasi"
                    rules={[{required: true, message: 'Struktur organisasi harus harus diisi'}]}
                >
                    <Select 
                        onChange={this.handleChangeStrukturOrganisasi}
                        disabled={disabledInput}
                        style={{width: 200}}
                    >
                    {
                        listStrukturOrganisasi !== null ? listStrukturOrganisasi.data.map((row, index) => 
                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                        ):null
                    }	
                    </Select>
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