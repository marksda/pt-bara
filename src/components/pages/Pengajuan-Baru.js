import React from 'react';
import { DatePicker, Form, Input, InputNumber, Radio , Select } from 'antd';
import moment from 'moment';

import { connect } from "react-redux";
// import FormPengajuanProyek from '../forms/Form-Pengajuan-Proyek';

const mapStateToProps = store => {
    return {
        itemPersetujuanSelected: store.master.item_proyek_selected,
    };
};

class PengajuanBaru extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            disabledInput: false,
            mode: "add"
        };

        this.formRef = React.createRef();
        this.itemPengajuan = {};
    }

    componentDidMount() {
        this.setState({mode: this.props.mode});
    }

    handleChangeNilaiNumeric = (value) => {
        this.itemPengajuan.perkiraan_nilai = value;
	}

    handleChangeNilaiText = (e) => {
        const { mode } = this.state;

		switch(e.currentTarget.dataset.jenis) {
            case 'nopengajuan':
                if( mode === 'edit' ) {
                    this.itemPengajuan.no_pengajuan_baru = e.currentTarget.value;
                }
                else {
                    this.itemPengajuan.no_pengajuan = e.currentTarget.value;
                }
                break;
			default:
		}
	}

    handleChangeStatus = (value) => {
        console.log(typeof value);
        this.itemPengajuan.is_proyek = value;
	}

    handleChangeTanggal = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemPengajuan.tanggal = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
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

    onChangeReimburse = (e) => {
        this.itemPengajuan.is_reimburse= e.target.value;
    }

    render() {
        const { itemPersetujuanSelected } = this.props;
        const { disabledInput, mode } = this.state;

        let keyForm;
        let initEdit;
        if(mode === 'edit' && itemPersetujuanSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(itemPersetujuanSelected.tanggal),
                ["is_Proyek"]: itemPersetujuanSelected.is_proyek,
                ["nominal_pengajuan"]: itemPersetujuanSelected.nominal_pengajuan,
                ["is_reimburse"]: itemPersetujuanSelected.is_reimburse
            };

            keyForm = 'edit';
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(),
                ["is_Proyek"]: false,
                ["is_reimburse"]: false
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
                <table className="table-container-pengajuan-baru" style={{width: '75%'}}>
                <tbody>
                    <tr>                        
                        <td>
                            <Form.Item
                                    label="Tanggal"
                                    name="tanggal"
                                    rules={[{required: true, message: 'Tanggal pengajuan harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <DatePicker 
                                        format="DD-MM-YYYY" 
                                        disabled={disabledInput}
                                        onChange={this.handleChangeTanggal}
                                        style={{width: 120}}
                                    />
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item 
                                label="Jenis Pengajuan"
                                name="is_Proyek"
                                rules={[{required: true, message: 'Jenis pengajuan harus diisi'}]}
                                style={{marginBottom: 16}}
                            >
                                <Select 
                                    onChange={this.handleChangeStatus}
                                    disabled={disabledInput}
                                    style={{width: 150}}
                                >
                                    <Select.Option value={true}>Proyek</Select.Option>
                                    <Select.Option value={false}>Non Proyek</Select.Option>
                                </Select>
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item
                                label="No. Pengajuan"
                                name="no_pengajuan"
                                rules={[{required: true, message: 'No. Pengajuan harus diisi'}]}                                    
                                style={{ marginBottom: 16, width: 250 }}
                            >
                                <Input 
                                    data-jenis="nopengajuan"
                                    disabled={disabledInput}
                                    onChange={this.handleChangeNilaiText}
                                />
                            </Form.Item>
                        </td>                        
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <div className="table-container-cell-pengajuan-baru">
                            <Form.Item
                                label="Nominal diajukan"
                                name="nominal_pengajuan"
                                rules={[{required: true, message: 'Nominal diajukan harus diisi'}]} 
                                style={{ marginBottom: 16, marginRight: 16 }}
                            >
                                <InputNumber  
                                    disabled={disabledInput}
                                    onChange={this.handleChangeNilaiNumeric}
                                    style={{ width: 180 }}
                                    precision={2}
                                    formatter={this.formatterRupiah}
                                    parser={this.parserRupiah}
                                />
                            </Form.Item>
                            <Form.Item
                                label=" "
                                name="is_reimburse"
                                style={{ marginBottom: 16 }}
                            >
                                <Radio.Group onChange={this.onChangeReimburse}>
                                    <Radio value={false}>Baru</Radio>
                                    <Radio value={true}>Reimburse</Radio>
                                </Radio.Group>
                            </Form.Item>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, null)(PengajuanBaru);