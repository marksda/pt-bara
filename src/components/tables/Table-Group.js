import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddGroupHakAkses from "../forms/Form-Add-GroupHakAkses";
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
import Tree from '../nav/Tree';
import _ from 'lodash';

import { Input, Typography } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
  

import { getGroupHakAkses, setFilterGroupHakAkses, setMenuTreeSelected, setPaginationGroupHakAkses, setUrutGroupHakAkses } from "../../actions/master-action";

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
    {id: 'm.keterangan', numerik: false, label: 'Nama group'},
    {id: 'm.akses', numerik: false, label: 'Menu hak akses'},
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
                                    align={'left'}
                                    style={{width: 500}}
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
        filterGroupHakAkses: store.master.filter_group_hak_akses,
        headerAuthorization: store.credential.header_authorization,
        listGroupHakAkses: store.master.list_group_hak_akses,
        paginationGroupHakAkses: store.master.pagination_group_hak_akses,
        restfulServer: store.general.restful_domain,
        urutGroupHakAkses: store.master.urut_group_hak_akses
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getGroupHakAkses: (url, headerAuthorization) => dispatch(getGroupHakAkses(url, headerAuthorization)),
        setFilterGroupHakAkses: (value) => dispatch(setFilterGroupHakAkses(value)),
        setPaginationGroupHakAkses: (value) => dispatch(setPaginationGroupHakAkses(value)),
        setMenuTreeSelected: (value) => dispatch(setMenuTreeSelected(value)),
        setUrutGroupHakAkses: (value) => dispatch(setUrutGroupHakAkses(value))
    };
};

class TableGroupHakAkses extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusGroupHakAkses: false,
        	openFormAddGroupHakAkses: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemGroupHakAkses = {};
    }

    componentDidMount() {
    	const { filterGroupHakAkses, paginationGroupHakAkses, urutGroupHakAkses } = this.props;
        this.loadGroupHakAkses(filterGroupHakAkses, paginationGroupHakAkses, urutGroupHakAkses);
    }

    deleteGroupHakAkses = (dataGroupHakAkses) => {
        const { 
            filterGroupHakAkses, headerAuthorization, paginationGroupHakAkses, restfulServer, urutGroupHakAkses         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/grouphakakses`,
            headers: {...headerAuthorization},
            params: dataGroupHakAkses
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemGroupHakAkses.id = null;
                self.itemGroupHakAkses.nama = null;
                self.loadGroupHakAkses(
                    filterGroupHakAkses,
                    paginationGroupHakAkses,
                    urutGroupHakAkses
                );
            }
            else {
                self.itemGroupHakAkses.id = null;
                self.itemGroupHakAkses.nama = null;
            }
        })
        .catch((r) => { 
            self.itemGroupHakAkses.id = null;
            self.itemGroupHakAkses.nama = null;
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listGroupHakAkses } = this.props;
        this.itemGroupHakAkses = {..._.find(listGroupHakAkses.data, function(o) { return o.id === e.currentTarget.dataset.id; })};
        this.setState({openConfirmasiHapusGroupHakAkses: true});
    }

    handleBtnEdit = (e) => {
        const { listGroupHakAkses, setMenuTreeSelected } = this.props;
        this.itemGroupHakAkses = {..._.find(listGroupHakAkses.data, function(o) { return o.id === Number(e.currentTarget.dataset.id); })};
        setMenuTreeSelected(this.itemGroupHakAkses.akses);
        this.setState({openFormAddGroupHakAkses: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationGroupHakAkses, setFilterGroupHakAkses, urutGroupHakAkses, setPaginationGroupHakAkses } = this.props;
        let tmpPagination = {...paginationGroupHakAkses};
        tmpPagination.current = 1;        
        setPaginationGroupHakAkses(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterGroupHakAkses(tmpFilter);
        this.loadGroupHakAkses(tmpFilter, tmpPagination, urutGroupHakAkses);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterGroupHakAkses, setPaginationGroupHakAkses, urutGroupHakAkses } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationGroupHakAkses(tmpPagination);
        this.loadGroupHakAkses(filterGroupHakAkses, tmpPagination, urutGroupHakAkses);
    }

    handleChangePage = (event, newPage) => {
        const { filterGroupHakAkses, paginationGroupHakAkses, setPaginationGroupHakAkses, urutGroupHakAkses } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationGroupHakAkses.pageSize,
        };
        setPaginationGroupHakAkses(tmpPagination);
        this.loadGroupHakAkses(filterGroupHakAkses, tmpPagination, urutGroupHakAkses);
    }

    handleCloseFormAddGroupHakAkses = () => {
        this.setState({openFormAddGroupHakAkses: false});
    }

    handleDeleteGroupHakAkses = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusGroupHakAkses: false, openProcessingDialog: true});
            this.deleteGroupHakAkses(this.itemGroupHakAkses);
        }
        else {
            this.setState({openConfirmasiHapusGroupHakAkses: false});
        }
    }

    handleOpenFormAddGroupHakAkses = () => {
        this.setState({openFormAddGroupHakAkses: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterGroupHakAkses, paginationGroupHakAkses, setUrutGroupHakAkses, urutGroupHakAkses } = this.props;
        let isAsc = urutGroupHakAkses.field === property && urutGroupHakAkses.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutGroupHakAkses(tmpUrut);
        this.loadGroupHakAkses(filterGroupHakAkses, paginationGroupHakAkses, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadGroupHakAkses = (filter, pagination, urut) => {
        const { getGroupHakAkses, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/grouphakakses?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getGroupHakAkses(url, headerAuthorization);
    }

    render() {
        const { classes, listGroupHakAkses, paginationGroupHakAkses, title, urutGroupHakAkses } = this.props;
		const { openConfirmasiHapusGroupHakAkses, openFormAddGroupHakAkses, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddGroupHakAkses === true) {
            pageAdd = 
             <FormAddGroupHakAkses 
                data={this.itemGroupHakAkses}
                visible={openFormAddGroupHakAkses} 
                handleClose={this.handleCloseFormAddGroupHakAkses}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddGroupHakAkses}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tableGroupHakAkses">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutGroupHakAkses.order}
                        orderBy={urutGroupHakAkses.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listGroupHakAkses !== null ? listGroupHakAkses.data.map((row, index) => {
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
	                                    {(paginationGroupHakAkses.current-1)*paginationGroupHakAkses.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{minWidth: 80, verticalAlign: 'top'}}
	                                >
	                                    { row.keterangan }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{verticalAlign: 'top', width: 500}}
	                                >
	                                    <Tree 
                                            data={row.akses} 
                                            enableIconCheckable={false} 
                                        />
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
                count={listGroupHakAkses !== null ? listGroupHakAkses.total:0}
                rowsPerPage={paginationGroupHakAkses.pageSize}
                page={paginationGroupHakAkses.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusGroupHakAkses} 
                aksi={this.handleDeleteGroupHakAkses} 
                message={`Hapus item ${this.itemGroupHakAkses.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TableGroupHakAkses));

