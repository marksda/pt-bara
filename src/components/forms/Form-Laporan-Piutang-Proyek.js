import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { ProfileOutlined } from '@ant-design/icons';
import { getProyek, setFilterProyek, setPaginationProyek, setUrutProyek, setIsProgress } from "../../actions/master-action";

const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        isProgress: store.master.is_progress,
        listProyek: store.master.list_proyek,
        filterProyek: store.master.filter_proyek,
        paginationProyek: store.master.pagination_proyek,
        urutProyek: store.master.urut_proyek,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        getProyek: (url, headerAuthorization) => dispatch(getProyek(url, headerAuthorization)),
        setFilterProyek: (value) => dispatch(setFilterProyek(value)),
        setPaginationProyek: (value) => dispatch(setPaginationProyek(value)),
        setUrutProyek: (value) => dispatch(setUrutProyek(value)),
    };
};

class FormLaporanPiutangProyek extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    componentDidMount() {
    	const { 
            setFilterProyek, paginationProyek, urutProyek
        } = this.props;

        let tmpFilterProyek = [
            {field: 'rentan_tanggal_persiapan', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
        ];

        setFilterProyek(tmpFilterProyek);
        this.loadProyek(tmpFilterProyek, paginationProyek, urutProyek);
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
        const { listProyek } = this.props;

        let page =
        <>
            <div className="lp-piutang-header">
                <span>No.</span>
                <span>No. Job</span>
                <span>Client</span>
                <span>Proyek</span>
                <span>Nilai</span>
                <span>Piutang</span>
                <span>Pilihan</span>
            </div>
            <div className="lp-piutang-body" style={{height: 300}}>
            {
                listProyek !== null?
                listProyek.data.map((item, index) => (
                    <div className="lp-piutang-item" key={item.no_job}>
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
        </>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLaporanPiutangProyek);