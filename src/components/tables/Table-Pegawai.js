import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import FormAddPegawai from "../forms/Form-Add-Pegawai";
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
  

import { getPegawai, setFilterPegawai, setPaginationPegawai, setUrutPegawai } from "../../actions/master-action";

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
    {id: 'm.nip', numerik: false, label: 'Nip'},
    {id: 'm.nama', numerik: false, label: 'Nama'},
    {id: 'm.alamat', numerik: false, label: 'Alamat'},
    {id: 'm.no_handphone', numerik: false, label: 'Telepone'},
    {id: 'm.email', numerik: false, label: 'E-mail'},
    {id: 'm.url_photo', numerik: false, label: 'Foto'},
    {id: 'm.status', numerik: false, label: 'status'},
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
                                    style={{width: 100}}
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
                            case 6:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'center'}
                                    style={{width: 100}}
                                >
                                    {headCell.label}
                                </TableCell>;
                                break;
                            case 7:
                                page = 
                                <TableCell
                                    key={headCell.id}
                                    align={'left'}
                                    style={{width: 100}}
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
        filterPegawai: store.master.filter_pegawai,
        headerAuthorization: store.credential.header_authorization,
        listPegawai: store.master.list_pegawai,
        paginationPegawai: store.master.pagination_pegawai,
        restfulServer: store.general.restful_domain,
        urutPegawai: store.master.urut_pegawai
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getPegawai: (url, headerAuthorization) => dispatch(getPegawai(url, headerAuthorization)),
        setFilterPegawai: (value) => dispatch(setFilterPegawai(value)),
        setPaginationPegawai: (value) => dispatch(setPaginationPegawai(value)),
        setUrutPegawai: (value) => dispatch(setUrutPegawai(value))
    };
};

class TablePegawai extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
        	openConfirmasiHapusPegawai: false,
        	openFormAddPegawai: false,
        	openProcessingDialog: false, 
        	mode: ''
        };

        this.itemPegawai = {};
    }

    componentDidMount() {
    	const { filterPegawai, paginationPegawai, urutPegawai } = this.props;
        this.loadPegawai(filterPegawai, paginationPegawai, urutPegawai);
    }

    deletePegawai = (dataPegawai) => {
        const { 
            filterPegawai, headerAuthorization, paginationPegawai, restfulServer, urutPegawai         
        } = this.props;
        let self = this;    
         
        axios({
            method: 'delete',
            url: `${restfulServer}/master/pegawai`,
            headers: {...headerAuthorization},
            params: dataPegawai
        })
        .then((r) => {  
            self.setState({openProcessingDialog: false});  
            if(r.data.status === 200) {
                self.itemPegawai = {};
                self.loadPegawai(
                    filterPegawai,
                    paginationPegawai,
                    urutPegawai
                );
            }
            else {
                self.itemPegawai = {};
            }
        })
        .catch((r) => { 
            self.itemPegawai = {};
            self.setState({openProcessingDialog: false});
        });
    }

    handleBtnDelete = (e) => {
        const { listPegawai } = this.props;
        this.itemPegawai = {..._.find(listPegawai.data, function(o) { return o.nip === e.currentTarget.dataset.nip; })};
        this.setState({openConfirmasiHapusPegawai: true});
    }

    handleBtnEdit = (e) => {
        const { listPegawai } = this.props;
        this.itemPegawai = {..._.find(listPegawai.data, function(o) { return o.nip === e.currentTarget.dataset.nip; })};
        this.setState({openFormAddPegawai: true, mode: 'edit'});
    }

    handleChangeFilter = (v) => {
        const { paginationPegawai, setFilterPegawai, urutPegawai, setPaginationPegawai } = this.props;
        let tmpPagination = {...paginationPegawai};
        tmpPagination.current = 1;        
        setPaginationPegawai(tmpPagination);
        let tmpFilter = {
            field: "m.nama",
            search: v
        };        
        setFilterPegawai(tmpFilter);
        this.loadPegawai(tmpFilter, tmpPagination, urutPegawai);
    }

    handleChangeRowsPerPage = (event) => {
        const { filterPegawai, setPaginationPegawai, urutPegawai } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationPegawai(tmpPagination);
        this.loadPegawai(filterPegawai, tmpPagination, urutPegawai);
    }

    handleChangePage = (event, newPage) => {
        const { filterPegawai, paginationPegawai, setPaginationPegawai, urutPegawai } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationPegawai.pageSize,
        };
        setPaginationPegawai(tmpPagination);
        this.loadPegawai(filterPegawai, tmpPagination, urutPegawai);
    }

    handleCloseFormAddPegawai = () => {
        this.setState({openFormAddPegawai: false});
    }

    handleDeletePegawai = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusPegawai: false, openProcessingDialog: true});
            this.deletePegawai(this.itemPegawai);
        }
        else {
            this.setState({openConfirmasiHapusPegawai: false});
        }
    }

    handleOpenFormAddPegawai = () => {
        this.setState({openFormAddPegawai: true, mode: 'add'});
    }

    handleRequestSort = (event, property) => {   
        const { filterPegawai, paginationPegawai, setUrutPegawai, urutPegawai } = this.props;
        let isAsc = urutPegawai.field === property && urutPegawai.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutPegawai(tmpUrut);
        this.loadPegawai(filterPegawai, paginationPegawai, tmpUrut);
    }

    handleToggleOpenProgressDialog = () => {
        this.setState({openProcessingDialog: !this.state.openProcessingDialog});
    }

    loadPegawai = (filter, pagination, urut) => {
        const { getPegawai, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pegawai?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPegawai(url, headerAuthorization);
    }

    render() {
        const { classes, listPegawai, paginationPegawai, restfulServer, title, urutPegawai } = this.props;
		const { openConfirmasiHapusPegawai, openFormAddPegawai, openProcessingDialog, mode } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddPegawai === true) {
            pageAdd = 
             <FormAddPegawai 
                data={this.itemPegawai}
                visible={openFormAddPegawai} 
                handleClose={this.handleCloseFormAddPegawai}
                mode={mode}
                handleToggleOpenProgressDialog={this.handleToggleOpenProgressDialog}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                handleOpen={this.handleOpenFormAddPegawai}  
                title={title}
                handleCari={this.handleChangeFilter}
            />
            <TableContainer className={classes.tableWrapper}>
            	<Table aria-labelledby="tablePegawai">
            		<EnhancedTableHead 
                        classes={classes}
                        order={urutPegawai.order}
                        orderBy={urutPegawai.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                    {
                    	listPegawai !== null ? listPegawai.data.map((row, index) => {
                    		return(
                    			<TableRow 
	                                hover
	                                tabIndex={-1}
	                                key={row.nip}      
	                            >
	                            	<TableCell 
	                                    align={'right'}
	                                    style={{width: 40, verticalAlign: 'top'}}
	                                >
	                                    {(paginationPegawai.current-1)*paginationPegawai.pageSize+index+1}.
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{with: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.nip }
	                                </TableCell>
	                                <TableCell 
	                                    align={'left'}
                                        style={{width: 250, verticalAlign: 'top'}}
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
                                        style={{width: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.no_handphone }
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.email }
	                                </TableCell>
                                    <TableCell 
	                                    align={'center'}
                                        style={{width: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.url_photo !== null?<img alt='foto' style={{width:60, height:85}} src={`${restfulServer}/master/foto/pegawai/${row.url_photo}`} />: '-'}
	                                </TableCell>
                                    <TableCell 
	                                    align={'left'}
                                        style={{width: 100, verticalAlign: 'top'}}
	                                >
	                                    { row.status === true?'Aktif':'Non Aktif' }
	                                </TableCell>
	                                <TableCell 
                                        style={{width: 100, verticalAlign: 'top'}}
                                        align={'center'}
                                    >
                                        <PlusOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} onClick={this.handleOpenFormAddPegawai}/>
                                        <EditOutlined style={{ fontSize: '18px', cursor: 'pointer', marginRight: 4}} data-nip={row.nip} onClick={this.handleBtnEdit} />
                                        <DeleteOutlined style={{ fontSize: '18px', cursor: 'pointer' }} data-nip={row.nip} onClick={this.handleBtnDelete}/>
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
                count={listPegawai !== null ? listPegawai.total:0}
                rowsPerPage={paginationPegawai.pageSize}
                page={paginationPegawai.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <ProcessingDialog open={openProcessingDialog} />
            <KonfirmasiDialog 
                open={openConfirmasiHapusPegawai} 
                aksi={this.handleDeletePegawai} 
                message={`Hapus item ${this.itemPegawai.nama}`}
            />
            {pageAdd}
		</div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TablePegawai));

