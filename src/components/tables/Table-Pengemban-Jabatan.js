import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddPengembanJabatan from "../forms/Form-Add-Pengemban-Jabatan";
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
    EditOutlined
} from '@ant-design/icons';
  

import { getPengembanJabatan, setFilterPengembanJabatan, setPaginationPengembanJabatan, setUrutPengembanJabatan } from "../../actions/master-action";

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
    {id: 'm.nip_pegawai', numerik: false, label: 'Nip'},
    {id: 'p.nama', numerik: false, label: 'Nama'},
    {id: 'j.nama', numerik: false, label: 'Jabatan'},
    {id: 's.nama', numerik: false, label: 'Struktur organisasi'},
    {id: 'm.priode_start', numerik: false, label: 'Priode jabatan'},
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
                                        style={{width: 80}}
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
                            case 4:
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
                            case 5:
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
                            default:
                                page =
                                <TableCell
                                    key={headCell.id}
                                    align={'center'}
                                    style={{width: 80}}
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
        filterPengembanJabatan: store.master.filter_pengemban_jabatan,
        headerAuthorization: store.credential.header_authorization,
        listPengembanJabatan: store.master.list_pengemban_jabatan,
        paginationPengembanJabatan: store.master.pagination_pengemban_jabatan,
        restfulServer: store.general.restful_domain,
        urutPengembanJabatan: store.master.urut_pengemban_jabatan
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getPengembanJabatan: (url, headerAuthorization) => dispatch(getPengembanJabatan(url, headerAuthorization)),
        setFilterPengembanJabatan: (value) => dispatch(setFilterPengembanJabatan(value)),
        setPaginationPengembanJabatan: (value) => dispatch(setPaginationPengembanJabatan(value)),
        setUrutPengembanJabatan: (value) => dispatch(setUrutPengembanJabatan(value))
    };
};

class TablePengembanJabatan extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusPengembanJabatan: false,
        	openFormAddPengembanJabatan: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemPengembanJabatan = {};
    }

    componentDidMount() {
    	const { filterPengembanJabatan, paginationPengembanJabatan, urutPengembanJabatan } = this.props;
        this.loadPengembanJabatan(filterPengembanJabatan, paginationPengembanJabatan, urutPengembanJabatan);        
    }

    deletePengembanJabatan = (dataPengembanJabatan) => {
        const { 
            filterPengembanJabatan, headerAuthorization, paginationPengembanJabatan, restfulServer, urutPengembanJabatan         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/pengembanjabatan`,
            headers: {...headerAuthorization},
            params: dataPengembanJabatan
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemPengembanJabatan.id = null;
                self.itemPengembanJabatan.nama = null;
                self.loadPengembanJabatan(
                    filterPengembanJabatan,
                    paginationPengembanJabatan,
                    urutPengembanJabatan
                );
            }
            else {
                self.itemPengembanJabatan.id = null;
                self.itemPengembanJabatan.nama = null;
            }
        })
        .catch((r) => { 
            self.itemPengembanJabatan.id = null;
            self.itemPengembanJabatan.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listPengembanJabatan } = this.props;
        this.itemPengembanJabatan = {..._.find(listPengembanJabatan.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusPengembanJabatan: true});
    }

    handleBtnEdit = (e) => {
        const { listPengembanJabatan } = this.props;
        this.setState({openFormAddPengembanJabatan: true, mode: 'edit'});
        this.itemPengembanJabatan = {...listPengembanJabatan.data[Number(e.currentTarget.dataset.id)]};
        console.log(this.itemPengembanJabatan);
    }

    handleChangeFilter = (v) => {
        const { paginationPengembanJabatan, setFilterPengembanJabatan, urutPengembanJabatan, setPaginationPengembanJabatan } = this.props;
        let tmpPagination = {...paginationPengembanJabatan};
        tmpPagination.current = 1;        
        setPaginationPengembanJabatan(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterPengembanJabatan(tmpFilter);
        this.loadPengembanJabatan(tmpFilter, tmpPagination, urutPengembanJabatan);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterPengembanJabatan, setPaginationPengembanJabatan, urutPengembanJabatan } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationPengembanJabatan(tmpPagination);
        this.loadPengembanJabatan(filterPengembanJabatan, tmpPagination, urutPengembanJabatan);
    }

    handleChangePage = (event, newPage) => {
        const { filterPengembanJabatan, paginationPengembanJabatan, setPaginationPengembanJabatan, urutPengembanJabatan } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationPengembanJabatan.pageSize,
        };
        setPaginationPengembanJabatan(tmpPagination);
        this.loadPengembanJabatan(filterPengembanJabatan, tmpPagination, urutPengembanJabatan);
    }

    handleCloseFormAddPengembanJabatan = () => {
        this.setState({openFormAddPengembanJabatan: false});
    }

    handleDeletePengembanJabatan = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusPengembanJabatan: false, openProcessingDialog: true});
            this.deletePengembanJabatan(this.itemPengembanJabatan);
        }
        else {
            this.setState({openConfirmasiHapusPengembanJabatan: false});
        }
    }

    handleOpenFormAddPengembanJabatan = () => {
        this.setState({openFormAddPengembanJabatan: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterPengembanJabatan, paginationPengembanJabatan, setUrutPengembanJabatan, urutPengembanJabatan } = this.props;
        let isAsc = urutPengembanJabatan.field === property && urutPengembanJabatan.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutPengembanJabatan(tmpUrut);
        this.loadPengembanJabatan(filterPengembanJabatan, paginationPengembanJabatan, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadPengembanJabatan = (filter, pagination, urut) => {
        const { getPengembanJabatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pengembanjabatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPengembanJabatan(url, headerAuthorization);
    }

    render() {
        const { classes, listPengembanJabatan, paginationPengembanJabatan, title, urutPengembanJabatan } = this.props;
		const { openConfirmasiHapusPengembanJabatan, openFormAddPengembanJabatan, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddPengembanJabatan === true) {
            pageAdd = 
             <FormAddPengembanJabatan 
                data={this.itemPengembanJabatan}
                visible={openFormAddPengembanJabatan} 
                handleClose={this.handleCloseFormAddPengembanJabatan}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddPengembanJabatan}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tablePengembanJabatan">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutPengembanJabatan.order}
                        orderBy={urutPengembanJabatan.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listPengembanJabatan !== null ? listPengembanJabatan.data.map((row, index) => {
                    		return(
                    			<TableRow 
	                                hover
	                                tabIndex={-1}
	                                key={index}      
	                            >
	                            	<TableCell 
	                                    align={'right'}
	                                    style={{minWidth: 40, verticalAlign: 'top'}}
	                                >
	                                    {(paginationPengembanJabatan.current-1)*paginationPengembanJabatan.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 80, verticalAlign: 'top'}}
	                                >
	                                    { row.nip_pegawai }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top'}}
	                                >
	                                    { row.nama }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 200, verticalAlign: 'top'}}
	                                >
	                                    { row.nama_jabatan }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 200, verticalAlign: 'top'}}
	                                >
	                                    { row.nama_so }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 200, verticalAlign: 'top'}}
	                                >
	                                    { `${row.priode_start.toString()} - ${row.priode_end.toString()}` }
	                                </TableCell>
                                    <TableCell 
                                        style={{width: 80, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-id={index} onClick={this.handleBtnEdit} />
                                        <DeleteOutlined style={{ fontSize: '18px', cursor: 'pointer' }} data-id={index} onClick={this.handleBtnDelete}/>
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
                count={listPengembanJabatan !== null ? listPengembanJabatan.total:0}
                rowsPerPage={paginationPengembanJabatan.pageSize}
                page={paginationPengembanJabatan.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusPengembanJabatan} 
                aksi={this.handleDeletePengembanJabatan} 
                message={`Hapus item ${this.itemPengembanJabatan.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TablePengembanJabatan));

