import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddStrukturOrganisasi from "../forms/Form-Add-Struktur-Organisasi";
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
  

import { getStrukturOrganisasi, setFilterStrukturOrganisasi, setPaginationStrukturOrganisasi, setUrutStrukturOrganisasi } from "../../actions/master-action";

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
    {id: 'm.id', numerik: false, label: 'Id'},
    {id: 'm.nama', numerik: false, label: 'Nama'},
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
        width: '75%',
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
        filterStrukturOrganisasi: store.master.filter_struktur_organisasi,
        headerAuthorization: store.credential.header_authorization,
        listStrukturOrganisasi: store.master.list_struktur_organisasi,
        paginationStrukturOrganisasi: store.master.pagination_struktur_organisasi,
        restfulServer: store.general.restful_domain,
        urutStrukturOrganisasi: store.master.urut_struktur_organisasi
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getStrukturOrganisasi: (url, headerAuthorization) => dispatch(getStrukturOrganisasi(url, headerAuthorization)),
        setFilterStrukturOrganisasi: (value) => dispatch(setFilterStrukturOrganisasi(value)),
        setPaginationStrukturOrganisasi: (value) => dispatch(setPaginationStrukturOrganisasi(value)),
        setUrutStrukturOrganisasi: (value) => dispatch(setUrutStrukturOrganisasi(value))
    };
};

class TableStrukturOrganisasi extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusStrukturOrganisasi: false,
        	openFormAddStrukturOrganisasi: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemStrukturOrganisasi = {};
    }

    componentDidMount() {
    	const { filterStrukturOrganisasi, paginationStrukturOrganisasi, urutStrukturOrganisasi } = this.props;
        this.loadStrukturOrganisasi(filterStrukturOrganisasi, paginationStrukturOrganisasi, urutStrukturOrganisasi);
    }

    deleteStrukturOrganisasi = (dataStrukturOrganisasi) => {
        const { 
            filterStrukturOrganisasi, headerAuthorization, paginationStrukturOrganisasi, restfulServer, urutStrukturOrganisasi         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/strukturorganisasi`,
            headers: {...headerAuthorization},
            params: dataStrukturOrganisasi
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemStrukturOrganisasi.id = null;
                self.itemStrukturOrganisasi.nama = null;
                self.loadStrukturOrganisasi(
                    filterStrukturOrganisasi,
                    paginationStrukturOrganisasi,
                    urutStrukturOrganisasi
                );
            }
            else {
                self.itemStrukturOrganisasi.id = null;
                self.itemStrukturOrganisasi.nama = null;
            }
        })
        .catch((r) => { 
            self.itemStrukturOrganisasi.id = null;
            self.itemStrukturOrganisasi.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listStrukturOrganisasi } = this.props;
        this.itemStrukturOrganisasi = {..._.find(listStrukturOrganisasi.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusStrukturOrganisasi: true});
    }

    handleBtnEdit = (e) => {
        const { listStrukturOrganisasi } = this.props;
        this.itemStrukturOrganisasi = {..._.find(listStrukturOrganisasi.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.itemStrukturOrganisasi.nama = this.itemStrukturOrganisasi.nama.split(',')[0];
        this.setState({openFormAddStrukturOrganisasi: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationStrukturOrganisasi, setFilterStrukturOrganisasi, urutStrukturOrganisasi, setPaginationStrukturOrganisasi } = this.props;
        let tmpPagination = {...paginationStrukturOrganisasi};
        tmpPagination.current = 1;        
        setPaginationStrukturOrganisasi(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterStrukturOrganisasi(tmpFilter);
        this.loadStrukturOrganisasi(tmpFilter, tmpPagination, urutStrukturOrganisasi);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterStrukturOrganisasi, setPaginationStrukturOrganisasi, urutStrukturOrganisasi } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationStrukturOrganisasi(tmpPagination);
        this.loadStrukturOrganisasi(filterStrukturOrganisasi, tmpPagination, urutStrukturOrganisasi);
    }

    handleChangePage = (event, newPage) => {
        const { filterStrukturOrganisasi, paginationStrukturOrganisasi, setPaginationStrukturOrganisasi, urutStrukturOrganisasi } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationStrukturOrganisasi.pageSize,
        };
        setPaginationStrukturOrganisasi(tmpPagination);
        this.loadStrukturOrganisasi(filterStrukturOrganisasi, tmpPagination, urutStrukturOrganisasi);
    }

    handleCloseFormAddStrukturOrganisasi = () => {
        this.setState({openFormAddStrukturOrganisasi: false});
    }

    handleDeleteStrukturOrganisasi = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusStrukturOrganisasi: false, openProcessingDialog: true});
            this.deleteStrukturOrganisasi(this.itemStrukturOrganisasi);
        }
        else {
            this.setState({openConfirmasiHapusStrukturOrganisasi: false});
        }
    }

    handleOpenFormAddStrukturOrganisasi = () => {
        this.setState({openFormAddStrukturOrganisasi: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterStrukturOrganisasi, paginationStrukturOrganisasi, setUrutStrukturOrganisasi, urutStrukturOrganisasi } = this.props;
        let isAsc = urutStrukturOrganisasi.field === property && urutStrukturOrganisasi.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutStrukturOrganisasi(tmpUrut);
        this.loadStrukturOrganisasi(filterStrukturOrganisasi, paginationStrukturOrganisasi, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadStrukturOrganisasi = (filter, pagination, urut) => {
        const { getStrukturOrganisasi, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/strukturorganisasi?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getStrukturOrganisasi(url, headerAuthorization);
    }

    render() {
        const { classes, listStrukturOrganisasi, paginationStrukturOrganisasi, title, urutStrukturOrganisasi } = this.props;
		const { openConfirmasiHapusStrukturOrganisasi, openFormAddStrukturOrganisasi, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddStrukturOrganisasi === true) {
            pageAdd = 
             <FormAddStrukturOrganisasi 
                data={this.itemStrukturOrganisasi}
                visible={openFormAddStrukturOrganisasi} 
                handleClose={this.handleCloseFormAddStrukturOrganisasi}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddStrukturOrganisasi}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tableStrukturOrganisasi">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutStrukturOrganisasi.order}
                        orderBy={urutStrukturOrganisasi.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listStrukturOrganisasi !== null ? listStrukturOrganisasi.data.map((row, index) => {
                    		return(
                    			<TableRow 
	                                hover
	                                tabIndex={-1}
	                                key={row.id}      
	                            >
	                            	<TableCell 
	                                    align={'right'}
	                                    style={{minWidth: 40, verticalAlign: 'top'}}
	                                >
	                                    {(paginationStrukturOrganisasi.current-1)*paginationStrukturOrganisasi.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 80, verticalAlign: 'top'}}
	                                >
	                                    { row.id }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top'}}
	                                >
	                                    { row.nama }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 100, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleOpenFormAddStrukturOrganisasi}/>
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-id={row.id} onClick={this.handleBtnEdit} />
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
                count={listStrukturOrganisasi !== null ? listStrukturOrganisasi.total:0}
                rowsPerPage={paginationStrukturOrganisasi.pageSize}
                page={paginationStrukturOrganisasi.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusStrukturOrganisasi} 
                aksi={this.handleDeleteStrukturOrganisasi} 
                message={`Hapus item ${this.itemStrukturOrganisasi.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableStrukturOrganisasi));

