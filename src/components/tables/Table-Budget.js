import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
// import FormAddBudget from "../forms/Form-Add-Budget";
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
  

import { getBudget, setFilterBudget, setItemMenuSelected, setItemBudgetSelected, setModeBudgetBaru, setPaginationBudget, setUrutBudget, setStatusBudgetSelected } from "../../actions/master-action";

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
    {id: 'm.nama_budget', numerik: false, label: 'Budget'},
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
        filterBudget: store.master.filter_budget,
        headerAuthorization: store.credential.header_authorization,
        listBudget: store.master.list_budget,
        paginationBudget: store.master.pagination_budget,
        restfulServer: store.general.restful_domain,
        urutBudget: store.master.urut_budget
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setItemBudgetSelected: (url, headerAuthorization) => dispatch(setItemBudgetSelected(url, headerAuthorization)),
        getBudget: (url, headerAuthorization) => dispatch(getBudget(url, headerAuthorization)),
        setFilterBudget: (value) => dispatch(setFilterBudget(value)),
        setPaginationBudget: (value) => dispatch(setPaginationBudget(value)),
        setUrutBudget: (value) => dispatch(setUrutBudget(value)),
        setModeBudgetBaru: (nilai) => dispatch(setModeBudgetBaru(nilai)),    
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setStatusBudgetSelected: (nilai) => dispatch(setStatusBudgetSelected(nilai)), 
    };
};

class TableBudget extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusBudget: false,
        	openFormAddBudget: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemBudget = {};
    }

    componentDidMount() {
    	const { filterBudget, paginationBudget, urutBudget } = this.props;
        this.loadBudget(filterBudget, paginationBudget, urutBudget);
    }

    deleteBudget = (dataBudget) => {
        const { 
            filterBudget, headerAuthorization, paginationBudget, restfulServer, urutBudget         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/budget`,
            headers: {...headerAuthorization},
            params: dataBudget
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemBudget.id = null;
                self.itemBudget.nama = null;
                self.loadBudget(
                    filterBudget,
                    paginationBudget,
                    urutBudget
                );
            }
            else {
                self.itemBudget.id = null;
                self.itemBudget.nama = null;
            }
        })
        .catch((r) => { 
            self.itemBudget.id = null;
            self.itemBudget.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleBtnDelete = (e) => {
        const { listBudget } = this.props;
        this.itemBudget = {..._.find(listBudget.data, function(o) { return o.no_job === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusBudget: true});
    }

    handleChangeFilter = (v) => {
        const { paginationBudget, setFilterBudget, urutBudget, setPaginationBudget } = this.props;
        let tmpPagination = {...paginationBudget};
        tmpPagination.current = 1;        
        setPaginationBudget(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterBudget(tmpFilter);
        this.loadBudget(tmpFilter, tmpPagination, urutBudget);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterBudget, setPaginationBudget, urutBudget } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationBudget(tmpPagination);
        this.loadBudget(filterBudget, tmpPagination, urutBudget);
    }

    handleChangePage = (event, newPage) => {
        const { filterBudget, paginationBudget, setPaginationBudget, urutBudget } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationBudget.pageSize,
        };
        setPaginationBudget(tmpPagination);
        this.loadBudget(filterBudget, tmpPagination, urutBudget);
    }

    handleCloseFormAddBudget = () => {
        this.setState({openFormAddBudget: false});
    }

    handleDeleteBudget = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusBudget: false, openProcessingDialog: true});
            this.deleteBudget(this.itemBudget);
        }
        else {
            this.setState({openConfirmasiHapusBudget: false});
        }
    }

    handleOpenFormAddBudget = () => {
        this.setState({openFormAddBudget: true, mode: 'add'});
    }

    handleAddBudgetBaru = () => {
        const { setItemMenuSelected, setModeBudgetBaru } = this.props;
        setModeBudgetBaru('add');
        setItemMenuSelected('Budget Baru');
    }

    handleEditBudgetBaru = (e) => {
        const { headerAuthorization, setItemMenuSelected, setItemBudgetSelected, setModeBudgetBaru, restfulServer, setStatusBudgetSelected } = this.props;
        setItemBudgetSelected(`${restfulServer}/master/detailbudget?no_job=${e.currentTarget.dataset.id}`, headerAuthorization);
        
        setStatusBudgetSelected(e.currentTarget.dataset.status);
        setModeBudgetBaru('edit');
        setItemMenuSelected('Budget Baru');
    }

    handleRequestSort = (event, property) => {   
        const { filterBudget, paginationBudget, setUrutBudget, urutBudget } = this.props;
        let isAsc = urutBudget.field === property && urutBudget.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutBudget(tmpUrut);
        this.loadBudget(filterBudget, paginationBudget, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadBudget = (filter, pagination, urut) => {
        const { getBudget, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/budget?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getBudget(url, headerAuthorization);
    }

    render() {
        const { classes, listBudget, paginationBudget, title, urutBudget } = this.props;
		const { openConfirmasiHapusBudget, openProcessingDialog } = this.state;

        let pageRender = null;

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleAddBudgetBaru}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="table-budget">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutBudget.order}
                        orderBy={urutBudget.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listBudget !== null ? listBudget.data.map((row, index) => {
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
	                                    {(paginationBudget.current-1)*paginationBudget.pageSize+index+1}.
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
	                                    { row.nama_budget }
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
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleAddBudgetBaru}/>
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-id={row.no_job} onClick={this.handleEditBudgetBaru} data-status={row.id_status_budget} />
                                        <DeleteOutlined style={{ fontSize: '18px', cursor: 'pointer' }} data-id={row.no_job} onClick={this.handleBtnDelete}/>
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
                count={listBudget !== null ? listBudget.total:0}
                rowsPerPage={paginationBudget.pageSize}
                page={paginationBudget.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusBudget} 
                aksi={this.handleDeleteBudget} 
                message={`Hapus item budget dengan No. Job: ${this.itemBudget.no_job}`}
            />
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableBudget));

