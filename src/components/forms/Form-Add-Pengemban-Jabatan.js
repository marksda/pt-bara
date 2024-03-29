import React, { Component } from "react";
import axios from 'axios';
import moment from "moment";
import { AutoComplete, Button, DatePicker, Form, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getJabatan, getPegawai, getPengembanJabatan, getStrukturOrganisasi } from "../../actions/master-action";

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
        listJabatan: store.master.list_jabatan,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getJabatan: (url, headerAuthorization) => dispatch(getJabatan(url, headerAuthorization)),
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
        const { data, mode } = this.props;
        let filterSO = {
            field: null,
            search: null
        };
        let tmpPaginationSO = {
            current: 1,
            pageSize: 100,
        };
        let urutSO = {
            field: "m.nama",
            order: "asc"
        };

        let filterJBT = {
            field: null,
            search: null
        };
        let tmpPaginationJBT = {
            current: 1,
            pageSize: 100,
        };
        let urutJBT = {
            field: "m.nama",
            order: "asc"
        };

        this.loadStrukturOrganisasi(filterSO, tmpPaginationSO, urutSO);
        this.loadJabatan(filterJBT, tmpPaginationJBT, urutJBT);
               
        if(mode === 'edit') {
            this.itemPengembanJabatan = {...data};
            this.itemPengembanJabatan.nip_baru_pegawai = this.itemPengembanJabatan.nip_pegawai;
            this.itemPengembanJabatan.id_baru_jabatan = this.itemPengembanJabatan.id_jabatan;
            this.itemPengembanJabatan.id_baru_struktur_organisasi = this.itemPengembanJabatan.id_struktur_organisasi;
            this.itemPengembanJabatan.priode_baru_start = this.itemPengembanJabatan.priode_start;
            this.itemPengembanJabatan.priode_baru_end = this.itemPengembanJabatan.priode_end;
        }
    }

    handleChangeJabatan = (value) => {
        const { mode } = this.props;
        if(mode === 'edit') {
            this.itemPengembanJabatan.id_baru_jabatan = value;
        }
        else {
            this.itemPengembanJabatan.id_jabatan = value;
        }	
	}

    handleChangePriode = (dates, dateStrings) => {
        const { mode } = this.props;
        if(mode === 'edit') {
            this.itemPengembanJabatan.priode_baru_start = Number(dateStrings[0]);
            this.itemPengembanJabatan.priode_baru_end = Number(dateStrings[1]);
        }
        else {
            this.itemPengembanJabatan.priode_start = Number(dateStrings[0]);
            this.itemPengembanJabatan.priode_end = Number(dateStrings[1]);
        }        
    }

    handleChangeStrukturOrganisasi = (value) => {
        const { mode } = this.props;
        if(mode === 'edit') {
            this.itemPengembanJabatan.id_baru_struktur_organisasi = value;
        }
		else {
            this.itemPengembanJabatan.id_struktur_organisasi = value;	
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

    handleSearchPegawai = (value) => {
        const { paginationPegawai, urutPegawai} = this.props;
		let tmpFilter = {
        	field: "m.nama",
        	search: value
        };
        this.loadPegawai(tmpFilter, paginationPegawai, urutPegawai);
	}

    handleSelectPegawai = (value, option) => {
        const { mode } = this.props;
        if(mode === 'edit') {
            this.itemPengembanJabatan.nip_baru_pegawai = option.key;
        }
        else {
            this.itemPengembanJabatan.nip_pegawai = option.key;
        }		
	}

    loadJabatan = (filter, pagination, urut) => {
        const { getJabatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/jabatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getJabatan(url, headerAuthorization);
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
        const { data, handleClose, listJabatan, listPegawai, listStrukturOrganisasi, mode, visible } = this.props;
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
                    ["priode"]: mode==='edit'?[moment(`${data.priode_start}-01-01`), moment(`${data.priode_end}-01-01`)]:null,
                    ["nama"]: mode==='edit'?data.nama:null,
                    ["id_struktur_organisasi"]: mode==='edit'?data.id_struktur_organisasi:null,
                    ["id_jabatan"]: mode==='edit'?data.id_jabatan:null,
                }}
            >      
                <Form.Item
	                label="Priode Jabatan"
                    name="priode"
                    rules={[{required: true, message: 'Priode jabatan harus harus diisi'}]}
                >
                    <RangePicker 
                        picker="year" 
                        disabled={disabledInput}
                        style={{width: 150}}
                        onChange={this.handleChangePriode}
                    />
                </Form.Item>   
                <Form.Item 
                    label="Pegawai"
                    name="nama"
                    rules={[{required: true, message: 'Pegawai harus harus diisi'}]}
                >
                    <AutoComplete 
                        onSearch={this.handleSearchPegawai}
                        onSelect={this.handleSelectPegawai}
                        defaultValue={mode==='edit'?this.itemPengembanJabatan.nama:null}
                        disabled={disabledInput}
                    >
                    {
                        listPegawai !== null ? listPegawai.data.map((row) => 
                            <Option key={row.nip} value={row.nama}>
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
                        listStrukturOrganisasi !== null ? listStrukturOrganisasi.data.map((row) => 
                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                        ):null
                    }	
                    </Select>
                </Form.Item>
                <Form.Item 
                    label="Jabatan"
                    name="id_jabatan"
                    rules={[{required: true, message: 'Jabatan harus harus diisi'}]}
                >
                    <Select 
                        onChange={this.handleChangeJabatan}
                        disabled={disabledInput}
                        style={{width: 200}}
                    >
                    {
                        listJabatan !== null ? listJabatan.data.map((row) => 
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