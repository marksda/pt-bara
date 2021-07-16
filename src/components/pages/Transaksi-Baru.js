import React from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, InputNumber, notification, Radio , Select } from 'antd';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';

import FormPencarianProyek from '../forms/Form-Pencarian-Proyek';

import { connect } from "react-redux";
import { FilterOutlined, MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';

// import { 
//     resetItemTransaksiSelected, setFilterProyek, setIsProgress, setItemMenuSelected, setModeTransaksiBaru 
// } from "../../actions/master-action";

const mapStateToProps = store => {
    return {
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        itemTransaksiSelected: store.master.item_transaksi_selected,
        listStatusTransaksi: store.master.list_status_transaksi,
        filterStatusTransaksi: store.master.filter_status_transaksi,
        listStatusTransaksi: store.master.list_status_transaksi,
        paginationStatusTransaksi: store.master.pagination_status_transaksi,
        urutStatusTransaksi: store.master.urut_status_transaksi,
        modeTransaksiBaru: store.master.mode_transaksi_baru,
        itemProyekSelected: store.master.item_proyek_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        // getStatusTransaksi: (url, headerAuthorization) => dispatch(getStatusTransaksi(url, headerAuthorization)),
        // resetItemTransaksiSelected: () => dispatch(resetItemTransaksiSelected()),
        // setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        // setModeTransaksiBaru: (nilai) => dispatch(setModeTransaksiBaru(nilai)), 
        // setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        // setFilterProyek: (value) => dispatch(setFilterProyek(value)),
    };
};

class TransaksiBaru extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            disabledInputEdit: true,
            disabledInput: false,
            kategori: false,
            anchorEl: null,
            keyForm: 'none',
            noTransaksi: `NP-${moment().year()}/0000`
        };

        this.formRef = React.createRef();
        this.itemTransaksi = {};
    }

    handleChangeKategoriTransaksi = (value) => {
        this.itemTransaksi.is_proyek = value;
        this.setState({kategori: value});
        // setTimeout(() => {this.formRef.current.getFieldInstance('nominal_pengajuan').focus();}, 300);
	}

    handleChangeTanggal = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemTransaksi.tanggal = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    handleOnFinish = (value) => {
		const { modeTransaksiBaru } = this.props;
		this.setState({disabledInput: true});
		if(modeTransaksiBaru === 'edit') {
            // this.updateTransaksi();
        }
        else {
			// this.saveTransaksi();
        }
	}

    render() {
        const { anchorEl, disabledInput, disabledInputEdit, kategori, keyForm, noPengajuan } = this.state;
        const { modeTransaksiBaru, itemProyekSelected, itemTransaksiSelected } = this.props;

        console.log(modeTransaksiBaru);
        
        let initEdit;
        if(modeTransaksiBaru === 'edit' && itemTransaksiSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(itemTransaksiSelected.tanggal),
                ["is_Proyek"]: itemTransaksiSelected.is_proyek,
            };
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: this.itemTransaksi.tanggal===undefined?moment():moment(this.itemPengajuan.tanggal),
                ["is_Proyek"]: kategori,
                ["is_reimburse"]: false,
                ["no_job"]: itemProyekSelected !== null?itemProyekSelected.no_job:null,
                ["nama_customer"]: itemProyekSelected !== null ? itemProyekSelected.nama_customer:null,
                ["nama_proyek"]:  itemProyekSelected !== null ? itemProyekSelected.nama_proyek:null
            };
        }

        let page =
        <Form
            name="form-transaksi"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={initEdit}
        >
            <div className="content-flex-center">
                <table className="table-container-transaksi-baru" style={{width: '65%'}}>
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
                                    style={{width: 150}}
                                />
                            </Form.Item>
                        </td>
                        <td>
                            <Form.Item 
                                label="Kategori"
                                name="is_Proyek"
                                rules={[{required: true, message: 'kategori pengajuan harus diisi'}]}
                                style={{marginBottom: 16}}
                            >
                                <Select 
                                    onChange={this.handleChangeKategoriTransaksi}
                                    disabled={modeTransaksiBaru==='edit'?true:disabledInput}
                                    style={{width: 180}}
                                >
                                    <Select.Option value={true}>Proyek</Select.Option>
                                    <Select.Option value={false}>Non Proyek</Select.Option>
                                </Select>
                            </Form.Item>
                        </td> 
                    </tr>
                    {
                        kategori===true?
                        <tr>
                            <td>
                                <Form.Item
                                    label="No. Job"
                                    name="no_job"
                                    style={{marginBottom: 16}}
                                    rules={[{required: true, message: 'No. Job harus diisi'}]}
                                >
                                    <Input 
                                        data-jenis="nojob"
                                        disabled={true}
                                        style={{ minWidth: 150, color: 'blue'}}
                                    />
                                </Form.Item>
                            </td>
                            <td>
                                <Form.Item 
                                    label="Customer"
                                    name="nama_customer"
                                    style={{marginBottom: 16}}
                                    rules={[{required: true, message: 'Customer harus diisi'}]}
                                >
                                    <Input disabled={true} style={{color: 'blue'}}/>
                                </Form.Item>
                            </td>
                            <td>
                                <div style={{display: 'flex'}}>
                                <Form.Item 
                                    label="Proyek"
                                    name="nama_proyek"
                                    style={{marginBottom: 16, marginRight: 8}}
                                    rules={[{required: true, message: 'Proyek harus diisi'}]}
                                >
                                    <Input disabled={true} style={{minWidth: 400, color: 'blue'}}/>
                                </Form.Item>
                                <Button 
                                    type="dashed" 
                                    icon={<FilterOutlined />} 
                                    style={{marginTop: 30}}
                                    disabled={modeTransaksiBaru==='edit'?true:disabledInput}
                                    onClick={this.handleOpenWindowProyekSearch} />
                                </div>
                            </td>
                        </tr>
                        :null
                    }
                </tbody>
                </table>                
            </div>            
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransaksiBaru);