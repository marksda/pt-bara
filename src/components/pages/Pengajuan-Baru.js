import React from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, InputNumber, Radio , Select } from 'antd';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';

import FormPencarianProyek from '../forms/Form-Pencarian-Proyek';

import { connect } from "react-redux";
import { FilterOutlined, MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';

import { getStatusPengajuan, resetItemPengajuanSelected, setItemMenuSelected, setModePengajuanBaru } from "../../actions/master-action";


const { TextArea } = Input;
const mapStateToProps = store => {
    return {
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        itemPengajuanSelected: store.master.item_pengajuan_selected,
        listStatusPengajuan: store.master.list_status_pengajuan,
        filterStatusPengajuan: store.master.filter_status_pengajuan,
        listStatusPengajuan: store.master.list_status_pengajuan,
        paginationStatusPengajuan: store.master.pagination_status_pengajuan,
        urutStatusPengajuan: store.master.urut_status_pengajuan,
        modePengajuanBaru: store.master.mode_pengajuan_baru,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getStatusPengajuan: (url, headerAuthorization) => dispatch(getStatusPengajuan(url, headerAuthorization)),
        resetItemPengajuanSelected: () => dispatch(resetItemPengajuanSelected()),
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setModePengajuanBaru: (nilai) => dispatch(setModePengajuanBaru(nilai)), 
    };
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 4 },
};

class PengajuanBaru extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            disabledInputEdit: true,
            disabledInput: true,
            mode: "add",
            jenisPengajuan: false,
            anchorEl: null,
            keyForm: 'none'
        };

        this.formRef = React.createRef();
        this.itemPengajuan = {};
    }

    componentDidMount() {
        const { filterStatusPengajuan, modePengajuanBaru, paginationStatusPengajuan, urutStatusPengajuan, listStatusPengajuan } = this.props;
        if(modePengajuanBaru === 'edit') {
            this.setState({disabledInputEdit: false});
        }

        if(listStatusPengajuan === null) {
            this.loadStatusPengajuan(filterStatusPengajuan, paginationStatusPengajuan, urutStatusPengajuan);
        }
        setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 100);
    }

    componentWillUnmount() {
        const { resetItemPengajuanSelected } = this.props;
        resetItemPengajuanSelected();
    }

    handleBaru = () => {
        const { modePengajuanBaru, setModePengajuanBaru } = this.props;

        if(modePengajuanBaru === 'edit') {
            this.setState({disabledInputEdit: true, keyForm: 'add'});  
            setModePengajuanBaru('add');          
        }

        setTimeout(() => {this.formRef.current.getFieldInstance('no_pengajuan').focus();}, 100);        

        this.itemPengajuan = {
            tanggal: `${moment().year()}-${moment().month()+1}-${moment().date()}`,
            is_proyek: false,
            is_reimburse: false
        }
    }

    handleBatal = () => {
        const { modePengajuanBaru, resetItemPengajuanSelected } = this.props;

        this.formRef.current.resetFields();        
        resetItemPengajuanSelected();
        if(modePengajuanBaru === 'edit') {
            this.setState({jenisPengajuan: false, disabledInput: true, disabledInputEdit: false, keyForm: 'batal'});
        }
        else {
            this.setState({jenisPengajuan: false, disabledInput: true, keyForm: 'batal'});
            setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 100);
        }
    }

    handleChangeNilaiNumeric = (value) => {
        this.itemPengajuan.nominal_pengajuan = value;
	}

    handleChangeNilaiText = (e) => {
        const { modePengajuanBaru } = this.props;

		switch(e.currentTarget.dataset.jenis) {
            case 'nopengajuan':
                if( modePengajuanBaru === 'edit' ) {
                    this.itemPengajuan.no_pengajuan_baru = e.currentTarget.value;
                }
                else {
                    this.itemPengajuan.no_pengajuan = e.currentTarget.value;
                }
                break;
            case 'deskripsi':
                this.itemPengajuan.deskripsi_pengajuan = e.currentTarget.value;
                break;
			default:
		}
	}

    handleChangeJenisPengajuan = (value) => {
        this.itemPengajuan.is_proyek = value;
        this.setState({jenisPengajuan: value});
	}

    handleChangeStatusPersetujuan = (value) => {
        this.itemPengajuan.id_status_pengajuan = value;
    }

    handleChangeTanggal = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemPengajuan.tanggal = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    handleEdit = () => {
        const { itemPengajuanSelected } = this.props;
        this.itemPengajuan = {                
            no_job: itemPengajuanSelected.no_job,
            id_customer: itemPengajuanSelected.id_customer,
            
        };
        // if(this.itemProyek.tanggal_aktif === null) {
        //     this.itemProyek.tanggal_aktif =  `${moment().year()}-${moment().month()+1}-${moment().date()}`;
        // }

        // console.log(this.itemProyek);

        // this.setState({disabledInput: false, disabledInputEdit: true});
        // setTimeout(() => {this.formRef.current.getFieldInstance('pemilik_proyek').focus();}, 300);
    }

    handleOnFinish = (value) => {
		const { modePengajuanBaru } = this.props;
		this.setState({disabledInput: true});
		if(modePengajuanBaru === 'edit') {
            // this.updatePengajuan();
        }
        else {
			this.savePengajuan();
        }
	}

    handleCloseWindowProyekSearch = () => {
        this.setState({anchorEl: null});
    }

    handleOpenWindowProyekSearch = (e) => {
        this.setState({anchorEl: e.currentTarget});
    }

    handleRemoveDokumen = (idx) => {
        // this.itemProyek.no_kontrak_addendum.splice(idx,1);
        // if(this.itemProyek.no_kontrak_addendum === undefined) {
        //     this.itemProyekSelected.no_kontrak_addendum = null;
        // }
        // console.log(this.itemProyek.no_kontrak_addendum);
    }

    handleToNavDaftarPengajuan = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Daftar Pengajuan');
    }

    handleReset = () => {
        const { resetItemPengajuanSelected } = this.props;
		this.formRef.current.resetFields();    
        this.setState({keyForm: 'reset'});    
        resetItemPengajuanSelected();
        setTimeout(() => {this.formRef.current.getFieldInstance('no_pengajuan').focus();}, 300);
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

    loadStatusPengajuan = (filter, pagination, urut) => {
        const { getStatusPengajuan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/statuspengajuan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStatusPengajuan(url, headerAuthorization);
    }

    savePengajuan = () => {
		const { headerAuthorization, itemProyekSelected, restfulServer } = this.props;
	    let self = this;
        
	    // handleToggleOpenProgressDialog();
        if(this.itemPengajuan.is_proyek === true) {
            this.itemPengajuan.no_job = itemProyekSelected.no_job;
        }

	    axios({
            method: 'put',
            url: `${restfulServer}/master/pengajuan`,
            headers: {...headerAuthorization},
            data: this.itemPengajuan
        })
	    .then((r) => {  
	    	// if(r.data.status === 200) {        
			// 	self.loadAkun(filterAkun, paginationAkun, urutAkun);
	    	// } 
	    	// self.handleReset();
            // self.setState({disabledInput: false});
            // handleClose();
            // handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
	    	self.setState({disabledInput: true});
	    });
	}

    render() {
        const { itemProyekSelected, listStatusPengajuan } = this.props;
        const { anchorEl, disabledInput, disabledInputEdit, jenisPengajuan, keyForm, mode } = this.state;

        let initEdit;
        if(mode === 'edit' && itemProyekSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(itemProyekSelected.tanggal),
                ["is_Proyek"]: itemProyekSelected.is_proyek,
                ["nominal_pengajuan"]: itemProyekSelected.nominal_pengajuan,
                ["is_reimburse"]: itemProyekSelected.is_reimburse,
                ["id_status_pengajuan"]: itemProyekSelected.id_status_pengajuan,
                ["no_job"]: itemProyekSelected.no_job,
                ["nama_customer"]: itemProyekSelected.nama_customer,
                ["nama_proyek"]:  itemProyekSelected.nama_proyek,
            };
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(),
                ["is_Proyek"]: jenisPengajuan,
                ["is_reimburse"]: false,
                ["no_job"]: itemProyekSelected !== null?itemProyekSelected.no_job:null,
                ["nama_customer"]: itemProyekSelected !== null?itemProyekSelected.nama_customer:null,
                ["nama_proyek"]: itemProyekSelected !== null?itemProyekSelected.nama_proyek:null,
            };
        }

        let page = 
        <Form
            name="form-persiapan-proyek"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={initEdit}
            key={itemProyekSelected === null ? keyForm : `${keyForm}${itemProyekSelected.no_job}`}
        >
            <div className="content-flex-center">
                <table className="table-container-pengajuan-baru" style={{width: '65%'}}>
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
                                    onChange={this.handleChangeJenisPengajuan}
                                    disabled={disabledInput}
                                    style={{width: 180}}
                                >
                                    <Select.Option value={true}>Proyek</Select.Option>
                                    <Select.Option value={false}>Non Proyek</Select.Option>
                                </Select>
                            </Form.Item>
                        </td> 
                    </tr>
                    {
                    jenisPengajuan === true ?
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
                                onClick={this.handleOpenWindowProyekSearch} />
                            </div>
                        </td>
                    </tr>
                    :null
                    }
                    <tr>
                        <td></td>
                        <td>
                            <Form.Item
                                label="No. Pengajuan"
                                name="no_pengajuan"
                                rules={[{required: true, message: 'No. Pengajuan harus diisi'}]}                                    
                                style={{ marginBottom: 16}}
                            >
                                <Input 
                                    data-jenis="nopengajuan"
                                    placeholder="Diisi finance"
                                    disabled={disabledInput}
                                    onChange={this.handleChangeNilaiText}
                                    style={{width: 200}}
                                />
                            </Form.Item>
                        </td>      
                        <td></td>              
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan="2">
                            <div style={{display: 'flex'}}>
                            <Form.Item
                                label="Nominal diajukan"
                                name="nominal_pengajuan"
                                rules={[{required: true, message: 'Nominal diajukan harus diisi'}]} 
                                style={{ marginBottom: 16, marginRight: 16}}
                            >
                                <InputNumber  
                                    disabled={disabledInput}
                                    onChange={this.handleChangeNilaiNumeric}
                                    style={{ width: 200 }}
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
                                    <Radio value={false} disabled={disabledInput}>Baru</Radio>
                                    <Radio value={true} disabled={disabledInput}>Reimburse</Radio>
                                </Radio.Group>
                            </Form.Item>
                            </div>
                        </td>               
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan="2">
                            <Form.List name="dokumen">
                                {
                                    (fields, { add, remove }, { errors }) => (
                                        <>
                                            {
                                                fields.map(
                                                    (field, index) => (
                                                        <div style={{display: 'flex'}} key={field.key}>
                                                            <Form.Item
                                                                noStyle
                                                            >
                                                                <Form.Item
                                                                    {...field}
                                                                    label={index === 0 ? 'Jenis Dokumen' : ''}
                                                                    name={[field.name, 'dokumen']}
                                                                    fieldKey={[field.fieldKey, 'dokumen']}
                                                                    rules={[{required: true, message: 'Jenis Dokumen harus diisi'}]} 
                                                                    style={{marginBottom: 8}}
                                                                >
                                                                    <Input 
                                                                        data-jenis="dokumen"
                                                                        data-idx={index}
                                                                        disabled={disabledInput} 
                                                                        placeholder="Invoice/Kuitansi/dll"
                                                                        style={{ width: 200, marginRight: 16 }} 
                                                                        onChange={this.handleChangeNilaiText}
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...field}
                                                                    label={index === 0 ? 'No. Dokumen' : ''}
                                                                    name={[field.name, 'no_dokumen']}
                                                                    fieldKey={[field.fieldKey, 'no_dokumen']}    
                                                                    rules={[{required: true, message: 'No. Dokumen harus diisi'}]}      
                                                                    style={{marginBottom: 8}}                                                               
                                                                >
                                                                    <Input 
                                                                        data-jenis="nodokumen"
                                                                        placeholder="Nomor"
                                                                        data-idx={index}
                                                                        disabled={disabledInput} 
                                                                        style={{ width: 180, marginRight: 16}} 
                                                                        onChange={this.handleChangeNilaiText}
                                                                    />
                                                                </Form.Item>
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    disabled={disabledInput}
                                                                    style={{marginTop: index===0?38:10, color: 'red'}}
                                                                    onClick={
                                                                        () => {
                                                                            remove(field.name);
                                                                            // this.handleRemoveDokumen(index);
                                                                        } 
                                                                    }
                                                                />
                                                            </Form.Item>
                                                        </div>
                                                    )
                                                )
                                            }
                                            <Form.Item
                                                label={fields.length === 0 ? 'Dokumen' : ''}
                                                style={{marginBottom: 16}}
                                            >
                                                <Button
                                                    icon={<PlusOutlined />}
                                                    onClick={() => add()}
                                                    disabled={disabledInput}
                                                />
                                            </Form.Item>
                                        </>
                                    )
                                }
                            </Form.List>   
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <Form.Item
                                    label="Deskripsi"
                                    name="deskripsi_pengajuan"
                                >
                                    <TextArea  
                                        rows={4}
                                        data-jenis="deskripsi"
                                        disabled={disabledInput}
                                        onChange={this.handleChangeNilaiText}
                                        placeholder="Keterangan pengajuan"
                                    />
                                </Form.Item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Form.Item 
                                label="Status"
                                name="id_status_pengajuan"
                                rules={[{required: true, message: 'Status harus diisi'}]}
                                style={{marginBottom: 16}}
                            >
                                <Select 
                                    onChange={this.handleChangeStatusPersetujuan}
                                    disabled={disabledInput}
                                    placeholder="Pilih status"
                                    style={{width: 150}}
                                >
                                {
                                    listStatusPengajuan !== null ? listStatusPengajuan.data.map((row) => 
                                        <Select.Option key={row.id} value={row.id}>{row.nama}</Select.Option>
                                    ):null
                                }	
                                </Select>
                            </Form.Item>
                        </td>
                    </tr>                                
                </tbody>
                </table>
                <Popover
                    open={anchorEl===null?false:true}
                    anchorEl={anchorEl}
                    onClose={this.handleCloseWindowProyekSearch}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <FormPencarianProyek handleCloseWindowProyekSearch={this.handleCloseWindowProyekSearch}/>
                </Popover>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <Form.Item {...tailLayout} style={{width: 150, marginBottom: 8}} name="btnbaru">
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleBaru} 
                        style={{width: 150}}
                        disabled={!disabledInput}
                    >
                        Baru
                    </Button>
                </Form.Item>
                <Form.Item {...tailLayout} style={{width: 150}}>                    
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleEdit} 
                        style={{marginBottom: 8, width: 150}}
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
                        style={{marginBottom: 8, width: 150}}
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
                        style={{marginBottom: 8, width: 150}}
                    >
                    Reset
                    </Button>
                    <Button 
                        type="primary" 
                        shape="round"
                        size="default"
                        htmlType="submit" 
                        disabled={disabledInput}
                        style={{width: 150, marginBottom: 150}}
                    >
                    Simpan
                    </Button>
                    <Button 
                        shape="round"
                        size="default"
                        htmlType="button" 
                        onClick={this.handleToNavDaftarPengajuan} 
                        disabled={!disabledInput}
                        style={{marginBottom: 8, width: 150}}
                    >
                    Daftar Pengajuan
                    </Button>
                </Form.Item>
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PengajuanBaru);