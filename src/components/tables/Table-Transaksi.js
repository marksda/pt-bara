import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import KonfirmasiDialog from "../dialogs/Konfirmasi-Dialog";
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import _ from 'lodash';

import { Input, DatePicker, Form, notification, Select } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { connect } from "react-redux";

import { 
    getTransaksi, setFilterTransaksi, setIsProgress, setItemMenuSelected, setItemTransaksiSelected, 
    setModeTransaksiBaru, setPaginationTransaksi, setUrutTransaksi 
} from "../../actions/master-action";


const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const useToolbarStyles = makeStyles(theme => ({
    actions: {
        color: theme.palette.text.secondary,
        display: 'flex',
        alignItems: 'center'
    },
    hideIconTambah: {
        display: 'none'
    },
    showIconTambah: {
        display: 'block',
        marginRight: 8
    },
    spacer: {
        flex: '1 1 100%',
    },
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),   
    },
    title: {
        flex: '0 0 auto',
        // marginTop: 16
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { changeRangeDate,  handleOpen, isProgress, rangeDate } = props;

    const dateFormat = 'DD-MM-YYYY';
    const customFormat = value => `${value.format(dateFormat)}`;


    return(
        <Toolbar
            className={classes.root}
        >           
            <div className={classes.title}>
                <label>Periode :&nbsp;&nbsp;&nbsp;</label>
                <RangePicker 
                    defaultValue={rangeDate!==null?[moment(rangeDate[0]), moment(rangeDate[1])]:[null,null]}
                    format={customFormat}
                    style={{width: 220}}
                    popupStyle={{
                        zIndex: 2000
                    }}
                    placeholder={["tgl. awal", "tgl. akhir"]}
                    onChange={changeRangeDate}
                    disabled={isProgress}
                    allowClear={false}
                />
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="tambah" className={classes.showIconTambah}>
                    <IconButton 
                        aria-label="add" 
                        onClick={isProgress===false?handleOpen:null}
                        disabled={isProgress}
                    >
                        <AddBoxOutlineIcon />
                    </IconButton>                             
                </Tooltip>   
            </div>            
        </Toolbar>
    );
};

const headRows = [
	{id: 'm.no', numerik: false, label: 'No.'},
    {id: 'm.tanggal', numerik: false, label: 'Tanggal'},
    {id: 'm.is_proyek', numerik: false, label: 'Transaksi'},
    {id: 'm.transaksi', numerik: false, label: 'Akun dan Nilai'},
    {id: 'act', numerik: false, label: 'Action'}
];

const EnhancedTableHead = (props) => {
    const { classes, orderBy, order, onRequestSort } = props;  
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return(
        <TableHead>
            <TableRow>
                {
                    headRows.map((headCell, index) => {
                        let page = null;
                        switch(index) {
                        	case 0:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'right'}
                                    style={{width: 40}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                            case 1:
                                    page = 
                                    <TableCell
                                        key={headCell.id}
                                        align={'left'}
                                        style={{width: 150}}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'desc'}
                                            onClick={createSortHandler(headCell.id)}
                                        >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <span className={classes.visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                </span>
                                            ) : null}
                                        </TableSortLabel>
                                    </TableCell>;
                                    break;
                            case 2:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    style={{width: 200}}
                                >
                                    <TableSortLabel
                                      active={orderBy === headCell.id}
                                      direction={orderBy === headCell.id ? order : 'desc'}
                                      onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                        {orderBy === headCell.id ? (
                                            <span className={classes.visuallyHidden}>
                                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </span>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>;
                                break;
                            case 3:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                            default:
                                page =
                                <TableCell
                                    key={headCell.id}
                                    align={'center'}
                                    style={{width: 100}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                        }
                        return(page);
                    })
                }
            </TableRow>
        </TableHead>
    );
};

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1200,
        marginTop: -20
    },
    tableWrapper: {
        overflowX: 'auto',
        marginTop: -20
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});

const mapStateToProps = store => {
    return {
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        listTransaksi: store.master.list_transaksi,
        filterTransaksi: store.master.filter_transaksi,
        paginationTransaksi: store.master.pagination_transaksi,
        urutTransaksi: store.master.urut_transaksi,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setItemTransaksiSelected: (url, headerAuthorization) => dispatch(setItemTransaksiSelected(url, headerAuthorization)),
        getTransaksi: (url, headerAuthorization) => dispatch(getTransaksi(url, headerAuthorization)),
        setFilterTransaksi: (value) => dispatch(setFilterTransaksi(value)),
        setPaginationTransaksi: (value) => dispatch(setPaginationTransaksi(value)),
        setUrutTransaksi: (value) => dispatch(setUrutTransaksi(value)),
        setModeTransaksiBaru: (nilai) => dispatch(setModeTransaksiBaru(nilai)),    
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class TableTransaksi extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusTransaksi: false,
        	openFormAddTransaksi: false,
        	mode: '',
            rentanDate: null,
            prefixSearch: null
        };

        this.itemTransaksi = {};
        this.formRef = React.createRef();
    }

    componentDidMount() {
    	const { filterTransaksi, setFilterTransaksi, paginationTransaksi, urutTransaksi } = this.props;

        let tmpFilter = null;
        if(filterTransaksi === null) {     
            this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]});      
            tmpFilter = [
                {field: 'rentan_tanggal', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
            ];
        }
        else {                        
            tmpFilter = [...filterTransaksi];
            let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal_persiapan'});
            if(idx < 0) {
                this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]});      
                tmpFilter = [];
                tmpFilter.push(
                    {
                        field: "rentan_tanggal",
                        rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]
                    }
                );
            }
            else {
                let tmpRentan = tmpFilter[idx];
                tmpFilter = [];
                tmpFilter.push(tmpRentan);
                this.setState({rentanDate: filterTransaksi[idx].rentan});
            }
        }
        
        setFilterTransaksi(tmpFilter);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
        this.loadTransaksi(tmpFilter, paginationTransaksi, urutTransaksi);
    }

    changeRangeDate = (dates, datesString) => {
        const { filterTransaksi, paginationTransaksi, setFilterTransaksi, setPaginationTransaksi, urutTransaksi } = this.props;
        let tmpPagination = {...paginationTransaksi};
        tmpPagination.current = 1;        
        setPaginationTransaksi(tmpPagination);

        let tmpRangeDate = [this.flipDate(datesString[0]), this.flipDate(datesString[1])];
        
        this.setState({rentanDate: tmpRangeDate});

        let tmpFilter = [...filterTransaksi];

        let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal'});

        if(idx < 0) {
            tmpFilter.push(
                {
                    field: "rentan_tanggal",
                    rentan: tmpRangeDate
                }
            );
        }
        else {
            tmpFilter[idx].rentan = tmpRangeDate;
        }       

        setFilterTransaksi(tmpFilter);
        this.loadTransaksi(tmpFilter, tmpPagination, urutTransaksi);
    }

    deleteTransaksi = (dataTransaksi) => {
        const { 
            filterTransaksi, headerAuthorization, paginationTransaksi, restfulServer, setIsProgress, urutTransaksi         
        } = this.props;

        setIsProgress(true);

        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/transaksi`,
            headers: {...headerAuthorization},
            params: dataTransaksi
        })
        .then((r) => {  
            setIsProgress(false);
            if(r.data.status === 200) {
                self.itemTransaksi = {};
                self.loadTransaksi(
                    filterTransaksi,
                    paginationTransaksi,
                    urutTransaksi
                );
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Berhasil hapus transaksi',
                    duration: 4,
                    placement: 'bottomRight'
                });
            }
            else {
                self.itemTransaksi.id = {};
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Gagal hapus transaksi',
                    duration: 4,
                    placement: 'bottomRight'
                });
            }
        })
        .catch((r) => { 
            setIsProgress(false);
            self.itemTransaksi = {};
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Gagal hapus transaksi',
                duration: 4,
                placement: 'bottomRight'
            });
        });
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleAddTransaksiBaru = () => {
        const { setItemMenuSelected, setModeTransaksiBaru } = this.props;
        setModeTransaksiBaru('add');
        setItemMenuSelected('Transaksi Baru');
    }

    handleChangeRowsPerPage = (event) => {
        const { filterTransaksi, setPaginationTransaksi, urutTransaksi } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationTransaksi(tmpPagination);
        this.loadTransaksi(filterTransaksi, tmpPagination, urutTransaksi);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleChangePage = (event, newPage) => {
        const { filterTransaksi, paginationTransaksi, setPaginationTransaksi, urutTransaksi } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationTransaksi.pageSize,
        };
        setPaginationTransaksi(tmpPagination);
        this.loadTransaksi(filterTransaksi, tmpPagination, urutTransaksi);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleDeleteTransaksi = (status) => {          
        this.setState({openConfirmasiHapusProyek: false});      
        if(status === true) {
            this.deleteTransaksi(this.itemTransaksi);
        }
    }

    loadTransaksi = (filter, pagination, urut) => {
        const { getTransaksi, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/transaksi?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;        
        }
        else {
            url = `${restfulServer}/master/transaksi?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;
        } 
        getTransaksi(url, headerAuthorization);
    }

    render() {
        const { classes, isProgress, listTransaksi, paginationTransaksi, urutTransaksi } = this.props;
		const { openConfirmasiHapusTransaksi, rentanDate } = this.state;

        let pageRender = null;
        pageRender =
		<div className={classes.root}>
            <EnhancedTableToolbar 
                handleOpen={this.handleAddTransaksiBaru}  
                rangeDate={rentanDate}
                changeRangeDate={this.changeRangeDate}
                isProgress={isProgress}
            />
            <TableContainer className={classes.tableWrapper}>

            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10,15,25,50,100,250,500,1000,10000]}
                component="div"
                count={listTransaksi !== null ? listTransaksi.total:0}
                rowsPerPage={paginationTransaksi.pageSize}
                page={paginationTransaksi.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <KonfirmasiDialog 
                open={openConfirmasiHapusTransaksi} 
                aksi={this.handleDeleteTransaksi} 
                message={`Hapus item transaksi`}
            />
        </div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableTransaksi));