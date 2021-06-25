import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, DatePicker, Divider, Form, Input, InputNumber, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getDesa, getJenisProyek, getPegawai, getPropinsi, getKabupaten, getKecamatan, getStatusProyek, setItemMenuSelected, setModeProyekBaru, setStatusProyekSelected } from "../../actions/master-action";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
        filterCustomer: store.master.filter_customer,
        paginationCustomer: store.master.pagination_customer,
        urutCustomer: store.master.urut_customer,
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
        listJenisProyek: store.master.list_jenis_proyek,
        filterJenisProyek: store.master.filter_jenis_proyek,
        paginationJenisProyek: store.master.pagination_jenis_proyek,
        urutJenisProyek: store.master.urut_jenis_proyek,
        listPegawai: store.master.list_pegawai,
        filterPegawai: store.master.filter_pegawai,
        paginationPegawai: store.master.pagination_pegawai,
        urutPegawai: store.master.urut_pegawai,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        getPropinsi: (url, headerAuthorization) => dispatch(getPropinsi(url, headerAuthorization)),
        getPegawai: (url, headerAuthorization) => dispatch(getPegawai(url, headerAuthorization)),
        getKabupaten: (url, headerAuthorization) => dispatch(getKabupaten(url, headerAuthorization)),
        getKecamatan: (url, headerAuthorization) => dispatch(getKecamatan(url, headerAuthorization)),
        getDesa: (url, headerAuthorization) => dispatch(getDesa(url, headerAuthorization)),
        getJenisProyek: (url, headerAuthorization) => dispatch(getJenisProyek(url, headerAuthorization)), 
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
        urutKabupaten, listKecamatan, filterKecamatan,paginationKecamatan, urutKecamatan, listDesa, filterDesa, paginationDesa, 
        urutDesa, listCustomer, filterCustomer, paginationCustomer, urutCustomer, listJenisProyek, filterJenisProyek, paginationJenisProyek, urutJenisProyek,listPegawai, filterPegawai, paginationPegawai, urutPegawai } = this.props;

        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: false});
        }

        if(listCustomer === null) {
            this.loadCustomer(filterCustomer, paginationCustomer, urutCustomer);
        }

        if(listJenisProyek === null) {
            this.loadJenisProyek(filterJenisProyek, paginationJenisProyek, urutJenisProyek);
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

        if(listPegawai === null) {
            this.loadPegawai(filterPegawai, paginationPegawai, urutPegawai);
        }
    }

    handleBatal = () => {
        this.formRef.current.resetFields();
        this.setState({disabledInput: true, disabledInputEdit: false});
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
            keterangan_proyek: itemProyekSelected.keterangan_proyek,
            tanggal_aktif: itemProyekSelected.tanggal_aktif
        };
        if(this.itemProyek.tanggal_aktif === null) {
            this.itemProyek.tanggal_aktif =  `${moment().year()}-${moment().month()}-${moment().date()}`;
        }
        this.setState({disabledInput: false, disabledInputEdit: true});
        setTimeout(() => {this.formRef.current.getFieldInstance('pemilik_proyek').focus();}, 300);
    }

    handleChangeJenis = (value) => {
        this.itemProyek.id_jenis_proyek = value;
	}

    handleChangeNilaiKontrak = (value) => {
        this.itemProyek.nilai_kontrak = value;
	}

    handleChangeNilaiPpn = (value) => {
        this.itemProyek.ppn = value;
	}

    handleChangeNilaiPph = (value) => {
        this.itemProyek.pph = value;
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
            case 'nohpcustomer':
                this.itemProyek.no_hp_pic_customer = e.currentTarget.value;
                break;
            case 'piccustomer':
                this.itemProyek.pic_customer = e.currentTarget.value;
                break;
            case 'nokontrak':
                this.itemProyek.no_kontrak = e.currentTarget.value;
                break;
            case 'ketalamat':
                this.itemProyek.keterangan_alamat = e.currentTarget.value;
                break;
            case 'nokontrakinduk':
                this.itemProyek.no_kontrak_induk = e.currentTarget.value;
                break;
            case 'nohpbara':
                this.itemProyek.no_hp_pic = e.currentTarget.value;
                break;
            case 'ketproyek':
                this.itemProyek.keterangan_proyek = e.currentTarget.value;
                break;
			default:
                break;
		}
	}

    handleChangeStatus = (value) => {
        this.itemProyek.id_status_proyek = value;
	}

    handleChangeTanggal = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemProyek.tanggal_aktif = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    handleOnFinish = (value) => {
		this.setState({disabledInput: true});
        this.updatePofileProyek();
	}

    handleReset = () => {
		this.formRef.current.resetFields();        
        setTimeout(() => {this.formRef.current.getFieldInstance('no_job').focus();}, 300);
	}

    handleSearchCustomer = (value) => {
        const { paginationCustomer, urutCustomer} = this.props;
        this.loadCustomer({	field: "m.nama", search: value }, { current: 1, pageSize: 10 }, { field: "m.nama", order: "asc" });
	}

    handleChangeCustomer = (value) => {
        this.itemProyek.id_customer = value;
	}

    handleSearchPemilikProyek = (value) => {
        this.loadCustomer({	field: "m.nama", search: value }, { current: 1, pageSize: 10 }, { field: "m.nama", order: "asc" });
	}

    handleChangePemilikProyek = (value) => {
        this.itemProyek.id_pemilik_proyek = value;
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

    handleSearchDesa = (value) => {
        this.loadDesa({field: "m.nama", search: value }, { current: 1, pageSize: 50 }, { field: "m.nama", order: "asc" });
    }

    handleChangeDesa = (value) => {
        this.itemProyek.id_desa = value;
    }

    handleSearchPICBara = (value) => {
        this.loadPegawai({field: "m.nama", search: value }, { current: 1, pageSize: 50 }, { field: "m.nama", order: "asc" });
    }

    handleChangePICBara = (value) => {
        this.itemProyek.nip_pic = value;
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

    loadPegawai = (filter, pagination, urut) => {
        const { getPegawai, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pegawai?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPegawai(url, headerAuthorization);
    }

    loadJenisProyek = (filter, pagination, urut) => {
        const { getJenisProyek, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/jenisproyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getJenisProyek(url, headerAuthorization);
    }

    loadStatusProyek = (filter, pagination, urut) => {
        const { getStatusProyek, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/statusproyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStatusProyek(url, headerAuthorization);
    }

    updatePofileProyek = () => {
        console.log(this.itemProyek);
        // console.log(this.itemProyek);
        // const { headerAuthorization, modeProyekBaru, restfulServer, handleToggleOpenProgressDialog, statusProyekSelected, setStatusProyekSelected } = this.props;

        // let self = this;    
                
        // handleToggleOpenProgressDialog();

        // axios({
        //     method: 'post',
        //     url: `${restfulServer}/master/proyek`,
        //     headers: {...headerAuthorization},
        //     data: this.itemProyek
        // })
        // .then((r) => { 
        //     self.setState({disabledInput: false});
        //     handleToggleOpenProgressDialog();
        //     if(modeProyekBaru === 'edit') {
        //         self.setState({disabledInput: true, disabledInputEdit: false});
        //     }
        //     else {
        //         self.setState({disabledInput: true});
        //     }

        //     if(statusProyekSelected !== self.itemProyek.id_status_proyek) {
        //         setStatusProyekSelected(self.itemProyek.id_status_proyek)
        //     }
        // })
        // .catch((r) => {         
        //     self.setState({disabledInput: false});
        // });        
    }

    render() {
        const { itemProyekSelected, listCustomer, listDesa, listPegawai, listJenisProyek, listKecamatan, listPropinsi, modeProyekBaru, listStatusProyek, listKabupaten } = this.props;
        const { disabledInput, disabledInputEdit } = this.state;
        
        let keyForm;
        let initEdit;
        if(modeProyekBaru === 'edit' && itemProyekSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: itemProyekSelected.tanggal_aktif !== null?moment(itemProyekSelected.tanggal_aktif):moment(),
                ["no_job"]: itemProyekSelected.no_job,
                ["id_status_proyek"]: itemProyekSelected.id_status_proyek,
                ["nama_proyek"]: itemProyekSelected.nama_proyek,
                ["nama_customer"]: itemProyekSelected.nama_customer,
                ["perkiraan_nilai"]: itemProyekSelected.perkiraan_nilai,
                ["pic_customer"]: itemProyekSelected.pic_customer,
                ["no_hp_pic_customer"]: itemProyekSelected.no_hp_pic_customer,
                ["nip_pic"]: itemProyekSelected.nip_pic,
                ["no_hp_pic"]: itemProyekSelected.no_hp_pic,
                ["keterangan_proyek"]: itemProyekSelected.keterangan_proyek,
                ["pemilik_proyek"]: itemProyekSelected.pemilik_proyek,
                ["id_propinsi"]: itemProyekSelected.id_propinsi,
                ["id_kabupaten"]: itemProyekSelected.id_kabupaten,
                ["id_kecamatan"]: itemProyekSelected.id_kecamatan,
                ["id_desa"]: itemProyekSelected.id_desa,
                ["id_jenis_proyek"]: itemProyekSelected.id_jenis_proyek,
                ["no_kontrak"]: itemProyekSelected.no_kontrak,
                ["keterangan_alamat"]: itemProyekSelected.keterangan_alamat,
                ["no_kontrak_induk"]: itemProyekSelected.no_kontrak_induk,
            };
            keyForm = 'edit'
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(),
                ["id_status_proyek"]: '01',
                ["id_jenis_proyek"]: '01',
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
                <table className="table-container-proyek-baru" style={{width: '80%'}}>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Tanggal Aktif"
                                    name="tanggal"
                                    rules={[{required: true, message: 'Tanggal Aktif harus diisi'}]}
                                    style={{marginBottom: 16}}
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
                                    label="Status Proyek"
                                    name="id_status_proyek"
                                    rules={[{required: true, message: 'Status harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <Select 
                                        onChange={this.handleChangeStatus}
                                        disabled={disabledInput}
                                        style={{width: 180}}
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
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="nojob"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{ minWidth: 150 }}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Customer"
                                    name="nama_customer"
                                    rules={[{required: true, message: 'Customer harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <Select 
                                        showSearch
                                        onChange={this.handleChangeCustomer}
                                        disabled={disabledInput}
                                        placeholder="Pilih pemilik proyek"
                                        showArrow={false}
                                        onSearch={this.handleSearchCustomer}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listCustomer !== null ? listCustomer.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="Proyek"
                                    name="nama_proyek"
                                    rules={[{required: true, message: 'Proyek harus diisi'}]}
                                    style={{minWidth: 250}}
                                    style={{marginBottom: 16}}
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
                                    label="Pemilik Proyek"
                                    name="pemilik_proyek"
                                    rules={[{required: true, message: 'Pemilik Proyek harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <Select 
                                        showSearch
                                        onChange={this.handleChangePemilikProyek}
                                        disabled={disabledInput}
                                        placeholder="Pilih pemilik proyek"
                                        showArrow={false}
                                        onSearch={this.handleSearchPemilikProyek}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listCustomer !== null ? listCustomer.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    label="Jenis Proyek"
                                    name="id_jenis_proyek"
                                    rules={[{required: true, message: 'Status harus diisi'}]}
                                >
                                    <Select 
                                        onChange={this.handleChangeJenis}
                                        disabled={disabledInput}
                                        placeholder="Pilih Jenis Proyek"
                                        style={{width: 180}}
                                    >
                                    {
                                        listJenisProyek !== null ? listJenisProyek.data.map((row) => 
                                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
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
                                <Form.Item
                                    name="keterangan_alamat"
                                    style={{marginBottom: 16}}
                                >
                                    <TextArea 
                                        data-jenis="ketalamat"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        placeholder="isi dengan nama jalan, nama komplek, rt/rw, atau blok jika ada"
                                        rows={3}
                                    />
                                </Form.Item>
                            </td>
                        </tr>  
                        <tr>
                            <td></td>
                            <td>
                                <Form.Item
                                    label="No. Kontrak/PO"
                                    name="no_kontrak"
                                    rules={[{required: true, message: 'No. Kontrak/PO harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="nokontrak"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="No. Kontrak Induk (Jika ada)"
                                    name="no_kontrak_induk"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="nokontrakinduk"
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
                                    label="Nilai Kontrak/PO"
                                    name="nilai_kontrak"
                                    style={{marginBottom: 16}}
                                >
                                    <InputNumber  
                                        data-jenis="nilai"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiKontrak}
                                        style={{width: 250}}
                                        formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '\.')}
                                        parser={value => value.replace(/Rp\s?|(\.*)/g, '')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Ppn"
                                    name="ppn"
                                    style={{marginBottom: 16}}
                                >
                                    <InputNumber  
                                        data-jenis="ppn"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiPpn}
                                        style={{width: 250}}
                                        formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '\.')}
                                        parser={value => value.replace(/Rp\s?|(\.*)/g, '')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Pph"
                                    name="pph"
                                    style={{marginBottom: 16}}
                                >
                                    <InputNumber  
                                        data-jenis="pph"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiPph}
                                        style={{width: 250}}
                                        formatter={value => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '\.')}
                                        parser={value => value.replace(/Rp\s?|(\.*)/g, '')}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item label="No. Kontrak/PO Addendum" style={{marginBottom: 16}}>
                                    <Button
                                        type="dashed"
                                        icon={<PlusOutlined />}
                                    >
                                        Add
                                    </Button>
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>  
                            <td></td>                          
                            <td>
                                <Form.Item
                                    label="PIC Proyek (BARA)"
                                    name="nip_pic"
                                    style={{marginBottom: 16}}
                                >
                                   <Select 
                                        showSearch
                                        onChange={this.handleChangePICBara}
                                        disabled={disabledInput}
                                        style={{width: 200}}
                                        placeholder="Pilih PIC Bara"
                                        showArrow={false}
                                        onSearch={this.handleSearchPICBara}
                                        filterOption={false}
                                        defaultActiveFirstOption={false}
                                        notFoundContent={null}
                                    >
                                    {
                                        listPegawai !== null ? listPegawai.data.map((row) => 
                                            <Select.Option key={row.nip} value={row.nip}>{row.nama}</Select.Option>
                                        ):null
                                    }	
                                    </Select>
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="PIC Proyek (Customer)"
                                    name="pic_customer"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="piccustomer"
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
                                    label="No. Handphone PIC Proyek (BARA)"
                                    name="no_hp_pic"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="nohpbara"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{ width: 250 }}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="No. Handphone PIC Proyek (Customer)"
                                    name="no_hp_pic_customer"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="nohpcustomer"
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
                                    name="keterangan_proyek"
                                >
                                    <TextArea  
                                        rows={6}
                                        data-jenis="ketproyek"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
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