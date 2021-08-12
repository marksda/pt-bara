import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { DatePicker, Space, Typography } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { getProyek, setFilterProyek, setPaginationProyek, setUrutProyek, setIsProgress, resetFilterProyek } from "../../actions/master-action";
import _ from 'lodash';


const { RangePicker } = DatePicker;
const { Text } = Typography;

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
        resetFilterProyek: () => dispatch(resetFilterProyek()),
        setPaginationProyek: (value) => dispatch(setPaginationProyek(value)),
        setUrutProyek: (value) => dispatch(setUrutProyek(value)),
    };
};

class FormLaporanPiutangProyek extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rentanDate: [`${moment().year()}-01`, `${moment().year()}-${moment().month()+1}`]
        };

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

    componentWillUnmount() {
        this.props.resetFilterProyek();
    }

    changeRangeDate = (dates, datesString) => {
        const { filterProyek, paginationProyek, setFilterProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);

        let tglStart = `${dates[0].get('year')}-${dates[0].get('month')+1}-01`;
        let tglEnd = `${dates[1].get('year')}-${dates[1].get('month')+1}-${moment(dates[1], "MMM YYYY").daysInMonth()}`;

        let tmpRangeDate = [tglStart, tglEnd];
        
        this.setState({rentanDate: tmpRangeDate});

        let tmpFilter = [...filterProyek];

        let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal_persiapan'});

        if(idx < 0) {
            tmpFilter.push(
                {
                    field: "rentan_tanggal_persiapan",
                    rentan: tmpRangeDate
                }
            );
        }
        else {
            tmpFilter[idx].rentan = tmpRangeDate;
        }       

        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);
    }

    customFormat = (value)  => {
        return `${value.format('MMM YYYY')}`;
    }

    // flipDate = (tgl) => {
    //     let tmptgl = tgl.split('-');
    //     return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    // }

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
        const { isProgress, listProyek } = this.props;
        const { rentanDate } = this.state;

        let page =
        <>         
            <Space direction="vertical" size={4}>
                <Text>Periode</Text> 
                <RangePicker 
                    defaultValue={[moment(rentanDate[0]), moment(rentanDate[1])]}
                    format={this.customFormat}
                    style={{width: 200}}
                    placeholder={["tgl. awal", "tgl. akhir"]}
                    allowClear={false}
                    picker="month"
                    onChange={this.changeRangeDate}
                />
            </Space>
            <div className="lp-piutang-proyek-header" style={{marginTop: 8}}>
                <span>No.</span>
                <span>No. Job</span>
                <span>Client</span>
                <span>Proyek</span>
                <span>Nilai</span>
                <span>Piutang</span>
                <span>Pilihan</span>
            </div>
            <div className="lp-piutang-proyek-body scrool-bar-cso" 
                style={{
                    height: `Calc(100vh - 290px)`, 
                    overflow: 'auto',
                    paddingTop: 4
                }}
            >
            {
                listProyek !== null?
                listProyek.data.map((item, index) => (
                    <div className="lp-piutang-proyek-item" key={item.no_job}>
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