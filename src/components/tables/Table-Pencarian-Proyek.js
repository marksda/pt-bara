import React from "react";
import { connect } from "react-redux";
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import _ from 'lodash';

import { Form, Input, DatePicker, Select  } from 'antd';
import { getProyek, setFilterProyek, setItemMenuSelected, setItemProyekSelected, setPaginationProyek, setUrutProyek } from "../../actions/master-action";


const { RangePicker } = DatePicker;
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
        padding: 0
    },
    title: {
        flex: '0 0 auto',
        // marginTop: 16
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { handleCari, handleChangePrefixSearch, rangeDate, changeRangeDate, prefixSearch, acuan } = props;
    const dateFormat = 'DD-MM-YYYY';
    const customFormat = value => `${value.format(dateFormat)}`;

    const selectBefore = (
        <Select 
            defaultValue={prefixSearch!==null?prefixSearch:'m.no_job'} 
            dropdownStyle={{zIndex: 2000}}
            onChange={handleChangePrefixSearch}
        >
          <Option value="m.no_job">No. Job</Option>
          <Option value="c.nama">Customer</Option>
          <Option value="m.nama_proyek">Proyek</Option>
        </Select>
    );

    return(
        <Toolbar
            className={classes.root}
        >           
            <div className={classes.title}>
                <RangePicker 
                    defaultValue={rangeDate!==null?[moment(rangeDate[0]), moment(rangeDate[1])]:[null,null]}
                    format={customFormat}
                    style={{width: 220}}
                    popupStyle={{
                        zIndex: 2000
                    }}
                    placeholder={["tgl. awal", "tgl. akhir"]}
                    onChange={changeRangeDate}
                />
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
            <Form ref={acuan} style={{marginTop: 24}}>
                <Form.Item name="cari">
                    <Search
                    placeholder="pencarian"
                    onSearch={handleCari}
                    style={{ width: 350 }}
                    addonBefore={selectBefore}
                    />
                </Form.Item>
            </Form>
            </div>            
        </Toolbar>
    );
};

const headRows = [
    {id: 'm.tanggal_persiapan', numerik: false, label: 'Tgl. aktif'},
    {id: 'm.no_job', numerik: false, label: 'No. job'},
    {id: 'c.nama', numerik: false, label: 'Customer'},
    {id: 'm.nama_proyek', numerik: false, label: 'Proyek'}
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
                                    style={{width: 280}}
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
        minWidth: 900,
        marginTop: -15
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
        filterProyek: store.master.filter_proyek,
        headerAuthorization: store.credential.header_authorization,
        listProyek: store.master.list_proyek,
        paginationProyek: store.master.pagination_proyek,
        restfulServer: store.general.restful_domain,
        urutProyek: store.master.urut_proyek
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
        getProyek: (url, headerAuthorization) => dispatch(getProyek(url, headerAuthorization)),
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setPaginationProyek: (value) => dispatch(setPaginationProyek(value)),
        setFilterProyek: (value) => dispatch(setFilterProyek(value)),
        setUrutProyek: (value) => dispatch(setUrutProyek(value)),
    };
};

class TablePencarianProyek extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            rentanDate: null,
            prefixSearch: null
        }
        this.formRef = React.createRef();
    }

    componentDidMount() {
        const { filterProyek, paginationProyek, setFilterProyek, urutProyek } = this.props;

        let tmpFilter = null;
        if(filterProyek === null) {     
            this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`], prefixSearch: 'm.no_job'});      
            tmpFilter = [
                {field: 'rentan_tanggal_aktif', rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]}
            ];
        }
        else {                        
            tmpFilter = [...filterProyek];
            let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal_aktif'});
            if(idx < 0) {
                this.setState({rentanDate: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`], prefixSearch: filterProyek[0].field});      
                tmpFilter = [];
                tmpFilter.push(
                    {
                        field: "rentan_tanggal_aktif",
                        rentan: [`${moment().year()}-01-01`, `${moment().year()}-${moment().month()+1}-${moment().date()}`]
                    }
                );
            }
            else {
                let tmpRentan = tmpFilter[idx];
                tmpFilter = [];
                tmpFilter.push(tmpRentan);
                this.setState({rentanDate: filterProyek[idx].rentan, prefixSearch: idx!==0?filterProyek[0].field:'m.no_job'});
            }
        }         

        
        setFilterProyek(tmpFilter);
        setTimeout(() => {this.formRef.current.getFieldInstance('cari').focus();}, 100);
        this.loadProyek(tmpFilter, paginationProyek, urutProyek);
    }

    changeRangeDate = (dates, datesString) => {
        const { filterProyek, paginationProyek, setFilterProyek, urutProyek, setPaginationProyek } = this.props;
        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);

        let tmpRangeDate = [this.flipDate(datesString[0]), this.flipDate(datesString[1])];
        this.setState({rentanDate: tmpRangeDate});

        let tmpFilter = [...filterProyek];

        let idx = _.findIndex(tmpFilter, function(o){return o.field === 'rentan_tanggal_aktif'});

        if(idx < 0) {
            tmpFilter.push(
                {
                    field: "rentan_tanggal_aktif",
                    rentan: tmpRangeDate
                }
            );
        }
        else {
            tmpFilter[idx].rentan = tmpRangeDate;
        }       

        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    handleChangeFilter = (v) => {
        const { filterProyek, paginationProyek, setFilterProyek, urutProyek, setPaginationProyek } = this.props;
        const { prefixSearch } = this.state;

        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);
        let tmpFilter = [];
        let idx = null;

        switch (prefixSearch) {
            case 'm.no_job':
                tmpFilter = [...filterProyek];
                idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.no_job'});

                if(idx < 0) {
                    let tmpRangeDate = _.find(tmpFilter, function(o){return o.field === 'rentan_tanggal_aktif'});
                    tmpFilter = [];
                    tmpFilter.push(                        
                        { field: "m.no_job", search: v },
                        tmpRangeDate
                    );
                }
                else {
                    tmpFilter[idx].search = v;
                } 
                break;
            case 'c.nama':
                tmpFilter = [...filterProyek];
                idx = _.findIndex(tmpFilter, function(o){return o.field === 'c.nama'});

                if(idx < 0) {
                    let tmpRangeDate = _.find(tmpFilter, function(o){return o.field === 'rentan_tanggal_aktif'});
                    tmpFilter = [];
                    tmpFilter.push(                        
                        { field: "c.nama", search: v },
                        tmpRangeDate
                    );
                }
                else {
                    tmpFilter[idx].search = v;
                }  
                break;
            default:
                tmpFilter = [...filterProyek];
                idx = _.findIndex(tmpFilter, function(o){return o.field === 'm.nama_proyek'});

                if(idx < 0) {
                    let tmpRangeDate = _.find(tmpFilter, function(o){return o.field === 'rentan_tanggal_aktif'});
                    tmpFilter = [];
                    tmpFilter.push(
                        { field: "m.nama_proyek", search: v },
                        tmpRangeDate
                    );
                }
                else {
                    tmpFilter[idx].search = v;
                }  
                
                break;
        }    

        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);
    }

    handleChangePrefixSearch = (value) => {
        const { filterProyek, paginationProyek, setFilterProyek, urutProyek, setPaginationProyek } = this.props;
        let tmpPagination = {...paginationProyek};
        tmpPagination.current = 1;        
        setPaginationProyek(tmpPagination);

        setTimeout(() => {
            this.formRef.current.resetFields();
            this.formRef.current.getFieldInstance('cari').focus();
        }, 100);
        this.setState({prefixSearch: value});     

        let tmpFilter = [];
        let tmpRentan = _.find(filterProyek, function(o){return o.field === 'rentan_tanggal_aktif'});
        tmpFilter.push(tmpRentan);

        setFilterProyek(tmpFilter);
        this.loadProyek(tmpFilter, tmpPagination, urutProyek);   
    }

    handleChangeRowsPerPage = (event) => {
        const { filterProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {
            current: 1,
            pageSize: parseInt(event.target.value, 10),
        };
        
        setPaginationProyek(tmpPagination);
        this.loadProyek(filterProyek, tmpPagination, urutProyek);
    }

    handleChangePage = (event, newPage) => {
        const { filterProyek, paginationProyek, setPaginationProyek, urutProyek } = this.props;
        let tmpPagination = {
            current: newPage+1,
            pageSize: paginationProyek.pageSize,
        };
        setPaginationProyek(tmpPagination);
        this.loadProyek(filterProyek, tmpPagination, urutProyek);
    }

    handleOnClickRow = (e) => {
        const { formRef, headerAuthorization, listProyek, setItemProyekSelected, restfulServer, handleCloseWindowProyekSearch  } = this.props;
        setItemProyekSelected(`${restfulServer}/master/detailproyek?no_job=${listProyek.data[Number(e.target.parentElement.dataset.id)].no_job}`, headerAuthorization);
        setTimeout(() => {
            formRef.current.getFieldInstance('nominal_pengajuan').focus();
        }, 100);    
        
        handleCloseWindowProyekSearch();
    }

    handleRequestSort = (event, property) => {   
        const { filterProyek, paginationProyek, setUrutProyek, urutProyek } = this.props;
        let isAsc = urutProyek.field === property && urutProyek.order === 'asc';
        let tmpUrut = {
            field: property,
            order: isAsc ? 'desc' : 'asc'
        };
        setUrutProyek(tmpUrut);
        this.loadProyek(filterProyek, paginationProyek, tmpUrut);
    }

    loadProyek = (filter, pagination, urut) => {
        const { getProyek, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/proyek?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;        
        }
        else {
            url = `${restfulServer}/master/proyek?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;
        } 
        getProyek(url, headerAuthorization);
    }

    render() {
        const { classes, listProyek, paginationProyek, title, urutProyek } = this.props;
        const { rentanDate, prefixSearch } = this.state;

        let pageRender = null;

        pageRender =
		<div className={classes.root}>
            <EnhancedTableToolbar 
                title={title}
                handleCari={this.handleChangeFilter}
                rangeDate={rentanDate}
                changeRangeDate={this.changeRangeDate}
                prefixSearch={prefixSearch}
                handleChangePrefixSearch={this.handleChangePrefixSearch}
                acuan={this.formRef}
                key={rentanDate}
            />
            <TableContainer className={classes.tableWrapper}>
                <Table aria-labelledby="table-pencarian-proyek">
                    <EnhancedTableHead 
                        classes={classes}
                        order={urutProyek.order}
                        orderBy={urutProyek.field}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody style={{cursor: 'pointer'}}>
                    {
                    	listProyek !== null ? listProyek.data.map((row, index) => {
                    		return(
                    			<TableRow 
	                                hover
	                                tabIndex={-1}
	                                key={row.no_job}      
                                    data-id={index}
                                    onClick={this.handleOnClickRow}
	                            >
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
                                        style={{width: 250, verticalAlign: 'top'}}
	                                >
	                                    { row.nama_proyek }
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
                count={listProyek !== null ? listProyek.total:0}
                rowsPerPage={paginationProyek.pageSize}
                page={paginationProyek.current-1}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </div>;

        return(pageRender);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TablePencarianProyek));