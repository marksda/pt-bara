import React from 'react';
import { connect } from "react-redux";
import { Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

import { getPengajuan, setFilterPengajuan, setIsProgress, setItemMenuSelected, setPaginationPengajuan, setUrutPengajuan } from "../../actions/master-action";
import { Height } from '@material-ui/icons';



const mapStateToProps = store => {
    return {
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        isProgress: store.master.is_progress,
        listPengajuan: store.master.list_pengajuan,
        filterPengajuan: store.master.filter_pengajuan,
        paginationPengajuan: store.master.pagination_pengajuan,
        urutPengajuan: store.master.urut_pengajuan,
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
    };
};

class CommandCenter extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    componentDidMount() {
    	const { paginationPengajuan, setFilterPengajuan, urutPengajuan } = this.props;

        let tmpFilter = [
            {field: 'rentan_tanggal', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
        ];
        
        setFilterPengajuan(tmpFilter);
        this.loadPengajuan(tmpFilter, paginationPengajuan, urutPengajuan);
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

    render() {
        const { listPengajuan } = this.props;
        console.log(listPengajuan);

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
        </>;
        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandCenter);