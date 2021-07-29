import React from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, InputNumber, notification, Select, Typography } from 'antd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { getAkun, getJenisTransaksi, setFilterAkun, resetFilterAkun, setItemMenuSelected, setPaginationAkun, setUrutAkun, setModeTransaksiBaru, resetItemProyekSelected, resetItemTransaksiSelected, setIsProgress, setItemTransaksiSelected } from "../../actions/master-action";


import FormPencarianProyek from '../forms/Form-Pencarian-Proyek';

import { connect } from "react-redux";
import { DeleteOutlined, FilterOutlined, MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';

const { Text } = Typography;
const { Option } = Select;
const { Search, TextArea } = Input;


const styles = theme => ({
    rootListAkun: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        // height: '90%',
        // padding: 8,
        overflow: 'auto',
    }
});

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
        listAkun: store.master.list_akun,
        filterAkun: store.master.filter_akun,
        paginationAkun: store.master.pagination_akun,
        urutAkun: store.master.urut_akun,
        listJenisTransaksi: store.master.list_jenis_transaksi,
        filterJenistransaksi: store.master.filter_jenis_transaksi,
        paginationJenistransaksi: store.master.pagination_jenis_transaksi,
        urutJenisTransaksi: store.master.urut_jenis_transaksi,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getAkun: (url, headerAuthorization) => dispatch(getAkun(url, headerAuthorization)),
        getJenisTransaksi: (url, headerAuthorization) => dispatch(getJenisTransaksi(url, headerAuthorization)),
        setModeTransaksiBaru: (nilai) => dispatch(setModeTransaksiBaru(nilai)), 
        setFilterAkun: (value) => dispatch(setFilterAkun(value)),
        setPaginationAkun: (value) => dispatch(setPaginationAkun(value)),
        setUrutAkun: (value) => dispatch(setUrutAkun(value)),
        resetFilterAkun: () => dispatch(resetFilterAkun()),
        resetItemProyekSelected: () => dispatch(resetItemProyekSelected()),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        resetItemTransaksiSelected: () => dispatch(resetItemTransaksiSelected()),
        setItemTransaksiSelected: (url, headerAuthorization) => dispatch(setItemTransaksiSelected(url, headerAuthorization)),
    };
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 4 },
};

class TransaksiBaru extends React.Component  {
    constructor(props) {
		super(props);
        this.state = {
            disabledInputEdit: true,
            disabledInput: true,
            kategori: false,
            anchorEl: null,
            noTransaksi: `NP-${moment().year()}/0000`,
            listHeaderAkun: [],
            prefixSearch: 'm.nama',
            heighLeftContainer: 200,
            transaksi: [],
            totalDebet: 0,
            totalKredit: 0
        };

        this.formRef = React.createRef();
        this.itemTransaksi = null;
        this.filterAkunHeader = [{ field: "m.status_header", header: true }];
        this.paginationAkunHeader = {current: 1, pageSize: 1000};
        this.sortAkunHeader = {field: 'm.nama', order: 'asc' };
        this.kodeAwalcari = '';
        this.prevDataPencarianProyek = null;
    }

    componentDidMount() {
        const { paginationAkun, modeTransaksiBaru, urutAkun, setFilterAkun, setPaginationAkun,
            filterJenistransaksi, paginationJenistransaksi, urutJenisTransaksi } = this.props;

        this.loadHeaderAkun(this.filterAkunHeader, this.paginationAkunHeader, this.sortAkunHeader);

        let tmpFilter = [];
        tmpFilter.push(                        
            { field: "m.status_header", header: false }
        );

        let tmpPagination = {...paginationAkun};
        tmpPagination.current = 1; 
        tmpPagination.pageSize = 1000;      

        setPaginationAkun(tmpPagination);
        setFilterAkun(tmpFilter);
        this.loadAkun(tmpFilter, tmpPagination, urutAkun);
        this.loadJenisTransaksi(filterJenistransaksi, paginationJenistransaksi, urutJenisTransaksi);

        if(modeTransaksiBaru === 'edit') {
            this.setState({disabledInputEdit: false});
            setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 100);
        }
        else {
            setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 300);
        }        
    }

    componentWillUnmount() {
        const { resetFilterAkun, resetItemProyekSelected, resetItemTransaksiSelected, setModeTransaksiBaru } = this.props;  
        setModeTransaksiBaru('add');
        resetFilterAkun();
        resetItemTransaksiSelected();
        resetItemProyekSelected(); 
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.modeTransaksiBaru === 'add') {
            if(nextProps.itemProyekSelected !== null) {
                if(this.prevDataPencarianProyek === null) {
                    this.prevDataPencarianProyek = nextProps.itemProyekSelected;
                    this.itemTransaksi.no_job = nextProps.itemProyekSelected.no_job;
                    this.formRef.current.setFieldsValue({
                        no_job: nextProps.itemProyekSelected.no_job,
                        nama_customer: nextProps.itemProyekSelected.nama_customer,
                        nama_proyek: nextProps.itemProyekSelected.nama_proyek
                    });
                }
                else if (nextProps.itemProyekSelected.no_job !== this.prevDataPencarianProyek.no_job) {
                    this.prevDataPencarianProyek = nextProps.itemProyekSelected;
                    this.itemTransaksi.no_job = nextProps.itemProyekSelected.no_job;
                    this.formRef.current.setFieldsValue({                    
                        no_job: nextProps.itemProyekSelected.no_job,
                        nama_customer: nextProps.itemProyekSelected.nama_customer,
                        nama_proyek: nextProps.itemProyekSelected.nama_proyek
                    });
                }            
            }
        }
        else if (nextProps.modeTransaksiBaru === 'edit' && this.itemTransaksi === null) {
            if(nextProps.itemTransaksiSelected !== null) {
                let j = nextProps.itemTransaksiSelected.list_transaksi.length;
                let i=0;
                let td = 0; 
                let tk = 0;
                for(i=0; i<j;i++) {
                    td = td + nextProps.itemTransaksiSelected.list_transaksi[i].debet;
                    tk = tk + nextProps.itemTransaksiSelected.list_transaksi[i].kredit;
                }


                this.formRef.current.setFieldsValue({                    
                    tanggal: moment(nextProps.itemTransaksiSelected.tanggal),
                    is_proyek: nextProps.itemTransaksiSelected.is_proyek,
                    no_job: nextProps.itemTransaksiSelected.no_job,
                    nama_customer: nextProps.itemTransaksiSelected.nama,
                    nama_proyek: nextProps.itemTransaksiSelected.nama_proyek,
                    jenis_transaksi: nextProps.itemTransaksiSelected.id_jenis_transaksi,
                    jatuh_tempo: nextProps.itemTransaksiSelected.jatuh_tempo !== null?moment(nextProps.itemTransaksiSelected.jatuh_tempo):null,
                    keterangan: nextProps.itemTransaksiSelected.keterangan,
                    dokumen: _.cloneDeep(nextProps.itemTransaksiSelected.dokumen),                    
                });
                nextState.transaksi = _.cloneDeep(nextProps.itemTransaksiSelected.list_transaksi);
                nextState.kategori = nextProps.itemTransaksiSelected.is_proyek;
                nextState.totalDebet = td;
                nextState.totalKredit = tk;
                nextState.heighLeftContainer = nextProps.itemTransaksiSelected.is_proyek === true?286:200;
            }            
        }
        else {
            if(nextProps.itemProyekSelected !== null) {
                if(this.prevDataPencarianProyek === null) {
                    this.prevDataPencarianProyek = nextProps.itemProyekSelected;
                    this.itemTransaksi.no_job = nextProps.itemProyekSelected.no_job;
                    this.formRef.current.setFieldsValue({
                        no_job: nextProps.itemProyekSelected.no_job,
                        nama_customer: nextProps.itemProyekSelected.nama_customer,
                        nama_proyek: nextProps.itemProyekSelected.nama_proyek
                    });
                }
                else if (nextProps.itemProyekSelected.no_job !== this.prevDataPencarianProyek.no_job) {
                    this.prevDataPencarianProyek = nextProps.itemProyekSelected;
                    this.itemTransaksi.no_job = nextProps.itemProyekSelected.no_job;
                    this.formRef.current.setFieldsValue({                    
                        no_job: nextProps.itemProyekSelected.no_job,
                        nama_customer: nextProps.itemProyekSelected.nama_customer,
                        nama_proyek: nextProps.itemProyekSelected.nama_proyek
                    });
                }            
            }
        }
        
        return true;
    }

    handleBaru = () => {
        const { modeTransaksiBaru, setModeTransaksiBaru } = this.props;
        
        if(modeTransaksiBaru === 'edit') {
            // resetItemTransaksiSelected();
            this.setState({disabledInput: false, disabledInputEdit: true, kategori: false});  
            setModeTransaksiBaru('add');          
        }
        else {
            this.setState({disabledInput: false});  
        }

        setTimeout(() => {
            this.formRef.current.resetFields();
            this.formRef.current.getFieldInstance('cari').focus();
        }, 100);        

        this.itemTransaksi = {
            tanggal: `${moment().year()}-${moment().month()+1}-${moment().date()}`,
            is_proyek: false,
            no_job: null,
            list_transaksi: [],
            jenis_transaksi: null,
            jatuh_tempo: null,
            dokumen: null,
            keterangan: null
        };
    }

    handleEdit = () => {
        const { itemTransaksiSelected } = this.props;
        
        this.itemTransaksi = {
            id: itemTransaksiSelected.id,
            tanggal: itemTransaksiSelected.tanggal,
            is_proyek: itemTransaksiSelected.is_proyek,
            no_job: itemTransaksiSelected.no_job,
            list_transaksi: _.cloneDeep(itemTransaksiSelected.list_transaksi),
            jenis_transaksi: itemTransaksiSelected.id_jenis_transaksi,
            jatuh_tempo: itemTransaksiSelected.jatuh_tempo,
            dokumen: _.cloneDeep(itemTransaksiSelected.dokumen),
            keterangan: itemTransaksiSelected.keterangan
        };
        
        this.setState({
            disabledInput: false, 
            disabledInputEdit: true, 
        });              

        setTimeout(() => {
            this.formRef.current.getFieldInstance('cari').focus();
        }, 100);       
        
    }

    handleBatal = () => {
        const { itemTransaksiSelected, modeTransaksiBaru, paginationAkun, urutAkun, setFilterAkun, resetItemProyekSelected } = this.props;         
        resetFilterAkun();
        this.loadAkun(null, paginationAkun, urutAkun);
        if(modeTransaksiBaru === 'edit') {
            this.itemTransaksi = {};

            this.formRef.current.setFieldsValue({                    
                tanggal: moment(itemTransaksiSelected.tanggal),
                is_proyek: itemTransaksiSelected.is_proyek,
                no_job: itemTransaksiSelected.no_job,
                nama_customer: itemTransaksiSelected.nama,
                nama_proyek: itemTransaksiSelected.nama_proyek,
                jenis_transaksi: itemTransaksiSelected.id_jenis_transaksi,
                jatuh_tempo: itemTransaksiSelected.jatuh_tempo !== null?moment(itemTransaksiSelected.jatuh_tempo):null,
                keterangan: itemTransaksiSelected.keterangan,
                dokumen: _.cloneDeep(itemTransaksiSelected.dokumen)             
            });
            
            let j = itemTransaksiSelected.list_transaksi.length;
            let i=0;
            let td = 0; 
            let tk = 0;
            for(i=0; i<j; i++) {
                td = td + itemTransaksiSelected.list_transaksi[i].debet;
                tk = tk + itemTransaksiSelected.list_transaksi[i].kredit;
            }

            this.setState({
                disabledInput: true, 
                disabledInputEdit:false,
                transaksi: _.cloneDeep(itemTransaksiSelected.list_transaksi),
                kategori: itemTransaksiSelected.is_proyek,
                totalDebet: td, 
                totalKredit: tk, 
                heighLeftContainer: itemTransaksiSelected.is_proyek === true?286:200 
            });
        }
        else {
            this.itemTransaksi = {
                tanggal: `${moment().year()}-${moment().month()+1}-${moment().date()}`,
                is_proyek: false,
                no_job: null,
                list_transaksi: [],
                jenis_transaksi: null,
                jatuh_tempo: null,
                dokumen: null,
                keterangan: null
            };           
            this.formRef.current.resetFields(); 
            resetItemProyekSelected(); 
            this.setState({disabledInput: true, kategori: false, transaksi: [], totalDebet: 0, totalKredit: 0, heighLeftContainer: 200 });            
        }

        
        this.kodeAwalcari = '';
        let tmpFilter = [];
        tmpFilter.push(                        
            { field: "m.status_header", header: false }
        ); 
        setFilterAkun(tmpFilter);        
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);

        setTimeout(() => {this.formRef.current.getFieldInstance('btnbaru').focus();}, 100);
    }

    handleCari = (value, event) => {
        event.preventDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        const { filterAkun, paginationAkun, urutAkun, setFilterAkun } = this.props; 
        const { prefixSearch } = this.state;
        
        let tmpFilter = [];        
        tmpFilter = [...filterAkun];
        let idx = -1; 

        if(prefixSearch==="m.nama") {
            idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.nama'}); 
            if(idx < 0) {            
                tmpFilter.push(                        
                    { field: "m.nama", search: value }
                );
            }
            else {
                tmpFilter[idx].search = value;
            }     
        }
        else {
            idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.id'}); 
            if(idx < 0) {            
                tmpFilter.push(                        
                    { field: "m.id", id: value }
                );
            }
            else {
                tmpFilter[idx].id = value;
            }
        }

        setFilterAkun(tmpFilter); 
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {
            this.formRef.current.getFieldInstance('cari').focus();
        }, 300);
    }

    handleChange = (e) => {
        const { prefixSearch } = this.state;

        if(prefixSearch === 'm.id') {
            let regex = new RegExp(this.kodeAwalcari);
            if(!regex.test(e.target.value)) {
                this.formRef.current.setFieldsValue({
                    cari: this.kodeAwalcari
                });
            }
        }
    }

    handleChangeDebit = (value, index) => {
        const { totalDebet } = this.state;
        let tmp = this.itemTransaksi.list_transaksi[index];
        let total = totalDebet - tmp.debet + value;
        tmp.debet = value;
        this.setState({totalDebet: total});
	}

    handleChangeKredit = (value, index) => {
        const { totalKredit } = this.state;
        let tmp = this.itemTransaksi.list_transaksi[index];
        let total = totalKredit - tmp.kredit + value;
        tmp.kredit = value;
        this.setState({totalKredit: total});
	}

    handleChangeKategoriTransaksi = (value) => {
        const { modeTransaksiBaru, itemTransaksiSelected, itemProyekSelected } = this.props;        
        this.itemTransaksi.is_proyek = value;     
        this.setState({kategori: value});

        if(modeTransaksiBaru === 'edit') {
            if(value === true) {    
                if(itemProyekSelected === null) {
                    this.itemTransaksi.no_job = itemTransaksiSelected.no_job;
                    this.formRef.current.setFieldsValue({
                        no_job: itemTransaksiSelected.no_job,
                        nama_customer: itemTransaksiSelected.nama,
                        nama_proyek: itemTransaksiSelected.nama_proyek
                    });
                }            
                else {
                    this.itemTransaksi.no_job = itemProyekSelected.no_job;
                    this.formRef.current.setFieldsValue({
                        no_job: itemProyekSelected.no_job,
                        nama_customer: itemProyekSelected.nama_customer,
                        nama_proyek: itemProyekSelected.nama_proyek
                    });
                }

                this.setState({heighLeftContainer: 286});
                setTimeout(() => {this.formRef.current.getFieldInstance('btncariproyek').focus();}, 100);
            }
            else {
                this.itemTransaksi.no_job = null;
                this.formRef.current.setFieldsValue({
                    no_job: null,
                    nama_customer: null,
                    nama_proyek: null
                });
                this.setState({heighLeftContainer: 200});
                setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
            }
        }
        else {
            if(value === true) {
                this.setState({heighLeftContainer: 286});
                setTimeout(() => {this.formRef.current.getFieldInstance('btncariproyek').focus();}, 100);
            }
            else {
                this.itemTransaksi.no_job = null;
                this.formRef.current.setFieldsValue({
                    no_job: null,
                    nama_customer: null,
                    nama_proyek: null
                });
                this.setState({heighLeftContainer: 200});
                setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
            }
        }        
	}

    handleChangeJenisTransaksi = (value) => {
        this.itemTransaksi.jenis_transaksi = value;  
	}

    handleChangeNilaiText = (e) => {
		switch(e.currentTarget.dataset.jenis) {
            case 'keterangan':
                this.itemTransaksi.keterangan = e.currentTarget.value;          
                break;
            case 'jenisdokumen':
                if(this.itemTransaksi.dokumen === null) {
                    this.itemTransaksi.dokumen = [];
                    this.itemTransaksi.dokumen.push({
                        jenis_dokumen: e.currentTarget.value
                    });                  
                }
                else {
                    if(Number(e.currentTarget.dataset.idx) < this.itemTransaksi.dokumen.length) {
                        this.itemTransaksi.dokumen[Number(e.currentTarget.dataset.idx)].jenis_dokumen = e.currentTarget.value;
                    } 
                    else {
                        this.itemTransaksi.dokumen.push({
                            jenis_dokumen: e.currentTarget.value
                        });  
                    }                   
                }
                break;
            case 'nodokumen':
                if(this.itemTransaksi.dokumen === null) {
                    this.itemTransaksi.dokumen = [];
                    this.itemTransaksi.dokumen.push({
                        no_dokumen: e.currentTarget.value
                    });
                }
                else {
                    if(Number(e.currentTarget.dataset.idx) < this.itemTransaksi.dokumen.length) {
                        this.itemTransaksi.dokumen[Number(e.currentTarget.dataset.idx)].no_dokumen = e.currentTarget.value;
                    } 
                    else {
                        this.itemTransaksi.dokumen.push({
                            no_dokumen: e.currentTarget.value
                        });
                    }      
                }                
                break;
			default:
		}
	}

    handleChangePrefixSearch = (value) => {
        const { filterAkun, paginationAkun, urutAkun, setFilterAkun } = this.props;         
        this.setState({prefixSearch: value});
        let tmpFilter = [];
        let idx = -1;         
        tmpFilter = [...filterAkun];
        idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.id'});             
        if(idx < 0) {            
            tmpFilter.push(                        
                { field: "m.id", id: this.kodeAwalcari }
            );
        }
        else {
            tmpFilter[idx].id = this.kodeAwalcari;
        }

        if(value === 'm.id') {
            idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.nama'}); 
            if(idx >= 0) {            
                tmpFilter.splice(idx,1);
            }       
        
            this.formRef.current.setFieldsValue({
                cari: this.kodeAwalcari
            });
        }
        else {
            this.formRef.current.setFieldsValue({
                cari: ''
            });
        }

        setFilterAkun(tmpFilter); 
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleChangeSubKategoriAkun = (v) => {
        const { filterAkun, paginationAkun, urutAkun, setFilterAkun } = this.props;       
        const { prefixSearch } = this.state;

        let tmpFilter = [];
        let idx = -1;  

        if(filterAkun!==null) {
            idx = _.findIndex(filterAkun, function(o){return o.field === 'm.id'}); 
            tmpFilter = [...filterAkun];
        }
        
        this.kodeAwalcari = v.split("0")[0];
       
        if(prefixSearch === 'm.id') {
            this.formRef.current.setFieldsValue({
                cari: this.kodeAwalcari
            });
        }

        if(idx < 0) {            
            tmpFilter.push(                        
                { field: "m.id", id: this.kodeAwalcari }
            );
        }
        else {
            tmpFilter[idx].id = this.kodeAwalcari;
        }      
        setFilterAkun(tmpFilter); 
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {
            this.formRef.current.getFieldInstance('cari').focus();
        }, 300);
    }

    handleChangeTanggalJatuhTempo = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemTransaksi.jatuh_tempo = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
        else {
            this.itemTransaksi.jatuh_tempo = null;
        }
	}

    handleChangeTanggalTransaksi = (date, dateString) => {
		if(date !== null) {
			let tmp = dateString.split('-');
            this.itemTransaksi.tanggal = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
		}
	}

    handleDeleteItemTransaction = (e, index) => {
        const { totalDebet, totalKredit } = this.state;
        let tmpDebet = totalDebet - this.itemTransaksi.list_transaksi[index].debet;
        let tmpKredit = totalKredit - this.itemTransaksi.list_transaksi[index].kredit

        this.itemTransaksi.list_transaksi.splice(index, 1);

        this.setState({
            transaksi: this.itemTransaksi.list_transaksi, 
            totalDebet: tmpDebet, 
            totalKredit: tmpKredit
        });
    }

    handleItemAkunClick = (event, index) => {
        const { listAkun } = this.props;
        let tmpAkunItem = {...listAkun.data[index]}
        tmpAkunItem.debet = null;
        tmpAkunItem.kredit = null;
        delete tmpAkunItem.status_header;

        let self = this;        
        let i =  _.findIndex(self.itemTransaksi.list_transaksi, function(o) { return o.id === tmpAkunItem.id; });
        if(i < 0) {
            this.itemTransaksi.list_transaksi.push({...tmpAkunItem}); 
            this.setState({transaksi: this.itemTransaksi.list_transaksi});
        }
    }

    handleOnFinish = (value) => {
		const { modeTransaksiBaru } = this.props;
		if(modeTransaksiBaru === 'edit') {            
		    this.setState({disabledInput: true, disabledInputEdit: true});
            this.updateTransaksi();
        }
        else {            
		    this.setState({disabledInput: true});
			this.saveTransaksi();
        }
	}

    handleOpenWindowProyekSearch = (e) => {
        this.setState({anchorEl: e.currentTarget});
    }

    handleCloseWindowProyekSearch = () => {
        this.setState({anchorEl: null});
    }

    handleRemoveDokumen = (idx) => {
        if(this.itemTransaksi.dokumen !== null) {
            this.itemTransaksi.dokumen.splice(idx,1);
            if(this.itemTransaksi.dokumen.length === 0) {
                this.itemTransaksi.dokumen = null;
            }
        }
    }

    handleReset = () => {
        const { itemTransaksiSelected, paginationAkun, modeTransaksiBaru, urutAkun, setFilterAkun } = this.props;  
        if(modeTransaksiBaru === 'edit') {
            this.itemTransaksi = {
                id: itemTransaksiSelected.id,
                tanggal: itemTransaksiSelected.tanggal,
                is_proyek: itemTransaksiSelected.is_proyek,
                no_job: itemTransaksiSelected.no_job,
                list_transaksi: _.cloneDeep(itemTransaksiSelected.list_transaksi),
                jenis_transaksi: itemTransaksiSelected.id_jenis_transaksi,
                jatuh_tempo: itemTransaksiSelected.jatuh_tempo,
                dokumen: _.cloneDeep(itemTransaksiSelected.dokumen),
                keterangan: itemTransaksiSelected.keterangan
            };

            this.formRef.current.setFieldsValue({                    
                tanggal: moment(itemTransaksiSelected.tanggal),
                is_proyek: itemTransaksiSelected.is_proyek,
                no_job: itemTransaksiSelected.no_job,
                nama_customer: itemTransaksiSelected.nama,
                nama_proyek: itemTransaksiSelected.nama_proyek,
                jenis_transaksi: itemTransaksiSelected.id_jenis_transaksi,
                jatuh_tempo: itemTransaksiSelected.jatuh_tempo !== null?moment(itemTransaksiSelected.jatuh_tempo):null,
                keterangan: itemTransaksiSelected.keterangan,
                dokumen: _.cloneDeep(itemTransaksiSelected.dokumen)             
            });
            
            let j = itemTransaksiSelected.list_transaksi.length;
            let i=0;
            let td = 0; 
            let tk = 0;
            for(i=0; i<j; i++) {
                td = td + itemTransaksiSelected.list_transaksi[i].debet;
                tk = tk + itemTransaksiSelected.list_transaksi[i].kredit;
            }

            this.setState({
                transaksi: _.cloneDeep(itemTransaksiSelected.list_transaksi),
                kategori: itemTransaksiSelected.is_proyek,
                totalDebet: td, 
                totalKredit: tk, 
                heighLeftContainer: itemTransaksiSelected.is_proyek === true?286:200 
            });
        }
        else {
            this.itemTransaksi = {
                tanggal: `${moment().year()}-${moment().month()+1}-${moment().date()}`,
                is_proyek: false,
                no_job: null,
                list_transaksi: [],
                jenis_transaksi: null,
                jatuh_tempo: null,
                dokumen: null,
                keterangan: null
            };           
            this.formRef.current.resetFields();             
            this.setState({kategori: false, transaksi: [], totalDebet: 0, totalKredit: 0, heighLeftContainer: 200 });
        }
		
        resetItemProyekSelected(); 
        this.kodeAwalcari = '';
        let tmpFilter = [];
        tmpFilter.push(                        
            { field: "m.status_header", header: false }
        ); 
        setFilterAkun(tmpFilter);        
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
	}

    handleToNavDaftarTransaksi = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Daftar Transaksi');
    }

    loadHeaderAkun = (f, p, s) => {
        const { headerAuthorization, restfulServer } = this.props;
        let self = this;   
        
        let tmpFilter = [];
        tmpFilter.push(                        
            { field: "m.status_header", header: true }
        );

        axios({
            method: 'get',
            url: `${restfulServer}/master/akun`,
            headers: {...headerAuthorization},
            params: {
                filter:  JSON.stringify(f),
                pagination: p,
                sorter: s
            }
        })
	    .then((r) => {    
            if(r.data.status === 200) {
                self.setState({listHeaderAkun: r.data.keterangan.data});
            }
	    })
	    .catch((r) => {
	    	console.log(r.toString());
	    });
    }

    loadAkun = (filter, pagination, urut) => {
        const { getAkun, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/akun?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        else {
            url = `${restfulServer}/master/akun?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        
        getAkun(url, headerAuthorization);
    }

    loadJenisTransaksi = (filter, pagination, urut) => {
        const { getJenisTransaksi, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/jenis_transaksi?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        else {
            url = `${restfulServer}/master/jenis_transaksi?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        
        getJenisTransaksi(url, headerAuthorization);
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

    saveTransaksi = () => {
		const { headerAuthorization, modeTransaksiBaru, restfulServer, setIsProgress, setItemTransaksiSelected } = this.props;
	    let self = this;
        setIsProgress(true);
       
	    axios({
            method: 'put',
            url: `${restfulServer}/master/transaksi`,
            headers: {...headerAuthorization},
            data: this.itemTransaksi
        })
	    .then((r) => {              
            setIsProgress(false);
            if(r.data.status === 200) {
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                    'Transaksi berhasil ditambahkan.',
                    duration: 4,
                    placement: 'bottomRight'
                });
                setItemTransaksiSelected(`${restfulServer}/master/detailtransaksi?id=${self.itemTransaksi.id}`, headerAuthorization);
            }
            else {
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Transaksi ditambahkan.',
                    duration: 4,
                    placement: 'bottomRight'
                });
                
            }    
            
            if(modeTransaksiBaru === 'edit') {
                self.setState({disabledInput: true, disabledInputEdit: false}); 
            }
            else {
                self.setState({disabledInput: true}); 
            }
	    })
	    .catch((r) => {
            setIsProgress(false);
	    	if(modeTransaksiBaru === 'edit') {
                self.setState({disabledInput: false, disabledInputEdit: false}); 
            }
            else {
                self.setState({disabledInput: false}); 
            } 
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Pengajuan baru gagal ditambahkan.',
                duration: 4,
                placement: 'bottomRight'
            });
	    });
	}

    updateTransaksi = () => {
        const { headerAuthorization, restfulServer, setIsProgress, setItemTransaksiSelected } = this.props;

        setIsProgress(true);

        let self = this;    

        axios({
            method: 'post',
            url: `${restfulServer}/master/transaksi`,
            headers: {...headerAuthorization},
            data: this.itemTransaksi
        })
        .then((r) => {             
            self.setState({disabledInput: true, disabledInputEdit: false}); 
            setIsProgress(false);
            setItemTransaksiSelected(`${restfulServer}/master/detailtransaksi?id=${self.itemTransaksi.id}`, headerAuthorization);
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Transaksi berhasil diupdate.',
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
                  'Transaksi gagal diupdate.',
                duration: 4,
                placement: 'bottomRight'
            });
        });        
    }

    render() {
        const { anchorEl, disabledInput, disabledInputEdit, heighLeftContainer, listHeaderAkun, kategori, prefixSearch, transaksi,
            totalDebet, totalKredit } = this.state;
        const { classes, isProgress, modeTransaksiBaru, itemTransaksiSelected, listAkun, listJenisTransaksi } = this.props;
        
        const selectBefore = (
            <Select 
                value={prefixSearch} 
                dropdownStyle={{zIndex: 2000}}
                onChange={this.handleChangePrefixSearch}
                disabled={isProgress===true?true:disabledInput}
            >
              <Option value="m.id">KODE</Option>
              <Option value="m.nama">NAMA</Option>
            </Select>
        );
        
        let initEdit;
        if(modeTransaksiBaru === 'edit' && itemTransaksiSelected !== null ) {
            initEdit = {
                layout: 'vertical',
                remember: true,
            };
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment(),
                ["is_proyek"]: false,
                ["no_job"]: null,
                ["nama_customer"]: null,
                ["nama_proyek"]:  null,
                ["kode"]: "0",
                ["jenis_transaksi"]: null,
                ["jatuh_tempo"]: null,
                ["list_transaksi"]: null,
                ["keterangan"]: null
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
                <div style={{minWidth: 1000, width: '85%', display: 'flex', flexDirection: 'column'}}>
                    <table className="table-container-transaksi-baru">
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
                                        allowClear={false}
                                        onChange={this.handleChangeTanggalTransaksi}
                                        style={{width: 150}}
                                    />
                                </Form.Item>
                            </td>
                            <td colSpan="2">
                                <Form.Item 
                                    label="Kategori"
                                    name="is_proyek"
                                    rules={[{required: true, message: 'kategori pengajuan harus diisi'}]}
                                    style={{marginBottom: 16}}
                                >
                                    <Select 
                                        onChange={this.handleChangeKategoriTransaksi}
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
                                            style={{ minWidth: 150, color: '#646463'}}
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
                                        <Input disabled={true} style={{minWidth: 350,color: '#646463'}}/>
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
                                        <Input disabled={true} style={{minWidth: 450, color: '#646463'}}/>
                                    </Form.Item>
                                    <Form.Item name="btncariproyek">
                                        <Button 
                                            type="dashed" 
                                            icon={<FilterOutlined />} 
                                            style={{marginTop: 30}}
                                            disabled={disabledInput}
                                            onClick={this.handleOpenWindowProyekSearch} />
                                    </Form.Item>
                                    </div>
                                </td>
                            </tr>
                            :null
                        }
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
                        <FormPencarianProyek formRef={this.formRef} handleCloseWindowProyekSearch={this.handleCloseWindowProyekSearch} />
                    </Popover> 
                    <div className="card-container">    
                        <div className="left-container" style={{height: `Calc(100vh - ${heighLeftContainer}px)`}}>
                            <Text strong>Daftar Akun</Text>
                            <div style={{marginTop: 8, display: 'flex'}}>
                                <Form.Item name="kode" style={{ width: '35%', marginRight: 16, marginBottom: 16 }} >
                                    <Select onChange={this.handleChangeSubKategoriAkun} disabled={isProgress===true?true:disabledInput}>
                                        <Option value="0">SEMUA</Option>
                                        {
                                            listHeaderAkun.map((item) =>
                                                <Option key={item.id} value={item.id}>{item.nama.toUpperCase()}</Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    name="cari" style={{ width: '65%', marginBottom: 16}} 
                                    shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                                >
                                    <Search                                    
                                        placeholder="pencarian"
                                        onSearch={this.handleCari}
                                        onChange={this.handleChange}
                                        addonBefore={selectBefore}
                                        disabled={isProgress===true?true:disabledInput}
                                    />
                                </Form.Item>
                            </div>
                            <List className={classes.rootListAkun} style={{height: `Calc(100vh - ${heighLeftContainer+115}px)`}}>
                                {
                                    listAkun !== null? listAkun.data.map((row, index) => {
                                        return(
                                            <ListItem 
                                                key={row.id} 
                                                button 
                                                dense 
                                                disabled={isProgress===true?true:disabledInput}
                                                onClick={(event) => this.handleItemAkunClick(event, index)}
                                            >
                                                <ListItemText primary={`[${row.id}] -- ${row.nama}`} />
                                            </ListItem>
                                        );
                                    }): null
                                }
                            </List>
                        </div>
                        <div className="right-container" style={{height: `Calc(100vh - ${heighLeftContainer}px)`}}>
                            <table className="table-transaksi">
                                <thead>
                                    <tr>
                                        <th>Akun</th>
                                        <th>Debet</th>
                                        <th>Kredit</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transaksi.length > 0 ? transaksi.map((item, index) =>
                                            <tr key={item.id}>
                                                <td>{item.nama}</td>
                                                <td>
                                                    <InputNumber 
                                                        style={{width: 130}}
                                                        onChange={(value)=> this.handleChangeDebit(value, index)}
                                                        precision={2}
                                                        formatter={this.formatterRupiah}
                                                        parser={this.parserRupiah}
                                                        defaultValue={item.debet}
                                                        disabled={disabledInput}
                                                    />
                                                </td>
                                                <td>
                                                    <InputNumber 
                                                        style={{width: 130}}
                                                        onChange={(value)=> this.handleChangeKredit(value, index)}
                                                        precision={2}
                                                        formatter={this.formatterRupiah}
                                                        parser={this.parserRupiah}
                                                        defaultValue={item.kredit}
                                                        disabled={disabledInput}
                                                    />
                                                </td>
                                                <td>
                                                    <DeleteOutlined 
                                                        style={{ fontSize: '18px', cursor: 'pointer'}}
                                                        data-id={index}
                                                        onClick={(e) => this.handleDeleteItemTransaction(e, index)}
                                                    />
                                                </td>
                                            </tr>
                                        )                                        
                                        :null
                                    }
                                    <tr>
                                        <td></td>
                                        <td>
                                            <InputNumber 
                                                style={{width: 130, color: '#646463'}}
                                                disabled={true}
                                                precision={2}
                                                formatter={this.formatterRupiah}
                                                parser={this.parserRupiah}
                                                value={totalDebet}
                                            />
                                        </td>
                                        <td>
                                            <InputNumber 
                                                style={{width: 130, color: '#646463'}}
                                                disabled={true}
                                                precision={2}
                                                formatter={this.formatterRupiah}
                                                parser={this.parserRupiah}
                                                value={totalKredit}
                                            />
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div style={{display: 'flex'}}>
                                <Form.Item 
                                    label="Jenis Transaksi"
                                    name="jenis_transaksi"
                                    style={{marginBottom: 16, marginRight: 16}}
                                >
                                    <Select 
                                        onChange={this.handleChangeJenisTransaksi}
                                        disabled={disabledInput}
                                        style={{minWidth: 260}}
                                    >
                                        {
                                            listJenisTransaksi !== null?
                                            listJenisTransaksi.data.map((item) => 
                                                <Select.Option key={item.id} value={item.id}>{item.nama}</Select.Option>
                                            )
                                            :null
                                        }
                                    </Select>
                                </Form.Item>
                                <div style={{display: 'flex', flexDirection: 'column'}}>                                       
                                    <Form.Item
                                        label="Jatuh Tempo"
                                        name="jatuh_tempo"
                                        style={{marginBottom: 16}}
                                    >
                                        <DatePicker 
                                            format="DD-MM-YYYY" 
                                            disabled={disabledInput}
                                            onChange={this.handleChangeTanggalJatuhTempo}
                                        />
                                    </Form.Item>
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
                                                                            name={[field.name, 'jenis_dokumen']}
                                                                            fieldKey={[field.fieldKey, 'jenis_dokumen']}
                                                                            rules={[{required: true, message: 'Jenis Dokumen harus diisi'}]} 
                                                                            style={{marginBottom: 8}}
                                                                        >
                                                                            <Input 
                                                                                data-jenis="jenisdokumen"
                                                                                data-idx={index}
                                                                                disabled={disabledInput} 
                                                                                placeholder="Dokumen"
                                                                                style={{ width: 150, marginRight: 16 }} 
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
                                                                                style={{ width: 150, marginRight: 16}} 
                                                                                onChange={this.handleChangeNilaiText}
                                                                            />
                                                                        </Form.Item>
                                                                        {
                                                                            disabledInputEdit===true?<MinusCircleOutlined
                                                                                className="dynamic-delete-button"
                                                                                disabled={disabledInput}
                                                                                style={{marginTop: index===0?38:10, color: 'red'}}
                                                                                onClick={
                                                                                    () => {
                                                                                        remove(field.name);
                                                                                        this.handleRemoveDokumen(index);
                                                                                    } 
                                                                                }
                                                                            />:null
                                                                        }
                                                                    </Form.Item>
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                    <Form.Item
                                                        label={fields.length === 0 ? 'Dokumen' : ''}
                                                        style={{marginBottom: 8}}
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
                                </div>
                            </div>
                            <Form.Item
                                label="keterangan"
                                name="keterangan"
                                rules={[{required: true, message: 'keterangan harus diisi'}]} 
                            >
                                <TextArea  
                                    rows={4}
                                    data-jenis="keterangan"
                                    disabled={disabledInput}
                                    onChange={this.handleChangeNilaiText}
                                    placeholder="Keterangan transaksi"
                                />
                            </Form.Item>
                        </div>
                    </div>  
                </div>       
                <div style={{display: 'flex', flexDirection: 'column', width: '15%'}}>
                    <Form.Item {...tailLayout} style={{width: 150, marginBottom: 8}} name="btnbaru">
                        <Button 
                            shape="round"
                            size="default"
                            htmlType="button" 
                            onClick={this.handleBaru} 
                            style={{width: 150}}
                            disabled={isProgress===true?true:!disabledInput}
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
                            disabled={disabledInput}
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
                            onClick={this.handleToNavDaftarTransaksi} 
                            disabled={isProgress===true?true:!disabledInput}
                            style={{marginBottom: 8, width: 150}}
                        >
                        Daftar Transaksi
                        </Button>
                    </Form.Item>
                </div>        
            </div>   
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TransaksiBaru));