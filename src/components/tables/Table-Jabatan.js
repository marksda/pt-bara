import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddJabatan from "../forms/Form-Add-Jabatan";
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

import { Input, Skeleton, Typography } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
  

import { getJabatan, setFilterJabatan, setPaginationJabatan, setUrutJabatan } from "../../actions/master-action";

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
        filterJabatan: store.master.filter_jabatan,
        headerAuthorization: store.credential.header_authorization,
        listJabatan: store.master.list_jabatan,
        paginationJabatan: store.master.pagination_jabatan,
        restfulServer: store.general.restful_domain,
        urutJabatan: store.master.urut_jabatan
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getJabatan: (url, headerAuthorization) => dispatch(getJabatan(url, headerAuthorization)),
        setFilterJabatan: (value) => dispatch(setFilterJabatan(value)),
        setPaginationJabatan: (value) => dispatch(setPaginationJabatan(value)),
        setUrutJabatan: (value) => dispatch(setUrutJabatan(value))
    };
};

class TableJabatan extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusJabatan: false,
        	openFormAddJabatan: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemJabatan = {};
    }

    componentDidMount() {
    	const { filterJabatan, paginationJabatan, urutJabatan } = this.props;
        this.loadJabatan(filterJabatan, paginationJabatan, urutJabatan);
    }

    deleteJabatan = (dataJabatan) => {
        const { 
            filterJabatan, headerAuthorization, paginationJabatan, restfulServer, urutJabatan         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/jabatan`,
            headers: {...headerAuthorization},
            params: dataJabatan
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemJabatan.id = null;
                self.itemJabatan.nama = null;
                self.loadJabatan(
                    filterJabatan,
                    paginationJabatan,
                    urutJabatan
                );
            }
            else {
                self.itemJabatan.id = null;
                self.itemJabatan.nama = null;
            }
        })
        .catch((r) => { 
            self.itemJabatan.id = null;
            self.itemJabatan.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listJabatan } = this.props;
        this.itemJabatan = {..._.find(listJabatan.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusJabatan: true});
    }

    handleBtnEdit = (e) => {
        const { listJabatan } = this.props;
        this.itemJabatan = {..._.find(listJabatan.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.itemJabatan.nama = this.itemJabatan.nama.split(',')[0];
        this.setState({openFormAddJabatan: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationJabatan, setFilterJabatan, urutJabatan, setPaginationJabatan } = this.props;
        let tmpPagination = {...paginationJabatan};
        tmpPagination.current = 1;        
        setPaginationJabatan(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterJabatan(tmpFilter);
        this.loadJabatan(tmpFilter, tmpPagination, urutJabatan);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterJabatan, setPaginationJabatan, urutJabatan } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationJabatan(tmpPagination);
        this.loadJabatan(filterJabatan, tmpPagination, urutJabatan);
    }

    handleChangePage = (event, newPage) => {
        const { filterJabatan, paginationJabatan, setPaginationJabatan, urutJabatan } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationJabatan.pageSize,
        };
        setPaginationJabatan(tmpPagination);
        this.loadJabatan(filterJabatan, tmpPagination, urutJabatan);
    }

    handleCloseFormAddJabatan = () => {
        this.setState({openFormAddJabatan: false});
    }

    handleDeleteJabatan = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusJabatan: false, openProcessingDialog: true});
            this.deleteJabatan(this.itemJabatan);
        }
        else {
            this.setState({openConfirmasiHapusJabatan: false});
        }
    }

    handleOpenFormAddJabatan = () => {
        this.setState({openFormAddJabatan: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterJabatan, paginationJabatan, setUrutJabatan, urutJabatan } = this.props;
        let isAsc = urutJabatan.field === property && urutJabatan.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutJabatan(tmpUrut);
        this.loadJabatan(filterJabatan, paginationJabatan, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadJabatan = (filter, pagination, urut) => {
        const { getJabatan, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/jabatan?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getJabatan(url, headerAuthorization);
    }

    render() {
        const { classes, listJabatan, paginationJabatan, title, urutJabatan } = this.props;
		const { openConfirmasiHapusJabatan, openFormAddJabatan, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddJabatan === true) {
            pageAdd = 
             <FormAddJabatan 
                data={this.itemJabatan}
                visible={openFormAddJabatan} 
                handleClose={this.handleCloseFormAddJabatan}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddJabatan}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tableJabatan">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutJabatan.order}
                        orderBy={urutJabatan.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listJabatan !== null ? listJabatan.data.map((row, index) => {
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
	                                    {(paginationJabatan.current-1)*paginationJabatan.pageSize+index+1}.
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
                                        style={{width: 80, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
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
                count={listJabatan !== null ? listJabatan.total:0}
                rowsPerPage={paginationJabatan.pageSize}
                page={paginationJabatan.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusJabatan} 
                aksi={this.handleDeleteJabatan} 
                message={`Hapus item ${this.itemJabatan.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableJabatan));

