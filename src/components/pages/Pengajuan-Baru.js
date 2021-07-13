import React from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, InputNumber, notification, Radio , Select } from 'antd';
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
        itemProyekSelected: store.master.item_proyek_selected,
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
            jenisPengajuan: false,
            anchorEl: null,
            keyForm: 'none',
            openProcessingDialog: false,
        };

        this.formRef = React.createRef();
        this.itemPengajuan = {};
    }

    componentDidMount() {
        const { filterStatusPengajuan, itemPengajuanSelected, modePengajuanBaru, paginationStatusPengajuan, urutStatusPengajuan, listStatusPengajuan } = this.props;
        
        if(listStatusPengajuan === null) {
            this.loadStatusPengajuan(filterStatusPengajuan, paginationStatusPengajuan, urutStatusPengajuan);
        }

        if(modePengajuanBaru === 'edit') {
            this.setState({disabledInputEdit: false, jenisPengajuan: itemPengajuanSelected.is_proyek});
            setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 100);
        }
        else {
            setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 100);
        }
        
    }

    componentWillUnmount() {
        const { resetItemPengajuanSelected, setModePengajuanBaru } = this.props;
        resetItemPengajuanSelected();
        setModePengajuanBaru('add'); 
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

    handleBaru = () => {
        const { modePengajuanBaru, setModePengajuanBaru, resetItemPengajuanSelected } = this.props;
        
        if(modePengajuanBaru === 'edit') {
            resetItemPengajuanSelected();
            this.setState({disabledInput: false, disabledInputEdit: true, jenisPengajuan: false,  keyForm: 'add'});  
            setModePengajuanBaru('add');          
        }
        else {
            this.setState({disabledInput: false, keyForm: 'add'});  
        }

        setTimeout(() => {
            this.formRef.current.resetFields();
            this.formRef.current.getFieldInstance('no_pengajuan').focus();
        }, 100);        

        this.itemPengajuan = {
            tanggal: `${moment().year()}-${moment().month()+1}-${moment().date()}`,
            is_proyek: false,
            is_reimburse: false
        }
    }

    handleBatal = () => {
        const { itemPengajuanSelected, modePengajuanBaru } = this.props;

        // this.formRef.current.resetFields();
        if(modePengajuanBaru === 'edit') {
            this.setState({jenisPengajuan: itemPengajuanSelected.is_proyek, disabledInput: true, disabledInputEdit: false, keyForm: 'batal'});
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
        if(itemPengajuanSelected.is_proyek === true){
            this.itemPengajuan = {                
                tanggal: itemPengajuanSelected.tanggal,
                no_pengajuan: itemPengajuanSelected.no_pengajuan,
                tanggal: itemPengajuanSelected.tanggal,
                no_pengajuan: itemPengajuanSelected.no_pengajuan,
                nominal_pengajuan: itemPengajuanSelected.nominal_pengajuan,
                is_reimburse: itemPengajuanSelected.is_reimburse,
                is_proyek: itemPengajuanSelected.is_proyek,
                no_job: itemPengajuanSelected.no_job,
                nama_customer: itemPengajuanSelected.nama_customer,
                nama_proyek: itemPengajuanSelected.nama_proyek,
                dokumen: itemPengajuanSelected.dokumen,
                deskripsi_pengajuan: itemPengajuanSelected.deskripsi_pengajuan,
                catatan_persetujuan: itemPengajuanSelected.catatan_persetujuan,
                id_status_pengajuan: itemPengajuanSelected.id_status_pengajuan
            };
        }
        else {
            this.itemPengajuan = { 
                tanggal: itemPengajuanSelected.tanggal,
                no_pengajuan: itemPengajuanSelected.no_pengajuan,
                tanggal: itemPengajuanSelected.tanggal,
                no_pengajuan: itemPengajuanSelected.no_pengajuan,
                nominal_pengajuan: itemPengajuanSelected.nominal_pengajuan,
                is_reimburse: itemPengajuanSelected.is_reimburse,
                is_proyek: itemPengajuanSelected.is_proyek,
                dokumen: itemPengajuanSelected.dokumen,
                deskripsi_pengajuan: itemPengajuanSelected.deskripsi_pengajuan,
                catatan_persetujuan: itemPengajuanSelected.catatan_persetujuan,
                id_status_pengajuan: itemPengajuanSelected.id_status_pengajuan
            };
        }
        
        this.setState({disabledInput: false, disabledInputEdit: true, jenisPengajuan: itemPengajuanSelected.is_proyek});
        setTimeout(() => {this.formRef.current.getFieldInstance('no_pengajuan').focus();}, 300);
    }

    handleOnFinish = (value) => {
		const { modePengajuanBaru } = this.props;
		this.setState({disabledInput: true});
		if(modePengajuanBaru === 'edit') {
            this.updatePengajuan();
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

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
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

    updatePengajuan = () => {
        const { headerAuthorization, restfulServer } = this.props;

        let self = this;    
                
        // this.handleToggleOpenProgressDialog();

        // axios({
        //     method: 'post',
        //     url: `${restfulServer}/master/pengajuan`,
        //     headers: {...headerAuthorization},
        //     data: this.itemPengajuan
        // })
        // .then((r) => { 
        //     self.handleToggleOpenProgressDialog();
        //     self.setState({disabledInput: true, disabledInputEdit: false}); 
        //     notification.open({
        //         message: 'Pemberitahuan',
        //         description:
        //           'Pengajuan berhasil diupdate.',
        //         duration: 4,
        //         placement: 'bottomRight'
        //     });
        // })
        // .catch((r) => {         
        //     self.handleToggleOpenProgressDialog();
        //     self.setState({disabledInput: true, disabledInputEdit: false}); 
        //     notification.open({
        //         message: 'Pemberitahuan',
        //         description:
        //           'Proyek baru gagal diupdate.',
        //         duration: 4,
        //         placement: 'bottomRight'
        //     });
        // });        
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
        const { itemProyekSelected, itemPengajuanSelected, listStatusPengajuan, modePengajuanBaru } = this.props;
        const { anchorEl, disabledInput, disabledInputEdit, jenisPengajuan, keyForm } = this.state;

        let initEdit;
        if(modePengajuanBaru === 'edit' && itemPengajuanSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(itemPengajuanSelected.tanggal),
                ["is_Proyek"]: itemPengajuanSelected.is_proyek,
                ["nominal_pengajuan"]: itemPengajuanSelected.nominal_pengajuan,
                ["is_reimburse"]: itemPengajuanSelected.is_reimburse,
                ["id_status_pengajuan"]: itemPengajuanSelected.id_status_pengajuan,
                ["no_pengajuan"]: itemPengajuanSelected.no_pengajuan,
                ["no_job"]: itemPengajuanSelected.no_job,
                ["nama_customer"]: itemPengajuanSelected.nama_customer,
                ["nama_proyek"]:  itemPengajuanSelected.nama_proyek,
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
                ["nama_customer"]: itemProyekSelected !== null ? itemProyekSelected.nama_customer:null,
                ["nama_proyek"]:  itemProyekSelected !== null ? itemProyekSelected.nama_proyek:null
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
                                    disabled={modePengajuanBaru==='edit'?true:disabledInput}
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
                                disabled={modePengajuanBaru==='edit'?true:disabledInput}
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
                <Form.Item {...tailLayout} style={{width: 150, marginBottom: 8}} name="btnedit">                    
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
                </Form.Item>
                <Form.Item {...tailLayout} style={{width: 150}}>  
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
                        disabled={modePengajuanBaru==='edit'?true:disabledInput}
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