import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getStatusProyek, setItemMenuSelected, setModeProyekBaru } from "../../actions/master-action";


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
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        getStatusProyek: (url, headerAuthorization) => dispatch(getStatusProyek(url, headerAuthorization)),        
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),        
        setModeProyekBaru: (nilai) => dispatch(setModeProyekBaru(nilai)), 
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
        const { listStatusProyek, filterStatusProyek, paginationStatusProyek, urutStatusProyek, modeProyekBaru } = this.props;

        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: false});
        }

        if(listStatusProyek === null) {
            this.loadStatusProyek(filterStatusProyek, paginationStatusProyek, urutStatusProyek);
        }
    }

    handleBaru = () => {
        const { modeProyekBaru, setModeProyekBaru } = this.props;

        this.itemProyek.tanggal_persiapan = `${moment().year()}-${moment().month()}-${moment().date()}`;
        this.setState({disabledInput: false});
        setTimeout(() => {this.formRef.current.getFieldInstance('no_job').focus();}, 300);
        if(modeProyekBaru === 'edit') {
            this.setState({disabledInputEdit: true});
            setModeProyekBaru('add');
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

    savePersiapanProyek = () => {
		const { 
			headerAuthorization, modeProyekBaru, restfulServer, handleToggleOpenProgressDialog
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
	    })
	    .catch((r) => {
            self.handleToggleOpenProgressDialog();
	    	self.setState({disabledInput: true});
	    });
	}

    updatePersiapanProyek = () => {
        console.log(this.itemProyek);
        const { headerAuthorization, modeProyekBaru, restfulServer, handleToggleOpenProgressDialog } = this.props;

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
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
        });        
    }

    render() {
        const { itemProyekSelected, listCustomer, modeProyekBaru, listStatusProyek } = this.props;
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
                                        placeholder={disabledInput === true? null:'Cari customer'}
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
                    Data Proyek
                    </Button>
                </Form.Item>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPersiapanProyek);