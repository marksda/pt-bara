import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddAkun from "../forms/Form-Add-Akun";
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
  

import { getAkun, setFilterAkun, setPaginationAkun, setUrutAkun } from "../../actions/master-action";

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
        marginTop: 8
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
    {id: 'm.id', numerik: false, label: 'Kode'},
    {id: 'm.nama', numerik: false, label: 'Nama'},  
    {id: 'm.status_header', numerik: false, label: 'Header/Detail'}, 
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
                                        style={{width: 50}}
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
                                    style={{width: 400}}
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
        filterAkun: store.master.filter_akun,
        headerAuthorization: store.credential.header_authorization,
        listAkun: store.master.list_akun,
        paginationAkun: store.master.pagination_akun,
        restfulServer: store.general.restful_domain,
        urutAkun: store.master.urut_akun
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getAkun: (url, headerAuthorization) => dispatch(getAkun(url, headerAuthorization)),
        setFilterAkun: (value) => dispatch(setFilterAkun(value)),
        setPaginationAkun: (value) => dispatch(setPaginationAkun(value)),
        setUrutAkun: (value) => dispatch(setUrutAkun(value))
    };
};

class TableAkun extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusAkun: false,
        	openFormAddAkun: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemAkun = {};
    }

    componentDidMount() {
    	const { filterAkun, paginationAkun, urutAkun } = this.props;
              
        this.loadAkun(filterAkun, paginationAkun, urutAkun);
    }

    deleteAkun = (dataAkun) => {
        const { 
            filterAkun, headerAuthorization, paginationAkun, resetCredential, 
            restfulServer, urutAkun         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/akun`,
            headers: {...headerAuthorization},
            params: dataAkun
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemAkun.id = null;
                self.itemAkun.nama = null;
                self.loadAkun(
                    filterAkun,
                    paginationAkun,
                    urutAkun
                );
            }
            else {
                self.itemAkun.id = null;
                self.itemAkun.nama = null;
            }
        })
        .catch((r) => { 
            self.itemAkun.id = null;
            self.itemAkun.nama = null;
            self.setState({openProcessingDialog: false});
            resetCredential();
        });
    }

    handleBtnDelete = (e) => {
        const { listAkun } = this.props;
        this.itemAkun = {..._.find(listAkun.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusAkun: true});
    }

    handleBtnEdit = (e) => {
        const { listAkun } = this.props;
        this.itemAkun = {..._.find(listAkun.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.itemAkun.nama = this.itemAkun.nama.split(',')[0];
        this.setState({openFormAddAkun: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationAkun, setFilterAkun, urutAkun, setPaginationAkun } = this.props;
        let tmpPagination = {...paginationAkun};
        tmpPagination.current = 1;        
        setPaginationAkun(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterAkun(tmpFilter);
        this.loadAkun(tmpFilter, tmpPagination, urutAkun);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterAkun, setPaginationAkun, urutAkun } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationAkun(tmpPagination);
        this.loadAkun(filterAkun, tmpPagination, urutAkun);
    }

    handleChangePage = (event, newPage) => {
        const { filterAkun, paginationAkun, setPaginationAkun, urutAkun } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationAkun.pageSize,
        };
        setPaginationAkun(tmpPagination);
        this.loadAkun(filterAkun, tmpPagination, urutAkun);
    }

    handleCloseFormAddAkun = () => {
        this.setState({openFormAddAkun: false});
    }

    handleDeleteAkun = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusAkun: false, openProcessingDialog: true});
            this.deleteAkun(this.itemAkun);
        }
        else {
            this.setState({openConfirmasiHapusAkun: false});
        }
    }

    handleOpenFormAddAkun = () => {
        this.setState({openFormAddAkun: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterAkun, paginationAkun, setUrutAkun, urutAkun } = this.props;
        let isAsc = urutAkun.field === property && urutAkun.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutAkun(tmpUrut);
        this.loadAkun(filterAkun, paginationAkun, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadAkun = (filter, pagination, urut) => {
        const { getAkun, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/akun?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getAkun(url, headerAuthorization);
    }

    render() {
        const { classes, listAkun, paginationAkun, title, urutAkun } = this.props;
		const { openConfirmasiHapusAkun, openFormAddAkun, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddAkun === true) {
            pageAdd = 
             <FormAddAkun 
                data={this.itemAkun}
                visible={openFormAddAkun} 
                handleClose={this.handleCloseFormAddAkun}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddAkun}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tableakun">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutAkun.order}
                        orderBy={urutAkun.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listAkun !== null ? listAkun.data.map((row, index) => {
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
	                                    {(paginationAkun.current-1)*paginationAkun.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 50, verticalAlign: 'top'}}
	                                >
                                        { row.status_header === true? <b>{row.id}</b>:row.id }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top', minWidth: 400}}
	                                >
	                                    { row.status_header === true? <b>{row.nama}</b>:<label style={{marginLeft: 16}}>{row.nama}</label>}
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 150, verticalAlign: 'top'}}
	                                >
	                                    { row.status_header === true ? <b>Header</b>:'Detail' }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 100, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleOpenFormAddAkun}/>
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
                count={listAkun !== null ? listAkun.total:0}
                rowsPerPage={paginationAkun.pageSize}
                page={paginationAkun.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusAkun} 
                aksi={this.handleDeleteAkun} 
                message={`Hapus item ${this.itemAkun.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableAkun));

