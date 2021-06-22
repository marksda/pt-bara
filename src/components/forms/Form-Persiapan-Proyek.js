import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { AutoComplete, Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getStatusProyek } from "../../actions/master-action";


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
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        getStatusProyek: (url, headerAuthorization) => dispatch(getStatusProyek(url, headerAuthorization))
    };
};

class FormPersiapanProyek extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            disabledInput: true,
        }

        this.formRef = React.createRef();
        this.itemProyek = {};
    }

    componentDidMount() {
        const { listStatusProyek, filterStatusProyek, paginationStatusProyek, urutStatusProyek } = this.props;

        if(listStatusProyek === null) {
            this.loadStatusProyek(filterStatusProyek, paginationStatusProyek, urutStatusProyek);
        }
    }

    handleBaru = () => {
        this.itemProyek.tanggal_persiapan = `${moment().year()}-${moment().month()}-${moment().date()}`;
        this.setState({disabledInput: false});
    }

    handleBatal = () => {
        this.formRef.current.resetFields();
        this.setState({disabledInput: true});
    }

    handleChangeNilaiNumeric = (value) => {
        this.itemProyek.perkiraan_nilai = value;
	}

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
            case 'nojob':
                this.itemProyek.no_job = e.currentTarget.value;
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
        const { mode } = this.props;
        if(mode === 'edit') {
            this.itemProyek.status_baru = value;
        }
        else {
            this.itemProyek.status = value;
        }	
	}

    handleChangeTanggal = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemProyek.tanggal_persiapan = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updatePersiapanProyek();
        }
        else {
			this.savePersiapanProyek();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    handleSearchCustomer = (value) => {
        const { paginationCustomer, urutCustomer} = this.props;
        this.loadCustomer({	field: "m.nama", search: value }, { current: 1, pageSize: 10 }, { field: "m.nama", order: "asc" });
	}

    handleSelectCustomer = (value, option) => {
        this.itemProyek.id_customer = option.key;
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
			headerAuthorization, restfulServer, handleToggleOpenProgressDialog
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
	    	if(r.data.status === 200) {        
				// self.loadAkun(filterAkun, paginationAkun, urutAkun);
	    	} 
	    	// self.handleReset();
            // self.setState({disabledInput: false});
            // handleClose();
            handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
            self.handleToggleOpenProgressDialog();
	    	self.setState({disabledInput: true});
	    });
	}

    render() {
        const { data, listCustomer, listStatusProyek, mode } = this.props;
        const { disabledInput } = this.state;
        let page =
        <Form
            name="form-persiapan-proyek"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={{
                layout: 'vertical',
                remember: true,
                ["tanggal"]: mode==='edit'?data.tanggal_persiapan:moment(),
                ["no_job"]: mode==='edit'?data.no_job:null,
                ["id_status"]: mode==='edit'?data.id_status:null,
                ["nama_customer"]: mode==='edit'?data.nama_customer:null,
                ["perkiraan_nilai"]: mode==='edit'?data.perkiraan_nilai:null,
                ["pic_customer"]: mode==='edit'?data.pic_customer:null,
                ["no_hp_pic_customer"]: mode==='edit'?data.no_hp_pic_customer:null,
                ["keterangan_persiapan"]: mode==='edit'?data.keterangan_persiapan:null,
            }}
        >
            <div className="content-flex-center">
                <table className="table-container-proyek-baru" style={{width: '70%'}}>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Item
                                    label="Tanggal Persiapan"
                                    name="tanggal"
                                    rules={[{required: true, message: 'Tanggal persiapan proyek harus harus diisi'}]}
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
                                    name="id_status"
                                    rules={[{required: true, message: 'Status proyek harus harus diisi'}]}
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
                                    rules={[{required: true, message: 'No. job proyek harus diisi'}]}
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
                                    rules={[{required: true, message: 'Customer harus harus diisi'}]}
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
                                    rules={[{required: true, message: 'Nama proyek harus diisi'}]}
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
                        {mode==='edit'?'Edit':'Baru'}
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
                        disabled={mode==='edit'?true:disabledInput}
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
                        onClick={this.handleReset} 
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