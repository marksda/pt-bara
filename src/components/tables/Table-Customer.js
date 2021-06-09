import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';
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

import { Input, Typography } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { setUnauthorization } from "../../actions/notification-action";
import { getCustomer, setFilterCustomer, setPaginationCustomer, setUrutCustomer } from "../../actions/master-action";

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
                                        {headCell.label}
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
        authorizationNotify: store.notification.authorization_notify,
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
        getCustomer: (url, headerAuthorization) => dispatch(getCustomer(url, headerAuthorization)),
        setFilterCustomer: (value) => dispatch(setFilterCustomer(value)),
        setPaginationCustomer: (value) => dispatch(setPaginationCustomer(value)),
        setUrutCustomer: (value) => dispatch(setUrutCustomer(value)),
        setUnauthorization: () => dispatch(setUnauthorization())
    };
};

