import React from "react";

import { getProyek, setItemMenuSelected, setItemProyekSelected } from "../../actions/master-action";

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
    const { title, handleCari } = props;

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
    {id: 'm.nama_proyek', numerik: false, label: 'Proyek'},
    {id: 'm.status', numerik: false, label: 'Status'}
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
        minWidth: 600,
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
    };
};

class TablePencarianProyek extends React.Component {
    constructor(props) {
        super(props); 
    }

    componentDidMount() {
        const { listProyek, paginationProyek, urutProyek } = this.props;

        if(listProyek === null) {
            let filter = [
                {field: 'rentan_tanggal_aktif', rentan: ['2021-01-01', '2021-05-24']},
                {field: 'm.no_job', nojob: itemProyekSelected.no_job}
            ];

            // this.loadProyek(filter, paginationProyek, urutProyek);
        }
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

    
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(TablePencarianProyek));