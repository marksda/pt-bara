import React from "react";
import AddBoxOutlineIcon from '@material-ui/icons/AddOutlined';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import KonfirmasiDialog from "../dialogs/Konfirmasi-Dialog";
import moment from 'moment';
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

import { Input, DatePicker, Form, notification, Select } from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';

import { connect } from "react-redux";

const { Search } = Input;
const { RangePicker } = DatePicker;
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
        // marginTop: 16
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { changeRangeDate,  handleOpen, isProgress, rangeDate } = props;

    const dateFormat = 'DD-MM-YYYY';
    const customFormat = value => `${value.format(dateFormat)}`;


    return(
        <Toolbar
            className={classes.root}
        >           
            <div className={classes.title}>
                <label>Periode :&nbsp;&nbsp;&nbsp;</label>
                <RangePicker 
                    defaultValue={rangeDate!==null?[moment(rangeDate[0]), moment(rangeDate[1])]:[null,null]}
                    format={customFormat}
                    style={{width: 220}}
                    popupStyle={{
                        zIndex: 2000
                    }}
                    placeholder={["tgl. awal", "tgl. akhir"]}
                    onChange={changeRangeDate}
                    disabled={isProgress}
                    allowClear={false}
                />
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                <Tooltip title="tambah" className={classes.showIconTambah}>
                    <IconButton 
                        aria-label="add" 
                        onClick={isProgress===false?handleOpen:null}
                        disabled={isProgress}
                    >
                        <AddBoxOutlineIcon />
                    </IconButton>                             
                </Tooltip>   
            </div>            
        </Toolbar>
    );
};