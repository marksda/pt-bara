import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getDesa, getPropinsi, getKabupaten, getKecamatan, getStatusProyek, setItemMenuSelected, setModeProyekBaru, setStatusProyekSelected } from "../../actions/master-action";


const { Option } = AutoComplete;
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 8, span: 4 },
};
    
const mapStateToProps = store => {
    return {      
        filterStatusProyek: store.master.filter_status_proyek,
        listStatusProyek: store.master.list_status_proyek,
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        paginationStatusProyek: store.master.pagination_status_proyek,
        urutStatusProyek: store.master.urut_status_proyek,
        listCustomer: store.master.list_customer,
        modeProyekBaru: store.master.mode_proyek_baru,
        itemProyekSelected: store.master.item_proyek_selected,
        listPropinsi: store.master.list_propinsi,
        filterPropinsi: store.master.filter_propinsi,
        paginationPropinsi: store.master.pagination_propinsi,
        urutPropinsi: store.master.urut_propinsi,
        listKabupaten: store.master.list_kabupaten,
        filterKabupaten: store.master.filter_kabupaten,
        paginationKabupaten: store.master.pagination_kabupaten,
        urutKabupaten: store.master.urut_kabupaten,
        listKecamatan: store.master.list_kecamatan,
        filterKecamatan: store.master.filter_kecamatan,
        paginationKecamatan: store.master.pagination_kecamatan,
        urutKecamatan: store.master.urut_kecamatan,
        listDesa: store.master.list_desa,
        filterDesa: store.master.filter_desa,
        paginationDesa: store.master.pagination_desa,
        urutDesa: store.master.urut_desa,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        getPropinsi: (url, headerAuthorization) => dispatch(getPropinsi(url, headerAuthorization)),
        getKabupaten: (url, headerAuthorization) => dispatch(getKabupaten(url, headerAuthorization)),
        getKecamatan: (url, headerAuthorization) => dispatch(getKecamatan(url, headerAuthorization)),
        getDesa: (url, headerAuthorization) => dispatch(getDesa(url, headerAuthorization)),
        getStatusProyek: (url, headerAuthorization) => dispatch(getStatusProyek(url, headerAuthorization)),        
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),        
        setModeProyekBaru: (nilai) => dispatch(setModeProyekBaru(nilai)), 
        setStatusProyekSelected: (nilai) => dispatch(setStatusProyekSelected(nilai)), 
    };
};

class FormProfileProyek extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            disabledInput: true,
            disabledInputEdit: true
        }

        this.formRef = React.createRef();
        this.itemProyek = {};
    }

    componentDidMount() {
        const { listStatusProyek, filterStatusProyek, paginationStatusProyek, urutStatusProyek, modeProyekBaru,
        listPropinsi, filterPropinsi, paginationPropinsi, urutPropinsi, listKabupaten, filterKabupaten, paginationKabupaten,
        urutKabupaten, listKecamatan, filterKecamatan,paginationKecamatan, urutKecamatan, listDesa, filterDesa, paginationDesa, urutDesa } = this.props;

        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: false});
        }

        if(listStatusProyek === null) {
            this.loadStatusProyek(filterStatusProyek, paginationStatusProyek, urutStatusProyek);
        }

        if(listPropinsi === null) {
            this.loadPropinsi(filterPropinsi, paginationPropinsi, urutPropinsi);
        }

        if(listKabupaten === null) {
            this.loadKabupaten(filterKabupaten, paginationKabupaten, urutKabupaten);
        }

        if(listKecamatan === null) {
            this.loadKecamatan(filterKecamatan, paginationKecamatan, urutKecamatan);
        }

        if(listDesa === null) {
            this.loadDesa(filterDesa, paginationDesa, urutDesa);
        }
    }

    handleBaru = () => {
        const { modeProyekBaru, setModeProyekBaru, resetTab } = this.props;

        this.itemProyek.tanggal_persiapan = `${moment().year()}-${moment().month()}-${moment().date()}`;
        this.setState({disabledInput: false});
        setTimeout(() => {this.formRef.current.getFieldInstance('no_job').focus();}, 300);
        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: true});
            setModeProyekBaru('add');
            resetTab('01');
        }
        else {
            this.itemProyek = {
                no_job: null,
                id_customer: null,
                nama_proyek: null,
                tanggal_persiapan: null,
                perkiraan_nilai: null,
                pic_customer: null,
                no_hp_pic_customer: null,
                keterangan_persiapan: null,
                status: null
            }
        }
    }

    handleBatal = () => {
        const { modeProyekBaru } = this.props;
        this.formRef.current.resetFields();
        if(modeProyekBaru === 'edit') {
            this.setState({disabledInput: true, disabledInputEdit: false});
        }
        else {
            this.setState({disabledInput: true});
        }
    }

    handleEdit = () => {
        const { itemProyekSelected } = this.props;
        this.itemProyek = {                
            no_job: itemProyekSelected.no_job,
            id_customer: itemProyekSelected.id_customer,
            nama_proyek: itemProyekSelected.nama_proyek,
            tanggal_persiapan: itemProyekSelected.tanggal_persiapan,
            perkiraan_nilai: itemProyekSelected.perkiraan_nilai,
            pic_customer: itemProyekSelected.pic_customer,
            no_hp_pic_customer: itemProyekSelected.no_hp_pic_customer,
            keterangan_persiapan: itemProyekSelected.keterangan_persiapan,
            id_status_proyek: itemProyekSelected.id_status_proyek,
            id_pemilik_proyek: itemProyekSelected.id_pemilik_proyek,
            id_jenis_proyek: itemProyekSelected.id_jenis_proyek,
            no_kontrak: itemProyekSelected.no_kontrak,
            nilai_kontrak: itemProyekSelected.nilai_kontrak,
            no_kontrak_induk: itemProyekSelected.no_kontrak_induk,
            nip_pic: itemProyekSelected.nip_pic,
            no_hp_pic: itemProyekSelected.no_hp_pic,
            ppn: itemProyekSelected.ppn,
            pph: itemProyekSelected.pph,
            id_propinsi: itemProyekSelected.id_propinsi,
            id_kabupaten: itemProyekSelected.id_kabupaten,
            id_kecamatan: itemProyekSelected.id_kecamatan,
            id_desa: itemProyekSelected.id_desa,
            keterangan_alamat: itemProyekSelected.keterangan_alamat,
            tanggal_aktif: itemProyekSelected.tanggal_aktif
        };
        this.setState({disabledInput: false, disabledInputEdit: true});
        setTimeout(() => {this.formRef.current.getFieldInstance('nama_proyek').focus();}, 300);
    }

    handleChangeNilaiNumeric = (value) => {
        this.itemProyek.perkiraan_nilai = value;
	}

    handleChangeNilaiText = (e) => {
        const { modeProyekBaru } = this.props;

		switch(e.currentTarget.dataset.jenis) {
            case 'nojob':
                if( modeProyekBaru === 'edit' ) {
                    this.itemProyek.no_job_baru = e.currentTarget.value;
                }
                else {
                    this.itemProyek.no_job = e.currentTarget.value;
                }
                break;
            case 'namaproyek':
                this.itemProyek.nama_proyek = e.currentTarget.value;
                break;
            case 'nohp':
                this.itemProyek.no_hp_pic_customer = e.currentTarget.value;
                break;
            case 'piccustomer':
                this.itemProyek.pic_customer = e.currentTarget.value;
                break;
            case 'keterangan':
                this.itemProyek.keterangan_persiapan = e.currentTarget.value;
                break;
			default:
		}
	}

    handleChangeStatus = (value) => {
        this.itemProyek.id_status_proyek = value;
	}

    handleChangeTanggal = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemProyek.tanggal_persiapan = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    handleOnFinish = (value) => {
		const { modeProyekBaru } = this.props;
		this.setState({disabledInput: true});
		if(modeProyekBaru === 'edit') {
            this.updatePersiapanProyek();
        }
        else {
			this.savePersiapanProyek();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();        
        setTimeout(() => {this.formRef.current.getFieldInstance('no_job').focus();}, 300);
	}

    handleSearchCustomer = (value) => {
        const { paginationCustomer, urutCustomer} = this.props;
        this.loadCustomer({	field: "m.nama", search: value }, { current: 1, pageSize: 10 }, { field: "m.nama", order: "asc" });
	}

    handleSelectCustomer = (value, option) => {
        this.itemProyek.id_customer = option.key;
	}

    handleSearchPemilikProyek = (value) => {
        this.loadCustomer({	field: "m.nama", search: value }, { current: 1, pageSize: 10 }, { field: "m.nama", order: "asc" });
	}

    handleSelectPemilikProyek = (value, option) => {
        this.itemProyek.id_pemilik_proyek = option.key;
	}

    handleSearchPropinsi = (value) => {
        this.loadPropinsi({	field: "m.nama", search: value }, { current: 1, pageSize: 50 }, { field: "m.nama", order: "asc" });
    }

    handleChangePropinsi = (value) => {
        this.itemProyek.id_propinsi = value;
    }

    handleSearchKabupaten = (value) => {
        this.loadKabupaten({	field: "m.nama", search: value }, { current: 1, pageSize: 50 }, { field: "m.nama", order: "asc" });
    }

    handleChangeKabupaten = (value) => {
        this.itemProyek.id_kabupaten = value;
    }

    handleSearchKecamatan = (value) => {
        this.loadKecamatan({field: "m.nama", search: value }, { current: 1, pageSize: 50 }, { field: "m.nama", order: "asc" });
    }

    handleChangeKecamatan = (value) => {
        this.itemProyek.id_kecamatan = value;
    }

    handleToNavDaftarProyek = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Daftar Proyek');
    }

    loadCustomer = (filter, pagination, urut) => {
        const { getCustomer, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/customer?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getCustomer(url, headerAuthorization);
    }

    loadPropinsi = (filter, pagination, urut) => {
        const { getPropinsi, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/propinsi?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPropinsi(url, headerAuthorization);
    }

    loadKabupaten = (filter, pagination, urut) => {
        const { getKabupaten, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/kabupaten?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getKabupaten(url, headerAuthorization);
    }

    loadKecamatan = (filter, pagination, urut) => {
        const { getKecamatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/kecamatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getKecamatan(url, headerAuthorization);
    }

    loadDesa = (filter, pagination, urut) => {
        const { getDesa, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/desa?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getDesa(url, headerAuthorization);
    }

    loadStatusProyek = (filter, pagination, urut) => {
        const { getStatusProyek, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/statusproyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStatusProyek(url, headerAuthorization);
    }

    savePersiapanProyek = () => {
		const { 
			headerAuthorization, modeProyekBaru, restfulServer, handleToggleOpenProgressDialog,
            statusProyekSelected, setStatusProyekSelected
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/proyek`,
            headers: {...headerAuthorization},
            data: this.itemProyek
        })
	    .then((r) => {  
            handleToggleOpenProgressDialog();
            if(modeProyekBaru === 'edit') {
                self.setState({disabledInput: true, disabledInputEdit: false});
            }
            else {
                self.setState({disabledInput: true});
            }

            if(statusProyekSelected !== self.itemProyek.id_status_proyek) {
                setStatusProyekSelected(self.itemProyek.id_status_proyek)
            }
	    })
	    .catch((r) => {
            self.handleToggleOpenProgressDialog();
	    	self.setState({disabledInput: true});
	    });
	}

    updatePersiapanProyek = () => {
        console.log(this.itemProyek);
        const { headerAuthorization, modeProyekBaru, restfulServer, handleToggleOpenProgressDialog, statusProyekSelected, setStatusProyekSelected } = this.props;

        let self = this;    
                
        handleToggleOpenProgressDialog();

        axios({
            method: 'post',
            url: `${restfulServer}/master/proyek`,
            headers: {...headerAuthorization},
            data: this.itemProyek
        })
        .then((r) => { 
            self.setState({disabledInput: false});
            handleToggleOpenProgressDialog();
            if(modeProyekBaru === 'edit') {
                self.setState({disabledInput: true, disabledInputEdit: false});
            }
            else {
                self.setState({disabledInput: true});
            }

            if(statusProyekSelected !== self.itemProyek.id_status_proyek) {
                setStatusProyekSelected(self.itemProyek.id_status_proyek)
            }
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
        });        
    }

    render() {
        const { itemProyekSelected, listCustomer, listDesa, listKecamatan, listPropinsi, modeProyekBaru, listStatusProyek, listKabupaten } = this.props;
        const { disabledInput, disabledInputEdit } = this.state;
        
        let keyForm;
        let initEdit;
        if(modeProyekBaru === 'edit' && itemProyekSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(itemProyekSelected.tanggal_persiapan),
                ["no_job"]: itemProyekSelected.no_job,
                ["id_status_proyek"]: itemProyekSelected.id_status_proyek,
                ["nama_proyek"]: itemProyekSelected.nama_proyek,
                ["nama_customer"]: itemProyekSelected.nama_customer,
                ["perkiraan_nilai"]: itemProyekSelected.perkiraan_nilai,
                ["pic_customer"]: itemProyekSelected.pic_customer,
                ["no_hp_pic_customer"]: itemProyekSelected.no_hp_pic_customer,
                ["keterangan_persiapan"]: itemProyekSelected.keterangan_persiapan,
                ["pemilik_proyek"]: itemProyekSelected.pemilik_proyek,
                ["id_propinsi"]: itemProyekSelected.id_propinsi,
                ["id_kabupaten"]: itemProyekSelected.id_kabupaten,
                ["id_kecamatan"]: itemProyekSelected.id_kecamatan,
                ["id_desa"]: itemProyekSelected.id_desa,
            };
            keyForm = 'edit'
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(),
                ["id_status_proyek"]: '01'
            };

            keyForm = 'add';
        }

        let page =
        <Form
            name="form-persiapan-proyek"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={initEdit}
            key={keyForm}
        >
            <div className="content-flex-center">
                <table className="table-container-proyek-baru" style={{width: '70%'}}>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Tanggal Persiapan"
                                    name="tanggal"
                                    rules={[{required: true, message: 'Tanggal persiapan harus diisi'}]}
                                    style={{marginBottom: 8}}
                                >
                                    <DatePicker 
                                        format="DD-MM-YYYY" 
                                        disabled={disabledInput}
                                        style={{width: 150}}
                                        onChange={this.handleChangeTanggal}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Status"
                                    name="id_status_proyek"
                                    rules={[{required: true, message: 'Status harus diisi'}]}
                                    style={{marginBottom: 8}}
                                >
                                    <Select 
                                        onChange={this.handleChangeStatus}
                                        disabled={disabledInput}
                                        style={{width: 110}}
                                        placeholder="Pilih status"
                                    >
                                    {
                                        listStatusProyek !== null ? listStatusProyek.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Item
                                    label="No. Job"
                                    name="no_job"
                                    rules={[{required: true, message: 'No. job harus diisi'}]}
                                >
                                    <Input 
                                        data-jenis="nojob"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{ width: 150 }}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Customer"
                                    name="nama_customer"
                                    rules={[{required: true, message: 'Customer harus diisi'}]}
                                >
                                    <AutoComplete 
                                        onSearch={this.handleSearchCustomer}
                                        onSelect={this.handleSelectCustomer}
                                        disabled={disabledInput}
                                        style={{width: 350}}
                                    >
                                    {
                                        listCustomer !== null ? listCustomer.data.map((row) => 
                                            <Option key={row.id} value={row.nama}>
                                                {row.nama}
                                            </Option>
                                        ):null
                                    }
                                    </AutoComplete>
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="Proyek"
                                    name="nama_proyek"
                                    rules={[{required: true, message: 'Proyek harus diisi'}]}
                                    style={{minWidth: 250}}
                                >
                                    <Input 
                                        data-jenis="namaproyek"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Form.Item 
                                    label="Pemilik proyek"
                                    name="pemilik_proyek"
                                    rules={[{required: true, message: 'Pemilik proyek harus diisi'}]}
                                >
                                    <AutoComplete 
                                        onSearch={this.handleSearchPemilikProyek}
                                        onSelect={this.handleSelectPemilikProyek}
                                        disabled={disabledInput}
                                        style={{width: 350}}
                                    >
                                    {
                                        listCustomer !== null ? listCustomer.data.map((row) => 
                                            <Option key={row.id} value={row.nama}>
                                                {row.nama}
                                            </Option>
                                        ):null
                                    }
                                    </AutoComplete>
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Lokasi Proyek"
                                    name="id_propinsi"
                                    rules={[{required: true, message: 'Propinsi harus diisi'}]}
                                    style={{marginBottom: 8}}
                                >
                                    <Select 
                                        showSearch
                                        onChange={this.handleChangePropinsi}
                                        disabled={disabledInput}
                                        style={{width: 200}}
                                        placeholder="Pilih Propinsi"
                                        showArrow={false}
                                        onSearch={this.handleSearchPropinsi}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listPropinsi !== null ? listPropinsi.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    name="id_kabupaten"
                                    rules={[{required: true, message: 'Kabupaten harus diisi'}]}
                                    style={{marginBottom: 8}}
                                >
                                    <Select 
                                        showSearch
                                        onChange={this.handleChangeKabupaten}
                                        disabled={disabledInput}
                                        style={{width: 300}}
                                        placeholder="Pilih kota/kab"
                                        showArrow={false}
                                        onSearch={this.handleSearchKabupaten}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listKabupaten !== null ? listKabupaten.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    name="id_kecamatan"
                                    rules={[{required: true, message: 'Kecamatan harus diisi'}]}
                                    style={{marginBottom: 8}}
                                >
                                    <Select 
                                        showSearch
                                        onChange={this.handleChangeKecamatan}
                                        disabled={disabledInput}
                                        style={{width: 300}}
                                        placeholder="Pilih kecamatan"
                                        showArrow={false}
                                        onSearch={this.handleSearchKecamatan}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listKecamatan !== null ? listKecamatan.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    name="id_desa"
                                    rules={[{required: true, message: 'Desa harus diisi'}]}
                                    style={{marginBottom: 8}}
                                >
                                    <Select 
                                        showSearch
                                        onChange={this.handleChangeDesa}
                                        disabled={disabledInput}
                                        style={{width: 300}}
                                        placeholder="Pilih Desa"
                                        showArrow={false}
                                        onSearch={this.handleSearchDesa}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listDesa !== null ? listDesa.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>                            
                            <td>
                                <Form.Item
                                    label="PIC Proyek (customer)"
                                    name="pic_customer"
                                >
                                    <Input 
                                        data-jenis="piccustomer"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{ width: 250 }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Form.Item
                                    label="HP"
                                    name="no_hp_pic_customer"
                                >
                                    <Input 
                                        data-jenis="nohp"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{ width: 250 }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3">
                                <Form.Item
                                    label="Keterangan"
                                    name="keterangan_persiapan"
                                >
                                    <TextArea  
                                        rows={6}
                                        data-jenis="keterangan"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                        <td>
                            <Form.Item
                                label="Perkiraan Nilai"
                                name="perkiraan_nilai"
                            >
                                <InputNumber  
                                    data-jenis="nilai"
                                    disabled={disabledInput}
                                    onChange={this.handleChangeNilaiNumeric}
                                    style={{ width: 150 }}
                                    formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '\.')}
                                    parser={value => value.replace(/Rp\s?|(\.*)/g, '')}
                                />
                            </Form.Item>
                        </td>
                        </tr>
                    </tbody>
                </table>                
                <Form.Item {...tailLayout} style={{width:100}}>
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleBaru} 
                        style={{marginBottom: 8, width: 120}}
                        disabled={!disabledInput}
                    >
                        Baru
                    </Button>
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleEdit} 
                        style={{marginBottom: 8, width: 120}}
                        disabled={disabledInputEdit}
                    >
                        Edit
                    </Button>
                    <Button 
                        danger
                        type="primary" 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleBatal} 
                        style={{marginBottom: 8, width: 120}}
                        disabled={disabledInput}
                    >
                    Batal
                    </Button>
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleReset} 
                        disabled={modeProyekBaru==='edit'?true:disabledInput}
                        style={{marginBottom: 8, width: 120}}
                    >
                    Reset
                    </Button>
                    <Button 
                        type="primary" 
                        shape="round"
                        size="default"
                        htmlType="submit" 
                        disabled={disabledInput}
                        style={{width: 120, marginBottom: 100}}
                    >
                    Simpan
                    </Button>
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleToNavDaftarProyek} 
                        disabled={!disabledInput}
                        style={{marginBottom: 8, width: 120}}
                    >
                    Daftar Proyek
                    </Button>
                </Form.Item>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormProfileProyek);