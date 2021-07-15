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
  

import { getProyek, setFilterProyek, setIsProgress, setItemMenuSelected, setItemProyekSelected, setModeProyekBaru, setPaginationProyek, setUrutProyek, setStatusProyekSelected } from "../../actions/master-action";

import { connect } from "react-redux";

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
    const { acuan, changeRangeDate, handleChangePrefixSearch, handleOpen, handleCari, isProgress, prefixSearch, rangeDate } = props;

    const dateFormat = 'DD-MM-YYYY';
    const customFormat = value => `${value.format(dateFormat)}`;

    const selectBefore = (
        <Select 
            defaultValue={prefixSearch!==null?prefixSearch:'m.no_job'} 
            dropdownStyle={{zIndex: 2000}}
            onChange={handleChangePrefixSearch}
            disabled={isProgress}
        >
          <Option value="m.no_job">No. Job</Option>
          <Option value="c.nama">Customer</Option>
          <Option value="m.nama_proyek">Proyek</Option>
        </Select>
    );

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
                <Form ref={acuan} style={{marginTop: 24, marginLeft: 8}}>
                    <Form.Item name="cari">
                        <Search
                            placeholder="pencarian"
                            onSearch={handleCari}
                            style={{ width: 450 }}
                            disabled={isProgress}
                            addonBefore={selectBefore}
                        />
                    </Form.Item>
                </Form>                
            </div>            
        </Toolbar>
    );
};

const headRows = [
	{id: 'm.no', numerik: false, label: 'No.'},
    {id: 'm.tanggal_persiapan', numerik: false, label: 'Tgl. persiapan'},
    {id: 'm.no_job', numerik: false, label: 'No. job'},
    {id: 'c.nama', numerik: false, label: 'Customer'},
    {id: 'm.nama_proyek', numerik: false, label: 'Proyek'},
    {id: 'm.id_status_proyek', numerik: false, label: 'Status'},
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
                            case 3:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
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
                                    style={{width: 300}}
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
        filterProyek: store.master.filter_proyek,
        headerAuthorization: store.credential.header_authorization,
        listProyek: store.master.list_proyek,
        paginationProyek: store.master.pagination_proyek,
        restfulServer: store.general.restful_domain,
        urutProyek: store.master.urut_proyek,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
        getProyek: (url, headerAuthorization) => dispatch(getProyek(url, headerAuthorization)),
        setFilterProyek: (value) => dispatch(setFilterProyek(value)),
        setPaginationProyek: (value) => dispatch(setPaginationProyek(value)),
        setUrutProyek: (value) => dispatch(setUrutProyek(value)),
        setModeProyekBaru: (nilai) => dispatch(setModeProyekBaru(nilai)),    
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setStatusProyekSelected: (nilai) => dispatch(setStatusProyekSelected(nilai)), 
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class TableProyek extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusProyek: false,
        	openFormAddProyek: false,
        	mode: '',
            rentanDate: null,
            prefixSearch: null
        };

        this.itemProyek = {};
        this.formRef = React.createRef();
    }

    componentDidMount() {
    	const { filterProyek, setFilterProyek, paginationProyek, urutProyek } = this.props;

        let tmpFilter = null;
        if(filterProyek === null) {     
            this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`], prefixSearch: 'm.no_job'});      
            tmpFilter = [
                {field: 'rentan_tanggal_persiapan', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
            ];
        }
        else {                        
            tmpFilter = [...filterProyek];
            let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal_persiapan'});
            if(idx < 0) {
                this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`], prefixSearch: filterProyek[0].field});      
                tmpFilter = [];
                tmpFilter.push(
                    {
                        field: "rentan_tanggal_persiapan",
                        rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]
                    }
                );
            }
            else {
                let tmpRentan = tmpFilter[idx];
                tmpFilter = [];
                tmpFilter.push(tmpRentan);
                this.setState({rentanDate: filterProyek[idx].rentan, prefixSearch: idx!==0?filterProyek[0].field:'m.no_job'});
            }
        }         

        
        setFilterProyek(tmpFilter);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
        this.loadProyek(tmpFilter, paginationProyek, urutProyek);
    }

    componentWillUnmount() {
        const { setFilterProyek } = this.props;
        setFilterProyek(null);
    }

    changeRangeDate = (dates, datesString) => {
        const { filterProyek, paginationProyek, setFilterProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);

        let tmpRangeDate = [this.flipDate(datesString[0]), this.flipDate(datesString[1])];
        
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

    deleteProyek = (dataProyek) => {
        const { 
            filterProyek, headerAuthorization, paginationProyek, restfulServer, setIsProgress, urutProyek         
        } = this.props;

        setIsProgress(true);

        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/proyek`,
            headers: {...headerAuthorization},
            params: dataProyek
        })
        .then((r) => {  
            setIsProgress(false);
            if(r.data.status === 200) {
                self.itemProyek = {};
                self.loadProyek(
                    filterProyek,
                    paginationProyek,
                    urutProyek
                );
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Berhasil hapus proyek',
                    duration: 4,
                    placement: 'bottomRight'
                });
            }
            else {
                self.itemProyek.id = {};
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'Gagal hapus proyek',
                    duration: 4,
                    placement: 'bottomRight'
                });
            }
        })
        .catch((r) => { 
            setIsProgress(false);
            self.itemProyek = {};
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'Gagal hapus proyek',
                duration: 4,
                placement: 'bottomRight'
            });
        });
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleBtnDelete = (e) => {
        const { listProyek } = this.props;
        this.itemProyek = {..._.find(listProyek.data, function(o) { return o.no_job === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusProyek: true});
    }

    handleChangeFilter = (v) => {
        const { filterProyek, paginationProyek, setFilterProyek, urutProyek, setPaginationProyek } = this.props;
        const { prefixSearch } = this.state;

        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);
        let tmpFilter = [];
        let idx = null;

        switch (prefixSearch) {
            case 'm.no_job':
                tmpFilter = [...filterProyek];
                idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.no_job'});

                if(idx < 0) {
                    let tmpRangeDate = _.find(tmpFilter, function(o){return o.field === 'rentan_tanggal_persiapan'});
                    tmpFilter = [];
                    tmpFilter.push(                        
                        { field: "m.no_job", search: v },
                        tmpRangeDate
                    );
                }
                else {
                    tmpFilter[idx].search = v;
                } 
                break;
            case 'c.nama':
                tmpFilter = [...filterProyek];
                idx = _.findIndex(tmpFilter, function(o){return o.field === 'c.nama'});

                if(idx < 0) {
                    let tmpRangeDate = _.find(tmpFilter, function(o){return o.field === 'rentan_tanggal_persiapan'});
                    tmpFilter = [];
                    tmpFilter.push(                        
                        { field: "c.nama", search: v },
                        tmpRangeDate
                    );
                }
                else {
                    tmpFilter[idx].search = v;
                }  
                break;
            default:
                tmpFilter = [...filterProyek];
                idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.nama_proyek'});

                if(idx < 0) {
                    let tmpRangeDate = _.find(tmpFilter, function(o){return o.field === 'rentan_tanggal_persiapan'});
                    tmpFilter = [];
                    tmpFilter.push(
                        { field: "m.nama_proyek", search: v },
                        tmpRangeDate
                    );
                }
                else {
                    tmpFilter[idx].search = v;
                }  
                
                break;
        }    

        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationProyek(tmpPagination);
        this.loadProyek(filterProyek, tmpPagination, urutProyek);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleChangePage = (event, newPage) => {
        const { filterProyek, paginationProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationProyek.pageSize,
        };
        setPaginationProyek(tmpPagination);
        this.loadProyek(filterProyek, tmpPagination, urutProyek);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleChangePrefixSearch = (value) => {
        const { filterProyek, paginationProyek, setFilterProyek, urutProyek, setPaginationProyek } = this.props;
        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);         
        setTimeout(() => {
            this.formRef.current.resetFields();
            this.formRef.current.getFieldInstance('cari').focus();
        }, 100);
        this.setState({prefixSearch: value});     

        let tmpFilter = [];
        let tmpRentan = _.find(filterProyek, function(o){return o.field === 'rentan_tanggal_persiapan'});
        tmpFilter.push(tmpRentan);

        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);  
    }

    handleCloseFormAddProyek = () => {
        this.setState({openFormAddProyek: false});
    }

    handleDeleteProyek = (status) => {          
        this.setState({openConfirmasiHapusProyek: false});      
        if(status === true) {
            this.deleteProyek(this.itemProyek);
        }
    }

    handleOpenFormAddProyek = () => {
        this.setState({openFormAddProyek: true, mode: 'add'});
    }

    handleAddProyekBaru = () => {
        const { setItemMenuSelected, setModeProyekBaru } = this.props;
        setModeProyekBaru('add');
        setItemMenuSelected('Proyek Baru');
    }

    handleEditProyekBaru = (e) => {
        const { headerAuthorization, setItemMenuSelected, setItemProyekSelected, setModeProyekBaru, restfulServer, setStatusProyekSelected } = this.props;
        setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${e.currentTarget.dataset.id}`, headerAuthorization);        
        setStatusProyekSelected(e.currentTarget.dataset.status);
        setModeProyekBaru('edit');
        setItemMenuSelected('Proyek Baru');
    }

    handleRequestSort = (event, property) => {   
        const { filterProyek, paginationProyek, setUrutProyek, urutProyek } = this.props;
        let isAsc = urutProyek.field === property && urutProyek.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutProyek(tmpUrut);
        this.loadProyek(filterProyek, paginationProyek, tmpUrut);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
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
        const { classes, isProgress, listProyek, paginationProyek, urutProyek } = this.props;
		const { openConfirmasiHapusProyek, openProcessingDialog, prefixSearch, rentanDate } = this.state;

        let pageRender = null;

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleAddProyekBaru}  
                rangeDate={rentanDate}
                changeRangeDate={this.changeRangeDate}
                handleCari={this.handleChangeFilter}
                acuan={this.formRef}
                isProgress={isProgress}
                prefixSearch={prefixSearch}
                handleChangePrefixSearch={this.handleChangePrefixSearch}
                key={rentanDate}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="table-proyek">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutProyek.order}
                        orderBy={urutProyek.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listProyek !== null ? listProyek.data.map((row, index) => {
                    		return(
                    			<TableRow 
	                                hover
	                                tabIndex={-1}
	                                key={row.no_job}      
	                            >
	                            	<TableCell 
	                                    align={'right'}
	                                    style={{minWidth: 40, verticalAlign: 'top'}}
	                                >
	                                    {(paginationProyek.current-1)*paginationProyek.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 150, verticalAlign: 'top'}}
	                                >
	                                    { 
                                            this.flipDate(row.tanggal_persiapan)                                      
                                        }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{width: 150, verticalAlign: 'top'}}
	                                >
	                                    { row.no_job }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top'}}
	                                >
	                                    { row.nama_customer }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 300, verticalAlign: 'top'}}
	                                >
	                                    { row.nama_proyek }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 150, verticalAlign: 'top'}}
	                                >
	                                    { row.status }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 100, verticalAlign: 'top', cursor: isProgress===false?'pointer':'default'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined 
                                            style={{ fontSize: '18px', marginRight: 4}} 
                                            onClick={isProgress===false?this.handleAddProyekBaru:null}
                                        />
                                        <EditOutlined 
                                            style={{ fontSize: '18px', marginRight: 4}} 
                                            data-id={row.no_job} 
                                            onClick={isProgress===false?this.handleEditProyekBaru:null} 
                                            data-status={row.id_status_proyek} 
                                        />
                                        <DeleteOutlined 
                                            style={{ fontSize: '18px' }} 
                                            data-id={row.no_job} 
                                            onClick={isProgress===false?this.handleBtnDelete:null}
                                        />
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
                count={listProyek !== null ? listProyek.total:0}
                rowsPerPage={paginationProyek.pageSize}
                page={paginationProyek.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <KonfirmasiDialog 
                open={openConfirmasiHapusProyek} 
                aksi={this.handleDeleteProyek} 
                message={`Hapus item proyek dengan No. Job: ${this.itemProyek.no_job}`}
            />
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableProyek));

