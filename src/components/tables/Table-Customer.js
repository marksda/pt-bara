import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddCustomer from "../forms/Form-Add-Customer";
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
  

import { getBentukUsaha, getCustomer, setFilterCustomer, setPaginationCustomer, setUrutCustomer } from "../../actions/master-action";

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
    {id: 'm.alamat', numerik: false, label: 'Alamat'},  
    {id: 'm.telepone', numerik: false, label: 'Telepon'},  
    {id: 'm.email', numerik: false, label: 'E-mail'},  
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
                                    style={{width: 350}}
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
                            case 4:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    style={{width: 100}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                            case 5:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    style={{width: 100}}
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
        filterBentukUsaha: store.master.filter_bentuk_usaha,
        filterCustomer: store.master.filter_customer,
        headerAuthorization: store.credential.header_authorization,
        listCustomer: store.master.list_customer,
        paginationCustomer: store.master.pagination_customer,
        restfulServer: store.general.restful_domain,
        urutCustomer: store.master.urut_customer
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getBentukUsaha: (url, headerAuthorization) => dispatch(getBentukUsaha(url, headerAuthorization)),
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        setFilterCustomer: (value) => dispatch(setFilterCustomer(value)),
        setPaginationCustomer: (value) => dispatch(setPaginationCustomer(value)),
        setUrutCustomer: (value) => dispatch(setUrutCustomer(value))
    };
};

class TableCustomer extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusCustomer: false,
        	openFormAddCustomer: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemCustomer = {};
    }

    componentDidMount() {
    	const { filterBentukUsaha, filterCustomer, paginationCustomer, urutCustomer } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: 50,
        };
        let tmpUrut = {
        	field: "m.nama",
        	order: "asc"
        };
              
        this.loadCustomer(filterCustomer, paginationCustomer, urutCustomer);

        this.loadBentukUsaha(filterBentukUsaha, tmpPagination, tmpUrut);
    }

    deleteCustomer = (dataCustomer) => {
        const { 
            filterCustomer, headerAuthorization, paginationCustomer, resetCredential, 
            restfulServer, urutCustomer         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/customer`,
            headers: {...headerAuthorization},
            params: dataCustomer
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemCustomer.id = null;
                self.itemCustomer.nama = null;
                self.loadCustomer(
                    filterCustomer,
                    paginationCustomer,
                    urutCustomer
                );
            }
            else {
                self.itemCustomer.id = null;
                self.itemCustomer.nama = null;
            }
        })
        .catch((r) => { 
            self.itemCustomer.id = null;
            self.itemCustomer.nama = null;
            self.setState({openProcessingDialog: false});
            resetCredential();
        });
    }

    handleBtnDelete = (e) => {
        const { listCustomer } = this.props;
        this.itemCustomer = {..._.find(listCustomer.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusCustomer: true});
    }

    handleBtnEdit = (e) => {
        const { listCustomer } = this.props;
        this.itemCustomer = {..._.find(listCustomer.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.itemCustomer.nama = this.itemCustomer.nama.split(',')[0];
        this.setState({openFormAddCustomer: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationCustomer, setFilterCustomer, urutCustomer, setPaginationCustomer } = this.props;
        let tmpPagination = {...paginationCustomer};
        tmpPagination.current = 1;        
        setPaginationCustomer(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterCustomer(tmpFilter);
        this.loadCustomer(tmpFilter, tmpPagination, urutCustomer);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterCustomer, setPaginationCustomer, urutCustomer } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationCustomer(tmpPagination);
        this.loadCustomer(filterCustomer, tmpPagination, urutCustomer);
    }

    handleChangePage = (event, newPage) => {
        const { filterCustomer, paginationCustomer, setPaginationCustomer, urutCustomer } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationCustomer.pageSize,
        };
        setPaginationCustomer(tmpPagination);
        this.loadCustomer(filterCustomer, tmpPagination, urutCustomer);
    }

    handleCloseFormAddCustomer = () => {
        this.setState({openFormAddCustomer: false});
    }

    handleDeleteCustomer = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusCustomer: false, openProcessingDialog: true});
            this.deleteCustomer(this.itemCustomer);
        }
        else {
            this.setState({openConfirmasiHapusCustomer: false});
        }
    }

    handleOpenFormAddCustomer = () => {
        this.setState({openFormAddCustomer: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterCustomer, paginationCustomer, setUrutCustomer, urutCustomer } = this.props;
        let isAsc = urutCustomer.field === property && urutCustomer.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutCustomer(tmpUrut);
        this.loadCustomer(filterCustomer, paginationCustomer, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadBentukUsaha = (filter, pagination, urut) => {
        const { getBentukUsaha, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/bentuk_usaha?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getBentukUsaha(url, headerAuthorization);
    }

    loadCustomer = (filter, pagination, urut) => {
        const { getCustomer, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/customer?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getCustomer(url, headerAuthorization);
    }

    render() {
        const { classes, listCustomer, paginationCustomer, title, urutCustomer } = this.props;
		const { openConfirmasiHapusCustomer, openFormAddCustomer, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddCustomer === true) {
            pageAdd = 
             <FormAddCustomer 
                data={this.itemCustomer}
                visible={openFormAddCustomer} 
                handleClose={this.handleCloseFormAddCustomer}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddCustomer}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tablecustomer">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutCustomer.order}
                        orderBy={urutCustomer.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listCustomer !== null ? listCustomer.data.map((row, index) => {
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
	                                    {(paginationCustomer.current-1)*paginationCustomer.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 80, verticalAlign: 'top'}}
	                                >
	                                    { row.id }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 350, verticalAlign: 'top'}}
	                                >
	                                    { row.nama }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top'}}
	                                >
	                                    { row.alamat }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.telepone }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.email }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 100, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleOpenFormAddCustomer}/>
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
                count={listCustomer !== null ? listCustomer.total:0}
                rowsPerPage={paginationCustomer.pageSize}
                page={paginationCustomer.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusCustomer} 
                aksi={this.handleDeleteCustomer} 
                message={`Hapus item ${this.itemCustomer.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableCustomer));

