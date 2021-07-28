import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddBudget from "../forms/Form-Add-Budget";
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
  

import { getBudget, setFilterBudget, setPaginationBudget, setUrutBudget } from "../../actions/master-action";

import { connect } from "react-redux";

const { Title } = Typography;

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
        marginTop: 8
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { handleOpen, title } = props;

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
            </div>            
        </Toolbar>
    );
};

const headRows = [
	{id: 'm.no', numerik: false, label: 'No.'},
    {id: 'm.nama', numerik: false, label: 'Nama'},
    {id: 'm.nilai', numerik: true, label: 'Nilai(Rp)'},
    {id: 'm.jumlah', numerik: true, label: 'Sub-Total(Rp)'},
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
                                    align={'right'}
                                    style={{width: 200}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                            case 3:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'right'}
                                    style={{width: 200}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;                                               
                            default:
                                page =
                                <TableCell
                                    key={headCell.id}
                                    align={'center'}
                                    style={{width: 120}}
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
        maxWidth: 900,
    },
    tableWrapper: {
        overflowX: 'auto',
        marginTop: -20,
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
        itemProyekSelected: store.master.item_proyek_selected,
        listBudget: store.master.list_budget,
        paginationBudget: store.master.pagination_budget,
        restfulServer: store.general.restful_domain,
        urutBudget: store.master.urut_budget
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getBudget: (url, headerAuthorization) => dispatch(getBudget(url, headerAuthorization)),
        setFilterBudget: (value) => dispatch(setFilterBudget(value)),
        setPaginationBudget: (value) => dispatch(setPaginationBudget(value)),
        setUrutBudget: (value) => dispatch(setUrutBudget(value)),
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
    	const { itemProyekSelected, paginationBudget, urutBudget, setFilterBudget } = this.props;
        let filter = [
            {field: 'm.no_job', nojob: itemProyekSelected.no_job}
        ];
        setFilterBudget(filter);
        this.loadBudget(filter, paginationBudget, urutBudget);
    }

    deleteBudget = (dataBudget) => {
        const { 
            filterBudget, getTotalBudget, headerAuthorization, paginationBudget, restfulServer, urutBudget         
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
                getTotalBudget();
                self.loadBudget(
                    filterBudget,
                    paginationBudget,
                    urutBudget
                );
            }
            self.itemBudget= {};
        })
        .catch((r) => { 
            self.itemBudget= {};
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listBudget } = this.props;
        this.itemBudget = {...listBudget.data[Number(e.currentTarget.dataset.id)]};
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
        const { getTotalBudget } = this.props;
        this.setState({openFormAddBudget: false});
        getTotalBudget();
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

    handleEditBudget = (e) => {
        const { listBudget } = this.props;
        this.itemBudget = {...listBudget.data[Number(e.currentTarget.dataset.id)]};
        this.setState({openFormAddBudget: true, mode: 'edit'});
    }

    handleOpenFormAddBudget = () => {
        this.setState({openFormAddBudget: true, mode: 'add'});
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
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/budget?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;        
        }
        else {
            url = `${restfulServer}/master/budget?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;
        } 
        getBudget(url, headerAuthorization);
    }

    render() {
        const { classes, listBudget, paginationBudget, title, urutBudget } = this.props;
		const { mode, openConfirmasiHapusBudget, openFormAddBudget, openProcessingDialog } = this.state;

        let pageRender = null;
        let pageAdd = null;

        if(openFormAddBudget === true) {
            pageAdd = 
             <FormAddBudget
                data={this.itemBudget}
                visible={openFormAddBudget} 
                handleClose={this.handleCloseFormAddBudget}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddBudget}  
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
	                                key={index}      
	                            >
	                            	<TableCell 
	                                    align={'right'}
	                                    style={{minWidth: 40, verticalAlign: 'top'}}
	                                >
	                                    {(paginationBudget.current-1)*paginationBudget.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 350, verticalAlign: 'top'}}
	                                >
	                                    { row.status_header === true? <b>{row.nama}</b>:<label style={{marginLeft: 16}}>{row.nama}</label>}
	                                </TableCell>
	                                <TableCell 
	                                    align={'right'}
                                        style={{width: 200, verticalAlign: 'top'}}
	                                >
	                                    { row.status_header===true?null:new Intl.NumberFormat('id').format(row.saldo)}
	                                </TableCell>
                                    <TableCell 
	                                    align={'right'}
                                        style={{width: 200, verticalAlign: 'top'}}
	                                >
	                                    { row.status_header===true?<b>{new Intl.NumberFormat('id').format(row.saldo)}</b>:null }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 120, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleOpenFormAddBudget}/>
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-id={index} onClick={this.handleEditBudget} />
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
                rowsPerPageOptions={[10,25,50,100,250,500,1000]}
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
                message={`Hapus item budget : ${this.itemBudget.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableBudget));

