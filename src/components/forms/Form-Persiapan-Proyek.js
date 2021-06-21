import React from 'react';
import moment from 'moment';
import { AutoComplete, DatePicker, Form, Input, Select } from 'antd';
import { connect } from "react-redux";
import { getCustomer, getStatusProyek } from "../../actions/master-action";


const { Option } = AutoComplete;

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
            disabledInput: false
        }

        this.itemProyek = {};
    }

    componentDidMount() {
        const { listStatusProyek, filterStatusProyek, paginationStatusProyek, urutStatusProyek } = this.props;

        if(listStatusProyek === null) {
            this.loadStatusProyek(filterStatusProyek, paginationStatusProyek, urutStatusProyek);
        }
    }

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
            case 'nojob':
                this.itemProyek.nojob = e.currentTarget.value;
                break;
            case 'namaproyek':
                this.itemProyek.nojob = e.currentTarget.value;
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

    render() {
        const { data, listCustomer, listStatusProyek, mode } = this.props;
        const { disabledInput } = this.state;
        let page =
        <div>
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
                }}
            >
                <table className="table-container-proyek-baru">
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
                                        style={{width: 130}}
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
                                        style={{ width: 130 }}
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
                                >
                                    <Input 
                                        data-jenis="namaproyek"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        style={{ width: 350 }}
                                    />
                                </Form.Item>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPersiapanProyek);