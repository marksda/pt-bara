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
import Toolbar from '@material-ui/core/Toolbar';
import _ from 'lodash';

import { Form, Input, Select, Typography } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';
  

import { getAkun, setFilterAkun, setPaginationAkun, setUrutAkun, setIsProgress } from "../../actions/master-action";

import { connect } from "react-redux";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

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
    const { acuan, handleOpen, isProgress, listHeaderAkun, title, handleCari, handleChange, handleChangeSubKategoriAkun, handleChangePrefixSearch, prefixSearch } = props;
    const selectBefore = (
        <Select 
            value={prefixSearch} 
            dropdownStyle={{zIndex: 2000}}
            onChange={handleChangePrefixSearch}
            disabled={isProgress}
        >
          <Option value="m.id">KODE</Option>
          <Option value="m.nama">NAMA</Option>
        </Select>
    );

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
                <IconButton 
                    aria-label="add" 
                    onClick={handleOpen}
                >
                    <AddBoxOutlineIcon />
                </IconButton> 
                <Form 
                    ref={acuan} 
                    initialValues={
                        {
                            remember: true,
                            ["kode"]: "0",
                        }
                    }
                >
                    <div style={{display: 'flex'}}>
                    <Form.Item 
                        name="kode" 
                        style={{ width: 180, marginRight: 16, marginTop: 24 }} 
                    >
                        <Select onChange={handleChangeSubKategoriAkun}>
                            <Option value="0">SEMUA</Option>
                            {
                                listHeaderAkun!==null?
                                listHeaderAkun.map((item) =>
                                    <Option key={item.id} value={item.id}>{item.nama.toUpperCase()}</Option>
                                ):
                                null
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        name="cari" style={{ width: 250, marginTop: 24}} 
                        shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
                    >
                        <Search                                    
                            placeholder="pencarian"
                            onSearch={handleCari}
                            onChange={handleChange}
                            addonBefore={selectBefore}
                            disabled={isProgress===true}
                        />
                    </Form.Item>
                    </div>
                </Form> 
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
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        setUrutAkun: (value) => dispatch(setUrutAkun(value))
    };
};

class TableAkun extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            listHeaderAkun: null,
        	openConfirmasiHapusAkun: false,
        	openFormAddAkun: false,
        	mode: '',
            prefixSearch: 'm.nama',
        };

        this.itemAkun = {};
        this.formRef = React.createRef();
        this.filterAkunHeader = [{ field: "m.status_header", header: true }];
        this.paginationAkunHeader = {current: 1, pageSize: 1000};
        this.sortAkunHeader = {field: 'm.nama', order: 'asc' };
        this.kodeAwalcari = '';
    }

    componentDidMount() {
    	const { paginationAkun, urutAkun } = this.props;
        
        this.loadHeaderAkun(this.filterAkunHeader, this.paginationAkunHeader, this.sortAkunHeader);
        this.loadAkun(null, paginationAkun, urutAkun);
    }

    deleteAkun = (dataAkun) => {
        const { 
            filterAkun, headerAuthorization, paginationAkun, resetCredential, 
            restfulServer, urutAkun         
        } = this.props;
        let self = this;    
         
        setIsProgress(true);

        axios({
            method: 'delete',
            url: `${restfulServer}/master/akun`,
            headers: {...headerAuthorization},
            params: dataAkun
        })
        .then((r) => {  
            setIsProgress(false);
            if(r.data.status === 200) {
                self.itemAkun.id = null;
                self.itemAkun.nama = null;
                self.loadHeaderAkun(self.filterAkunHeader, self.paginationAkunHeader, self.sortAkunHeader);
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
            setIsProgress(false);
            // resetCredential();
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

    handleChange = (e) => {
        const { prefixSearch } = this.state;

        if(prefixSearch === 'm.id') {
            let regex = new RegExp(this.kodeAwalcari);
            if(!regex.test(e.target.value)) {
                this.formRef.current.setFieldsValue({
                    cari: this.kodeAwalcari
                });
            }
        }
    }

    handleChangeFilter = (value, event) => {
        event.preventDefault();
        // event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        const { filterAkun, paginationAkun, urutAkun, setFilterAkun } = this.props; 
        const { prefixSearch } = this.state;
        
        let tmpFilter = [];        
        tmpFilter = [...filterAkun];
        let idx = -1; 

        if(prefixSearch==="m.nama") {
            idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.nama'}); 
            if(idx < 0) {            
                tmpFilter.push(                        
                    { field: "m.nama", search: value }
                );
            }
            else {
                tmpFilter[idx].search = value;
            }     
        }
        else {
            idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.id'}); 
            if(idx < 0) {            
                tmpFilter.push(                        
                    { field: "m.id", id: value }
                );
            }
            else {
                tmpFilter[idx].id = value;
            }
        }

        setFilterAkun(tmpFilter); 
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {
            this.formRef.current.getFieldInstance('cari').focus();
        }, 300);
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

    handleChangePrefixSearch = (value) => {
        const { filterAkun, paginationAkun, urutAkun, setFilterAkun } = this.props;         
        this.setState({prefixSearch: value});
        let tmpFilter = [];
        let idx = -1;         
        tmpFilter = [...filterAkun];
        idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.id'});             
        if(idx < 0) {            
            tmpFilter.push(                        
                { field: "m.id", id: this.kodeAwalcari }
            );
        }
        else {
            tmpFilter[idx].id = this.kodeAwalcari;
        }

        if(value === 'm.id') {
            idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.nama'}); 
            if(idx >= 0) {            
                tmpFilter.splice(idx,1);
            }       
        
            this.formRef.current.setFieldsValue({
                cari: this.kodeAwalcari
            });
        }
        else {
            this.formRef.current.setFieldsValue({
                cari: ''
            });
        }

        setFilterAkun(tmpFilter); 
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
    }

    handleChangeSubKategoriAkun = (v) => {
        const { filterAkun, paginationAkun, urutAkun, setFilterAkun } = this.props;       
        const { prefixSearch } = this.state;

        let tmpFilter = [];
        let idx = -1;  

        if(filterAkun!==null) {
            idx = _.findIndex(filterAkun, function(o){return o.field === 'm.id'}); 
            tmpFilter = [...filterAkun];
        }
        
        this.kodeAwalcari = v.split("0")[0];
       
        if(prefixSearch === 'm.id') {
            this.formRef.current.setFieldsValue({
                cari: this.kodeAwalcari
            });
        }

        if(idx < 0) {            
            tmpFilter.push(                        
                { field: "m.id", id: this.kodeAwalcari }
            );
        }
        else {
            tmpFilter[idx].id = this.kodeAwalcari;
        }      
        setFilterAkun(tmpFilter); 
        this.loadAkun(tmpFilter, paginationAkun, urutAkun);
        setTimeout(() => {
            this.formRef.current.getFieldInstance('cari').focus();
        }, 300);
    }

    handleCloseFormAddAkun = () => {
        this.setState({openFormAddAkun: false});
    }

    handleDeleteAkun = (status) => {        
        if(status === true) {
            this.setState({openConfirmasiHapusAkun: false});
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

    loadAkun = (filter, pagination, urut) => {
        const { getAkun, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/akun?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        else {
            url = `${restfulServer}/master/akun?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        }
        
        getAkun(url, headerAuthorization);
    }

    loadHeaderAkun = (f, p, s) => {
        const { headerAuthorization, restfulServer } = this.props;
        let self = this;  
        
        setIsProgress(true);
        
        let tmpFilter = [];
        tmpFilter.push(                        
            { field: "m.status_header", header: true }
        );

        axios({
            method: 'get',
            url: `${restfulServer}/master/akun`,
            headers: {...headerAuthorization},
            params: {
                filter:  JSON.stringify(f),
                pagination: p,
                sorter: s
            }
        })
	    .then((r) => { 
            setIsProgress(false);   
            if(r.data.status === 200) {
                self.setState({listHeaderAkun: r.data.keterangan.data});
            }
	    })
	    .catch((r) => {
	    	// console.log(r.toString());
            setIsProgress(false);
	    });
    }

    render() {
        const { classes, isProgress, listAkun, paginationAkun, title, urutAkun } = this.props;
		const { listHeaderAkun, openConfirmasiHapusAkun, openFormAddAkun, mode, prefixSearch } = this.state;

        let pageAdd = null;
        let pageRender = null;

		if(openFormAddAkun === true) {
            pageAdd = 
             <FormAddAkun 
                data={this.itemAkun}
                visible={openFormAddAkun} 
                handleClose={this.handleCloseFormAddAkun}
                mode={mode}
                loadHeaderAkun={this.loadHeaderAkun}
            />;
        }

        pageRender =
		<div className={classes.root}>
			<EnhancedTableToolbar 
                acuan={this.formRef}
                listHeaderAkun={listHeaderAkun}
                handleOpen={this.handleOpenFormAddAkun}  
                title={title}
                handleCari={this.handleChangeFilter}
                handleChange={this.handleChange}
                handleChangeSubKategoriAkun={this.handleChangeSubKategoriAkun}
                prefixSearch={prefixSearch}
                handleChangePrefixSearch={this.handleChangePrefixSearch}
                isProgress={isProgress}
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

