import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
// import FormAddProyek from "../forms/Form-Add-Proyek";
import IconButton from '@material-ui/core/IconButton';
import KonfirmasiDialog from "../dialogs/Konfirmasi-Dialog";
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

import { Input, Typography } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';
  

import { getProyek, setFilterProyek, setPaginationProyek, setUrutProyek } from "../../actions/master-action";

import { connect } from "react-redux";

const { Title } = Typography;
const { Search } = Input;

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
        marginTop: 16
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { handleOpen, title, handleCari } = props;

    return(
        <Toolbar
            className={classes.root}
        >           
            <div className={classes.title}>
                <Title level={4}>
                    {title}
                </Title>
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
                <Search
                  placeholder="pencarian"
                  onSearch={handleCari}
                  style={{ width: 250 }}
                />
            </div>            
        </Toolbar>
    );
};

const headRows = [
	{id: 'm.no', numerik: false, label: 'No.'},
    {id: 'm.tanggal_persiapan', numerik: false, label: 'Tgl. persiapan'},
    {id: 'm.no_job', numerik: false, label: 'No. job'},
    {id: 'm.nama_customer', numerik: false, label: 'Customer'},
    {id: 'm.nama_proyek', numerik: false, label: 'Proyek'},
    {id: 'm.status', numerik: false, label: 'Status'},
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
        urutProyek: store.master.urut_proyek
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getProyek: (url, headerAuthorization) => dispatch(getProyek(url, headerAuthorization)),
        setFilterProyek: (value) => dispatch(setFilterProyek(value)),
        setPaginationProyek: (value) => dispatch(setPaginationProyek(value)),
        setUrutProyek: (value) => dispatch(setUrutProyek(value))
    };
};

class TableProyek extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusProyek: false,
        	openFormAddProyek: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemProyek = {};
    }

    componentDidMount() {
    	const { filterProyek, paginationProyek, urutProyek } = this.props;
        this.loadProyek(filterProyek, paginationProyek, urutProyek);
    }

    deleteProyek = (dataProyek) => {
        const { 
            filterProyek, headerAuthorization, paginationProyek, restfulServer, urutProyek         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/proyek`,
            headers: {...headerAuthorization},
            params: dataProyek
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemProyek.id = null;
                self.itemProyek.nama = null;
                self.loadProyek(
                    filterProyek,
                    paginationProyek,
                    urutProyek
                );
            }
            else {
                self.itemProyek.id = null;
                self.itemProyek.nama = null;
            }
        })
        .catch((r) => { 
            self.itemProyek.id = null;
            self.itemProyek.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleBtnDelete = (e) => {
        const { listProyek } = this.props;
        this.itemProyek = {..._.find(listProyek.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusProyek: true});
    }

    handleBtnEdit = (e) => {
        const { listProyek } = this.props;
        this.itemProyek = {..._.find(listProyek.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openFormAddProyek: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationProyek, setFilterProyek, urutProyek, setPaginationProyek } = this.props;
        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationProyek(tmpPagination);
        this.loadProyek(filterProyek, tmpPagination, urutProyek);
    }

    handleChangePage = (event, newPage) => {
        const { filterProyek, paginationProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationProyek.pageSize,
        };
        setPaginationProyek(tmpPagination);
        this.loadProyek(filterProyek, tmpPagination, urutProyek);
    }

    handleCloseFormAddProyek = () => {
        this.setState({openFormAddProyek: false});
    }

    handleDeleteProyek = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusProyek: false, openProcessingDialog: true});
            this.deleteProyek(this.itemProyek);
        }
        else {
            this.setState({openConfirmasiHapusProyek: false});
        }
    }

    handleOpenFormAddProyek = () => {
        this.setState({openFormAddProyek: true, mode: 'add'});
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
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadProyek = (filter, pagination, urut) => {
        const { getProyek, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/proyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getProyek(url, headerAuthorization);
    }

    render() {
        const { handleAddProyekBaru, handleEditProyekBaru, classes, listProyek, paginationProyek, title, urutProyek } = this.props;
		const { openConfirmasiHapusProyek, openProcessingDialog } = this.state;

        let pageRender = null;

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={handleAddProyekBaru}  
                title={title}
                handleCari={this.handleChangeFilter}
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
                                        style={{width: 100, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={handleAddProyekBaru}/>
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-id={row.no_job} onClick={handleEditProyekBaru} />
                                        <DeleteOutlined style={{ fontSize: '18px', cursor: 'pointer' }} data-id={row.id} onClick={this.handleBtnDelete}/>
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
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusProyek} 
                aksi={this.handleDeleteProyek} 
                message={`Hapus item ${this.itemProyek.nama}`}
            />
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableProyek));

