import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, DatePicker, Form, Input, InputNumber, notification, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getDesa, getJenisProyek, getPegawai, getPropinsi, getKabupaten, getKecamatan, getStatusProyek, setItemMenuSelected, setModeProyekBaru, setStatusProyekSelected, setItemProyekSelected } from "../../actions/master-action";
import TableBudget from '../tables/Table-Budget';
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
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
    };
};

class FormBudget extends React.Component {
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
            tanggal_aktif: itemProyekSelected.tanggal_aktif,
            no_kontrak_addendum: itemProyekSelected.no_kontrak_addendum
        };
        if(this.itemProyek.tanggal_aktif === null) {
            this.itemProyek.tanggal_aktif =  `${moment().year()}-${moment().month()+1}-${moment().date()}`;
        }

        console.log(this.itemProyek);

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
            case 'addendum':
                if(this.itemProyek.no_kontrak_addendum === null) {
                    this.itemProyek.no_kontrak_addendum = [];
                }
                this.itemProyek.no_kontrak_addendum[Number(e.currentTarget.dataset.idx)] = e.currentTarget.value;
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

    handleRemoveAddendum = (idx) => {
        this.itemProyek.no_kontrak_addendum.splice(idx,1);
        if(this.itemProyek.no_kontrak_addendum === undefined) {
            this.itemProyekSelected.no_kontrak_addendum = null;
        }
        console.log(this.itemProyek.no_kontrak_addendum);
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
        const { headerAuthorization, restfulServer, handleToggleOpenProgressDialog, resetTab, statusProyekSelected, setItemProyekSelected } = this.props;

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

            if(statusProyekSelected !== self.itemProyek.id_status_proyek) {
                resetTab(self.itemProyek.id_status_proyek);
                self.setState({disabledInput: true, disabledInputEdit: false});                    
                setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${self.itemProyek.no_job}`, headerAuthorization);
            }
            else {
                self.setState({disabledInput: true, disabledInputEdit: false}); 
            }

            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Proyek baru berhasil diupdate.',
                duration: 4,
                placement: 'bottomRight'
            });
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Proyek baru gagal diupdate.',
                duration: 4,
                placement: 'bottomRight'
            });
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
        const { itemProyekSelected, listCustomer, listDesa, listPegawai, listJenisProyek, listKecamatan, listPropinsi, modeProyekBaru, listStatusProyek, listKabupaten } = this.props;
        const { disabledInput, disabledInputEdit } = this.state;

        let keyForm;
        let initEdit;
        if(modeProyekBaru === 'edit' && itemProyekSelected !== null ) {
            console.log(itemProyekSelected);
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
                ["no_kontrak_addendum"]: itemProyekSelected.no_kontrak_addendum === null?[]:itemProyekSelected.no_kontrak_addendum
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
                                    label="No. Job"
                                    name="no_job"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        disabled={true}
                                        style={{ minWidth: 150, color: 'red' }}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Customer"
                                    name="nama_customer"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        disabled={true}
                                        style={{color: 'red'}}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="Proyek"
                                    name="nama_proyek"
                                    style={{marginBottom: 16}}
                                >
                                    <Input 
                                        data-jenis="namaproyek"
                                        disabled={true}
                                        style={{minWidth: 250, color: 'red'}}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Nilai Kontrak/PO"
                                    name="nilai_kontrak"
                                    style={{marginBottom: 16}}
                                >
                                    <InputNumber
                                        data-jenis="nilaikontrak"
                                        disabled={true}
                                        style={{minWidth: 250, color: 'red'}}
                                        formatter={this.formatterRupiah}
                                        parser={this.parserRupiah}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="Jumlah Budget"
                                    name="jumlah_budget"
                                    style={{marginBottom: 16, marginRight: 16}}
                                >
                                    <InputNumber
                                        data-jenis="jumlahbudget"
                                        disabled={true}
                                        style={{minWidth: 250, color: 'red'}}
                                        formatter={this.formatterRupiah}
                                        parser={this.parserRupiah}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="File Budged"
                                    style={{marginBottom: 16}}
                                >
                                    <Button
                                        type="dashed"
                                        icon={<PlusOutlined />}
                                        disabled={false}
                                    >
                                        Add
                                    </Button>
                                </Form.Item>
                            </td>
                        </tr>                        
                    </tbody>
                </table> 
                <TableBudget title="Data Budget" />
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormBudget);