import React from 'react';
import { connect } from "react-redux";
import { Button, Divider } from 'antd';
import { PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import { getPengajuan, setFilterPengajuan, setIsProgress, setItemMenuSelected, setPaginationPengajuan, setUrutPengajuan, getProyek, setFilterProyek, setPaginationProyek, setUrutProyek } from "../../actions/master-action";



const mapStateToProps = store => {
    return {
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        isProgress: store.master.is_progress,
        listPengajuan: store.master.list_pengajuan,
        filterPengajuan: store.master.filter_pengajuan,
        paginationPengajuan: store.master.pagination_pengajuan,
        urutPengajuan: store.master.urut_pengajuan,
        listProyek: store.master.list_proyek,
        filterProyek: store.master.filter_proyek,
        paginationProyek: store.master.pagination_proyek,
        urutProyek: store.master.urut_proyek,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),      
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),  
        getPengajuan: (url, headerAuthorization) => dispatch(getPengajuan(url, headerAuthorization)),
        setFilterPengajuan: (value) => dispatch(setFilterPengajuan(value)),
        setPaginationPengajuan: (value) => dispatch(setPaginationPengajuan(value)),
        setUrutPengajuan: (value) => dispatch(setUrutPengajuan(value)),  
        getProyek: (url, headerAuthorization) => dispatch(getProyek(url, headerAuthorization)),
        setFilterProyek: (value) => dispatch(setFilterProyek(value)),
        setPaginationProyek: (value) => dispatch(setPaginationProyek(value)),
        setUrutProyek: (value) => dispatch(setUrutProyek(value)),
    };
};

class CommandCenter extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    componentDidMount() {
    	const { 
            paginationPengajuan, setFilterPengajuan, urutPengajuan,
            setFilterProyek, paginationProyek, urutProyek
        } = this.props;

        let tmpFilterPengajuan = [
            {field: 'rentan_tanggal', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
        ];
        
        setFilterPengajuan(tmpFilterPengajuan);
        this.loadPengajuan(tmpFilterPengajuan, paginationPengajuan, urutPengajuan);

        let tmpFilterProyek = [
            {field: 'rentan_tanggal_persiapan', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
        ];

        setFilterProyek(tmpFilterProyek);
        this.loadProyek(tmpFilterProyek, paginationProyek, urutProyek);
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleToNavPengajuanBaru = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Pengajuan Baru');
    }

    handleToNavProyekBaru = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Proyek Baru');
    }

    handleToNavTransaksiBaru = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Transaksi Baru');
    }

    loadPengajuan = (filter, pagination, urut) => {
        const { getPengajuan, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/pengajuan?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;        
        }
        else {
            url = `${restfulServer}/master/pengajuan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;
        } 
        getPengajuan(url, headerAuthorization);
    }

    loadProyek = (filter, pagination, urut) => {
        const { getProyek, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/proyek?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;        
        }
        else {
            url = `${restfulServer}/master/proyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;
        } 
        getProyek(url, headerAuthorization);
    }

    render() {
        const { listPengajuan, listProyek } = this.props;
        console.log(listProyek);

        let page =
        <>
            <div className="content-flex-center">
                <Button type="primary" size="large" icon={<PlusOutlined />} style={{marginRight: 16, flexGrow: 1}} onClick={this.handleToNavPengajuanBaru}>Ajukan Baru</Button>
                <Button type="primary" size="large" icon={<PlusOutlined />} style={{marginRight: 16, flexGrow: 1}} onClick={this.handleToNavProyekBaru}>Proyek Baru</Button>
                <Button type="primary" size="large" icon={<PlusOutlined />} style={{flexGrow: 1}} onClick={this.handleToNavTransaksiBaru}>Transaksi Baru</Button>
            </div>
            <Divider orientation="left" plain>DAFTAR PENGAJUAN</Divider>
            <div className="pengajuan-cc-header">
                <span>No.</span>
                <span>Tgl.</span>
                <span>No. Pengajuan</span>
                <span>No. Job</span>
                <span>Nama</span>
                <span>Nilai</span>
                <span>Keterangan</span>
                <span>Status</span>
            </div>
            <div className="pengajuan-cc-body" style={{height: 100}}>
            {
                listPengajuan !== null?
                listPengajuan.data.map((item, index) => (
                    <div className="pengajuan-cc-item" key={item.no_pengajuan}>
                        <span>{`${index+1}.`}</span>
                        <span>{this.flipDate(item.tanggal)}</span>
                        <span>{item.no_pengajuan}</span>
                        <span>{item.no_job}</span>
                        <span>{item.nama}</span>
                        <span>{new Intl.NumberFormat('id').format(item.nominal_pengajuan)}</span>
                        <span>{item.deskripsi_pengajuan}</span>
                        <span>{item.status}</span>
                    </div>
                )):
                null
            }    
            </div>
            <Divider orientation="left" plain>DAFTAR PROYEK</Divider>
            <div className="proyek-cc-header">
                <span>No.</span>
                <span>No. Job</span>
                <span>Client</span>
                <span>Proyek</span>
                <span>Nilai</span>
                <span>Piutang</span>
                <span>Pilihan</span>
            </div>
            <div className="proyek-cc-body" style={{height: 100}}>
            {
                listProyek !== null?
                listProyek.data.map((item, index) => (
                    <div className="proyek-cc-item" key={item.no_job}>
                        <span>{`${index+1}.`}</span>
                        <span>{item.no_job}</span>
                        <span>{item.nama_customer}</span>
                        <span>{item.nama_proyek}</span>
                        <span>{new Intl.NumberFormat('id').format(item.nilai_kontrak)}</span>
                        <span>{new Intl.NumberFormat('id').format(0)}</span>
                        <ProfileOutlined style={{ fontSize: '18px', cursor: 'pointer'}}  />
                    </div>
                )):
                null
            }
            </div>
            <div style={{display: 'flex', marginTop: 16}}>
                <Paper className="widget-cc" style={{marginRight: 16, flexGrow: 4, padding: 8}} elevation={16}>
                    <span>RESUME LABA/RUGI</span>
                </Paper>
                <Paper className="widget-cc" style={{flexGrow: 3, padding: 8}} elevation={16}>
                    <span>BUDGET & REALISASI BIAYA PROYEK</span>
                </Paper>
            </div>
        </>;
        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandCenter);