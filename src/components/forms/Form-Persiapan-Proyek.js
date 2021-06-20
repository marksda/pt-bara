import React from 'react';
import moment from 'moment';
import { DatePicker, Form, Input } from 'antd';


const mapStateToProps = store => {
    return {      
        listStatusProyek: store.master.list_status_proyek,
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
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

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
            case 'nojob':
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

    handleChangeTanggal = (date, dateString, jenis) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemProyek.tanggal_persiapan = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    render() {
        const { data, mode } = this.props;
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
                }}
            >
                <Form.Item
	                label="Tanggal Persiapan"
                    name="tanggal"
                    rules={[{required: true, message: 'Tanggal persiapan proyek harus harus diisi'}]}
                >
                    <DatePicker 
                        format="DD-MM-YYYY" 
                        disabled={disabledInput}
                        style={{width: 150}}
                        onChange={this.handleChangeTanggal}
                    />
                </Form.Item>
                <Form.Item 
                    label="Status"
                    name="id_status"
                    rules={[{required: true, message: 'Status proyek harus harus diisi'}]}
                >
                    <Select 
                        onChange={this.handleChangeStatus}
                        disabled={disabledInput}
                        style={{width: 200}}
                    >
                    {
                        listStatusProyek !== null ? listStatusProyek.data.map((row) => 
                            <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                        ):null
                    }	
                    </Select>
                </Form.Item>
                <Form.Item
	                label="No. Job"
                    name="no_job"
                    rules={[{required: true, message: 'No. job proyek harus diisi'}]}
                >
                    <Input 
                        data-jenis="nojob"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                        style={{ width: 120 }}
                    />
                </Form.Item>
            </Form>
        </div>;

        return(page);
    }
}

export default FormPersiapanProyek;