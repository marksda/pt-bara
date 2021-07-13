import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import KonfirmasiDialog from "../dialogs/Konfirmasi-Dialog";
import moment from 'moment';
import ProcessingDialog from '../dialogs/Processing-Dialog';
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

import { DatePicker, Form, Input, notification } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { 
    getPengajuan, setFilterPengajuan, setIsProgress, setItemMenuSelected, setItemPengajuanSelected, setModePengajuanBaru,
    setPaginationPengajuan, setUrutPengajuan 
} from "../../actions/master-action";

import { connect } from "react-redux";

const { Search } = Input;
const { RangePicker } = DatePicker;

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
    const { acuan, changeRangeDate, handleOpen, title, handleCari, rangeDate } = props;
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
                />
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="tambah" className={classes.showIconTambah}>
                    <IconButton 
                        aria-label="add" 
                        onClick={handleOpen}
                    >
                        <AddBoxOutlineIcon />
                    </IconButton>                             
                </Tooltip>                
                <Form ref={acuan} style={{marginTop: 24, marginLeft: 8}}>
                    <Form.Item name="cari">
                        <Search
                        placeholder="cari no. pengajuan"
                        onSearch={handleCari}
                        style={{ width: 250 }}
                        />
                    </Form.Item>
                </Form>                
            </div>          
        </Toolbar>
    );
};

const headRows = [
	{id: 'm.no', numerik: false, label: 'No.'},
    {id: 'm.tanggal', numerik: false, label: 'Tanggal'},
    {id: 'm.no_pengajuan', numerik: false, label: 'No. pengajuan'},
    {id: 'm.no_job', numerik: false, label: 'No. job'},
    {id: 'p.nama', numerik: false, label: 'Nama'},
    {id: 'm.nominal_Pengajuan', numerik: true, label: 'Nilai'},
    {id: 'm.deskripsi_pengajuan', numerik: false, label: 'Keterangan'},
    {id: 'm.id_status_pengajuan', numerik: false, label: 'Status'},
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
                                    style={{width: 100}}
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
                                    style={{width: 160}}
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
                                    style={{width: 130}}
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
                            case 4:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    style={{width: 250}}
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
                            case 5:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'right'}
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
                            case 6:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;  
                            case 7:
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
        filterPengajuan: store.master.filter_pengajuan,
        headerAuthorization: store.credential.header_authorization,
        listPengajuan: store.master.list_pengajuan,
        paginationPengajuan: store.master.pagination_pengajuan,
        restfulServer: store.general.restful_domain,
        urutPengajuan: store.master.urut_pengajuan
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setItemPengajuanSelected: (nilai) => dispatch(setItemPengajuanSelected(nilai)),
        getPengajuan: (url, headerAuthorization) => dispatch(getPengajuan(url, headerAuthorization)),
        setFilterPengajuan: (value) => dispatch(setFilterPengajuan(value)),
        setPaginationPengajuan: (value) => dispatch(setPaginationPengajuan(value)),
        setUrutPengajuan: (value) => dispatch(setUrutPengajuan(value)),  
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setModePengajuanBaru: (nilai) => dispatch(setModePengajuanBaru(nilai)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class TablePengajuan extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusPengajuan: false,
        	openFormAddPengajuan: false,
        	openProcessingDialog: false, 
            rentanDate: null
        };

        this.itemPengajuan = {};
        this.formRef = React.createRef();
    }

    componentDidMount() {
    	const { filterPengajuan, paginationPengajuan, setFilterPengajuan, urutPengajuan } = this.props;

        let tmpFilter = null;
        if(filterPengajuan === null) {     
            this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]});      
            tmpFilter = [
                {field: 'rentan_tanggal', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
            ];
        }
        else {                        
            tmpFilter = [...filterPengajuan];
            let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal'});
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
                this.setState({rentanDate: filterPengajuan[idx].rentan});
            }
        }
        
        setFilterPengajuan(tmpFilter);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
        this.loadPengajuan(tmpFilter, paginationPengajuan, urutPengajuan);
    }

    changeRangeDate = (dates, datesString) => {
        const { filterPengajuan, paginationPengajuan, setFilterPengajuan, setPaginationPengajuan, urutPengajuan } = this.props;
        let tmpPagination = {...paginationPengajuan};
        tmpPagination.current = 1;        
        setPaginationPengajuan(tmpPagination);

        let tmpRangeDate = [this.flipDate(datesString[0]), this.flipDate(datesString[1])];
        this.setState({rentanDate: tmpRangeDate});

        let tmpFilter = [...filterPengajuan];

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

        setFilterPengajuan(tmpFilter);
        this.loadPengajuan(tmpFilter, tmpPagination, urutPengajuan);

    }

    deletePengajuan = (dataPengajuan) => {
        const { 
            filterPengajuan, headerAuthorization, paginationPengajuan, restfulServer, setIsProgress, urutPengajuan         
        } = this.props;

        setIsProgress(true);

        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/pengajuan`,
            headers: {...headerAuthorization},
            params: dataPengajuan
        })
        .then((r) => {  
            setIsProgress(false);
            if(r.data.status === 200) {
                self.itemPengajuan = {};
                self.loadPengajuan(
                    filterPengajuan,
                    paginationPengajuan,
                    urutPengajuan
                );
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Berhasil hapus pengajuan',
                    duration: 4,
                    placement: 'bottomRight'
                });
            }
            else {
                self.itemPengajuan = {};
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Gagal hapus pengajuan',
                    duration: 4,
                    placement: 'bottomRight'
                });
            }
        })
        .catch((r) => { 
            setIsProgress(false);
            self.itemPengajuan = {};
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Gagal hapus pengajuan',
                duration: 4,
                placement: 'bottomRight'
            });
        });
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleAddPengajuanBaru = () => {
        const { setItemMenuSelected, setModePengajuanBaru } = this.props;
        setModePengajuanBaru('add');
        setItemMenuSelected('Pengajuan Baru');
    }

    handleBtnDelete = (e) => {
        const { listPengajuan } = this.props;
        this.itemPengajuan = {..._.find(listPengajuan.data, function(o) { return o.no_pengajuan === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusProyek: true});
    }

    handleChangeFilter = (v) => {
        const { filterPengajuan, paginationPengajuan, setFilterPengajuan, urutPengajuan, setPaginationPengajuan } = this.props;    
        
        let tmpFilter = [];
        let idx = _.findIndex(filterPengajuan, function(o){return o.field === 'm.no_pengajuan'});

        if(idx < 0) {
            let tmpRangeDate = _.find(filterPengajuan, function(o){return o.field === 'rentan_tanggal'});
            tmpFilter.push(                        
                { field: "m.no_pengajuan", search: v },
                tmpRangeDate
            );
        }
        else {
            tmpFilter = [...filterPengajuan];
            tmpFilter[idx].search = v;
        } 

        if(paginationPengajuan.current !== 1) {
            let tmpPagination = {...paginationPengajuan};
            tmpPagination.current = 1;   
            setPaginationPengajuan(tmpPagination);
            setFilterPengajuan(tmpFilter);
            this.loadPengajuan(tmpFilter, tmpPagination, urutPengajuan);
        }
        else {
            setFilterPengajuan(tmpFilter);
            this.loadPengajuan(tmpFilter, paginationPengajuan, urutPengajuan);
        }
        
        
    }

    handleChangeRowsPerPage = (event) => {
        // const { filterProyek, setPaginationProyek, urutProyek } = this.props;
        // let tmpPagination = {
        //     current: 1,
        //     pageSize: parseInt(event.target.value, 10),
        // };
        
        // setPaginationProyek(tmpPagination);
        // this.loadProyek(filterProyek, tmpPagination, urutProyek);
    }

    handleChangePage = (event, newPage) => {
        // const { filterProyek, paginationProyek, setPaginationProyek, urutProyek } = this.props;
        // let tmpPagination = {
        //     current: newPage+1,
        //     pageSize: paginationProyek.pageSize,
        // };
        // setPaginationProyek(tmpPagination);
        // this.loadProyek(filterProyek, tmpPagination, urutProyek);
    }

    handleDeletePengajuan = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusPengajuan: false});
            this.deletePengajuan(this.itemPengajuan);
        }
        else {
            this.setState({openConfirmasiHapusPengajuan: false});
        }
    }

    handleEditPengajuanBaru = (e) => {
        const { listPengajuan, setItemMenuSelected, setItemPengajuanSelected, setModePengajuanBaru } = this.props;
        let tmp = listPengajuan.data[Number(e.currentTarget.dataset.id)];
        setItemPengajuanSelected(tmp);        
        setModePengajuanBaru('edit');
        setItemMenuSelected('Pengajuan Baru');
    }

    handleRequestSort = (event, property) => {   
        const { filterPengajuan, paginationPengajuan, setUrutPengajuan, urutPengajuan } = this.props;
        let isAsc = urutPengajuan.field === property && urutPengajuan.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutPengajuan(tmpUrut);
        this.loadPengajuan(filterPengajuan, paginationPengajuan, tmpUrut);
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
        const { classes, listPengajuan, paginationPengajuan, title, urutPengajuan } = this.props;
		const { openConfirmasiHapusPengajuan, openProcessingDialog, rentanDate } = this.state;

        let pageRender = null;

        pageRender =
		<div className={classes.root}>    
            <EnhancedTableToolbar 
                title={title}
                handleCari={this.handleChangeFilter}
                handleOpen={this.handleAddPengajuanBaru}
                rangeDate={rentanDate}
                changeRangeDate={this.changeRangeDate}
                acuan={this.formRef}
                key={rentanDate}
            />        
            <TableContainer className={classes.tableWrapper}>
                <Table aria-labelledby="table-pengajuan">
                    <EnhancedTableHead 
                        classes={classes}
                        order={urutPengajuan.order}
                        orderBy={urutPengajuan.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                        listPengajuan !== null ? listPengajuan.data.map((row, index) => {
                    		return(
                    			<TableRow 
	                                hover
	                                tabIndex={-1}
	                                key={row.no_pengajuan}      
	                            >
	                            	<TableCell 
	                                    align={'right'}
	                                    style={{minWidth: 40, verticalAlign: 'top'}}
	                                >
	                                    {(paginationPengajuan.current-1)*paginationPengajuan.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 100, verticalAlign: 'top'}}
	                                >
	                                    { 
                                            this.flipDate(row.tanggal)                                      
                                        }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{width: 160, verticalAlign: 'top'}}
	                                >
	                                    { row.no_pengajuan }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 130, verticalAlign: 'top'}}
	                                >
	                                    { row.no_job !== null ? row.no_job : '-' }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 250, verticalAlign: 'top'}}
	                                >
	                                    { row.nama }
	                                </TableCell>
                                    <TableCell 
	                                    align={'right'}
                                        style={{width: 200, verticalAlign: 'top'}}
	                                >
	                                    {new Intl.NumberFormat('id').format(row.nominal_pengajuan)}
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top'}}
	                                >
	                                    { row.deskripsi_pengajuan }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 150, verticalAlign: 'top'}}
	                                >
	                                    { row.status }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 100, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleAddPengajuanBaru}/>
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-id={index} onClick={this.handleEditPengajuanBaru} />
                                        <DeleteOutlined style={{ fontSize: '18px', cursor: 'pointer' }} data-id={row.no_pengajuan} onClick={this.handleBtnDelete}/>
                                    </TableCell>
	                            </TableRow>
                    		);
                    	}):null
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10,15,25,50,100,250,500,1000,10000]}
                component="div"
                count={listPengajuan !== null ? listPengajuan.total:0}
                rowsPerPage={paginationPengajuan.pageSize}
                page={paginationPengajuan.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <KonfirmasiDialog 
                open={openConfirmasiHapusPengajuan} 
                aksi={this.handleDeletePengajuan} 
                message={`Hapus item No. pengajuan: ${this.itemPengajuan.no_pengajuan}`}
            />
        </div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TablePengajuan));