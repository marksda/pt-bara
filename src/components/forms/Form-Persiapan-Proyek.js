import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, DatePicker, Form, Input, InputNumber, notification, Select } from 'antd';
import { connect } from "react-redux";
import { 
    getCustomer, getStatusProyek, setItemMenuSelected, setIsProgress, setItemProyekSelected, 
    setModeProyekBaru, setStatusProyekSelected 
} from "../../actions/master-action";


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
        statusProyekSelected: store.master.status_proyek_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        setModeProyekBaru: (nilai) => dispatch(setModeProyekBaru(nilai)),        
        getStatusProyek: (url, headerAuthorization) => dispatch(getStatusProyek(url, headerAuthorization)),        
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setStatusProyekSelected: (nilai) => dispatch(setStatusProyekSelected(nilai)), 
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class FormPersiapanProyek extends React.Component {
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
        const { listStatusProyek, filterStatusProyek, paginationStatusProyek, urutStatusProyek, modeProyekBaru, listCustomer, filterCustomer, paginationCustomer, urutCustomer } = this.props;

        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: false});
            setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 100);
        }
        else {
            setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 100);
        }

        if(listStatusProyek === null) {
            this.loadStatusProyek(filterStatusProyek, paginationStatusProyek, urutStatusProyek);
        }

        if(listCustomer === null) {
            this.loadCustomer(filterCustomer, paginationCustomer, urutCustomer);
        }
    }

    handleBaru = () => {
        const { modeProyekBaru, setModeProyekBaru, resetTab } = this.props;

        this.setState({disabledInput: false});
        setTimeout(() => {this.formRef.current.getFieldInstance('no_job').focus();}, 300);
        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: true});
            setModeProyekBaru('add');
            resetTab('01');
        }

        this.itemProyek = {
            no_job: null,
            id_customer: null,
            nama_proyek: null,
            id_status_proyek: '01',
            tanggal_persiapan: `${moment().year()}-${moment().month()+1}-${moment().date()}`,
            perkiraan_nilai: null,
            pic_customer: null,
            no_hp_pic_customer: null,
            keterangan_persiapan: null,
        }
    }

    handleBatal = () => {
        const { modeProyekBaru } = this.props;
        this.formRef.current.resetFields();
        if(modeProyekBaru === 'edit') {
            this.setState({disabledInput: true, disabledInputEdit: false});
            setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 100);
        }
        else {
            this.setState({disabledInput: true});
            setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 100);
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
            tanggal_aktif: itemProyekSelected.tanggal_aktif,
            no_kontrak_addendum: itemProyekSelected.no_kontrak_addendum
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

    handleSelectCustomer = (value) => {
        this.itemProyek.id_customer = value;
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

    loadStatusProyek = (filter, pagination, urut) => {
        const { getStatusProyek, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/statusproyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStatusProyek(url, headerAuthorization);
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

    savePersiapanProyek = () => {
		const { 
			headerAuthorization, restfulServer, setIsProgress,
            statusProyekSelected, resetTab, setModeProyekBaru, setItemProyekSelected
		} = this.props;
	    let self = this;
        
	    setIsProgress(true);

	    axios({
            method: 'put',
            url: `${restfulServer}/master/proyek`,
            headers: {...headerAuthorization},
            data: this.itemProyek
        })
	    .then((r) => {  
            setIsProgress(false);            
            if(statusProyekSelected !== self.itemProyek.id_status_proyek) {
                resetTab(self.itemProyek.id_status_proyek);
                self.setState({disabledInput: true, disabledInputEdit: false});                    
                setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${self.itemProyek.no_job}`, headerAuthorization);
                setModeProyekBaru('edit');
            }
            else {
                self.formRef.current.resetFields();
                self.setState({disabledInput: true});
            }

            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Proyek baru berhasil ditambahkan.',
                duration: 4,
                placement: 'bottomRight'
            });
	    })
	    .catch((r) => {
            setIsProgress(false);           
            this.formRef.current.resetFields();
            self.setState({disabledInput: true});
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Proyek baru gagal ditambahkan.',
                duration: 4,
                placement: 'bottomRight'
            });
	    });
	}

    updatePersiapanProyek = () => {        
        const { headerAuthorization, restfulServer, statusProyekSelected, resetTab, setItemProyekSelected, setIsProgress } = this.props;

        let self = this;    
                
        setIsProgress(true);

        axios({
            method: 'post',
            url: `${restfulServer}/master/proyek`,
            headers: {...headerAuthorization},
            data: this.itemProyek
        })
        .then((r) => { 
            setIsProgress(false);
            if(statusProyekSelected !== self.itemProyek.id_status_proyek) {
                resetTab(self.itemProyek.id_status_proyek);
                self.setState({disabledInput: true, disabledInputEdit: false});                    
            }
            else {
                self.setState({disabledInput: true, disabledInputEdit: false}); 
            }
            
            setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${self.itemProyek.no_job}`, headerAuthorization);

            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Proyek baru berhasil diupdate.',
                duration: 4,
                placement: 'bottomRight'
            });
        })
        .catch((r) => {         
            setIsProgress(false);
            self.setState({disabledInput: true, disabledInputEdit: false}); 
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Proyek baru gagal diupdate.',
                duration: 4,
                placement: 'bottomRight'
            });
        });        
    }

    render() {
        const { isProgress, itemProyekSelected, listCustomer, modeProyekBaru, listStatusProyek } = this.props;
        const { disabledInput, disabledInputEdit } = this.state;

        let keyForm;
        let initEdit;
        if(modeProyekBaru === 'edit' && itemProyekSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: modeProyekBaru==='edit'?moment(itemProyekSelected.tanggal_persiapan):moment(),
                ["no_job"]: modeProyekBaru==='edit'?itemProyekSelected.no_job:null,
                ["id_status_proyek"]: modeProyekBaru==='edit'?itemProyekSelected.id_status_proyek:null,
                ["nama_proyek"]: modeProyekBaru==='edit'?itemProyekSelected.nama_proyek:null,
                ["nama_customer"]: modeProyekBaru==='edit'?itemProyekSelected.nama_customer:null,
                ["perkiraan_nilai"]: modeProyekBaru==='edit'?itemProyekSelected.perkiraan_nilai:null,
                ["pic_customer"]: modeProyekBaru==='edit'?itemProyekSelected.pic_customer:null,
                ["no_hp_pic_customer"]: modeProyekBaru==='edit'?itemProyekSelected.no_hp_pic_customer:null,
                ["keterangan_persiapan"]: modeProyekBaru==='edit'?itemProyekSelected.keterangan_persiapan:null,
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
                <table className="table-container-proyek-baru" style={{width: '75%'}}>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Tanggal Persiapan"
                                    name="tanggal"
                                    rules={[{required: true, message: 'Tanggal persiapan harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <DatePicker 
                                        format="DD-MM-YYYY" 
                                        disabled={disabledInput}
                                        style={{minWidth: 150}}
                                        onChange={this.handleChangeTanggal}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Status"
                                    name="id_status_proyek"
                                    rules={[{required: true, message: 'Status harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <Select 
                                        onChange={this.handleChangeStatus}
                                        disabled={disabledInput}
                                        style={{width: 180}}
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
                                    style={{ marginBottom: 16 }}
                                >
                                    <Input 
                                        data-jenis="nojob"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{minWidth: 150}}
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
                                        onChange={this.handleSelectCustomer}
                                        disabled={disabledInput}
                                        placeholder="Pilih Customer"
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
                                    style={{ marginBottom: 16 }}
                                >
                                    <Input 
                                        data-jenis="namaproyek"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}                                        
                                        style={{minWidth: 250}}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Perkiraan Nilai"
                                    name="perkiraan_nilai"
                                    style={{ marginBottom: 16 }}
                                >
                                    <InputNumber  
                                        data-jenis="nilai"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiNumeric}
                                        style={{ width: 250 }}
                                        precision={2}
                                        formatter={this.formatterRupiah}
                                        parser={this.parserRupiah}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item
                                    label="PIC Proyek (Customer)"
                                    name="pic_customer"
                                    style={{ marginBottom: 16 }}
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
                                    label="No. Handphone PIC Proyek (Customer)"
                                    name="no_hp_pic_customer"
                                    style={{ marginBottom: 16 }}
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
                    </tbody>
                </table>                
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Form.Item {...tailLayout} style={{width:100, marginBottom: 0}} name="btnbaru">
                        <Button 
                            shape="round"
                            size="default"
                            htmlType="button" 
                            onClick={this.handleBaru} 
                            style={{marginBottom: 8, width: 120}}
                            disabled={isProgress===true?true:!disabledInput}
                        >
                            Baru
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailLayout} style={{width:100, marginBottom: 0}} name="btnedit">
                        <Button 
                            shape="round"
                            size="default"
                            htmlType="button" 
                            onClick={this.handleEdit} 
                            style={{marginBottom: 8, width: 120}}
                            disabled={isProgress===true?true:disabledInputEdit}
                        >
                            Edit
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailLayout} style={{width:100}}>
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
                            disabled={isProgress===true?true:!disabledInput}
                            style={{marginBottom: 8, width: 120}}
                        >
                        Daftar Proyek
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPersiapanProyek);