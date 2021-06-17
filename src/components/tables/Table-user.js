import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddUser from "../forms/Form-Add-User";
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
  

import { getPegawai, getUser, setFilterUser, setPaginationUser, setUrutUser } from "../../actions/master-action";

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
    {id: 'm.pengguna', numerik: false, label: 'User login'},
    {id: 'm.password', numerik: false, label: 'Password'},
    {id: 'a.keterangan', numerik: false, label: 'Group'},
    {id: 'p.nama', numerik: false, label: 'Pengguna'},
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
                            case 2:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    style={{width: 250}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                            case 3:
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
                            case 4:
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
        filterUser: store.master.filter_user,
        headerAuthorization: store.credential.header_authorization,
        listUser: store.master.list_user,
        paginationUser: store.master.pagination_user,
        restfulServer: store.general.restful_domain,
        urutUser: store.master.urut_user,
        listPegawai: store.master.list_pegawai,
        filterPegawai: store.master.filter_pegawai,
        paginationPegawai: store.master.pagination_pegawai,
        urutPegawai: store.master.urut_pegawai
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getPegawai: (url, headerAuthorization) => dispatch(getPegawai(url, headerAuthorization)),
        getUser: (url, headerAuthorization) => dispatch(getUser(url, headerAuthorization)),
        setFilterUser: (value) => dispatch(setFilterUser(value)),
        setPaginationUser: (value) => dispatch(setPaginationUser(value)),
        setUrutUser: (value) => dispatch(setUrutUser(value))
    };
};

class TableUser extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusUser: false,
        	openFormAddUser: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemUser = {};
    }

    componentDidMount() {
    	const { filterUser, paginationUser, urutUser } = this.props;
        this.loadUser(filterUser, paginationUser, urutUser);
    }

    deleteUser = (dataUser) => {
        const { 
            filterUser, headerAuthorization, paginationUser, restfulServer, urutUser         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/user`,
            headers: {...headerAuthorization},
            params: dataUser
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemUser.id = null;
                self.itemUser.nama = null;
                self.loadUser(
                    filterUser,
                    paginationUser,
                    urutUser
                );
            }
            else {
                self.itemUser.id = null;
                self.itemUser.nama = null;
            }
        })
        .catch((r) => { 
            self.itemUser.id = null;
            self.itemUser.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listUser } = this.props;
        this.itemUser = {..._.find(listUser.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusUser: true});
    }

    handleBtnEdit = (e) => {
        const { listUser } = this.props;
        this.itemUser = {..._.find(listUser.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        // this.itemUser.nama = this.itemUser.nama.split(',')[0];
        this.setState({openFormAddUser: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationUser, setFilterUser, urutUser, setPaginationUser } = this.props;
        let tmpPagination = {...paginationUser};
        tmpPagination.current = 1;        
        setPaginationUser(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterUser(tmpFilter);
        this.loadUser(tmpFilter, tmpPagination, urutUser);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterUser, setPaginationUser, urutUser } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationUser(tmpPagination);
        this.loadUser(filterUser, tmpPagination, urutUser);
    }

    handleChangePage = (event, newPage) => {
        const { filterUser, paginationUser, setPaginationUser, urutUser } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationUser.pageSize,
        };
        setPaginationUser(tmpPagination);
        this.loadUser(filterUser, tmpPagination, urutUser);
    }

    handleCloseFormAddUser = () => {
        this.setState({openFormAddUser: false});
    }

    handleDeleteUser = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusUser: false, openProcessingDialog: true});
            this.deleteUser(this.itemUser);
        }
        else {
            this.setState({openConfirmasiHapusUser: false});
        }
    }

    handleOpenFormAddUser = () => {
        const { listPegawai, filterPegawai, paginationPegawai, urutPegawai } = this.props;
        if(listPegawai === null) {
            this.loadPegawai(filterPegawai, paginationPegawai, urutPegawai);
        }
        this.setState({openFormAddUser: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterUser, paginationUser, setUrutUser, urutUser } = this.props;
        let isAsc = urutUser.field === property && urutUser.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutUser(tmpUrut);
        this.loadUser(filterUser, paginationUser, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadPegawai = (filter, pagination, urut) => {
        const { getPegawai, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pegawai?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPegawai(url, headerAuthorization);
    }

    loadUser = (filter, pagination, urut) => {
        const { getUser, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/userhakakses?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getUser(url, headerAuthorization);
    }

    render() {
        const { classes, listUser, paginationUser, title, urutUser } = this.props;
		const { openConfirmasiHapusUser, openFormAddUser, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddUser === true) {
            pageAdd = 
             <FormAddUser 
                data={this.itemUser}
                visible={openFormAddUser} 
                handleClose={this.handleCloseFormAddUser}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddUser}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tableUser">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutUser.order}
                        orderBy={urutUser.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listUser !== null ? listUser.data.map((row, index) => {
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
	                                    {(paginationUser.current-1)*paginationUser.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 250, verticalAlign: 'top'}}
	                                >
	                                    { row.userlogin }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 250, verticalAlign: 'top'}}
	                                >
                                        **********************
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{width: 250, verticalAlign: 'top'}}
	                                >
	                                    { row.groupakses }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top'}}
	                                >
	                                    { row.namapegawai }
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
                count={listUser !== null ? listUser.total:0}
                rowsPerPage={paginationUser.pageSize}
                page={paginationUser.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusUser} 
                aksi={this.handleDeleteUser} 
                message={`Hapus item ${this.itemUser.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableUser));

