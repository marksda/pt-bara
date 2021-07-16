import React from 'react';
import axios from 'axios';
import { Button, DatePicker, Form, Input, InputNumber, notification, Radio , Select } from 'antd';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';

import FormPencarianProyek from '../forms/Form-Pencarian-Proyek';

import { connect } from "react-redux";
import { FilterOutlined, MinusCircleOutlined, PlusOutlined  } from '@ant-design/icons';

import { 
    getStatusPengajuan, resetItemPengajuanSelected, setFilterProyek, setIsProgress, setItemMenuSelected, setModePengajuanBaru 
} from "../../actions/master-action";

const mapStateToProps = store => {
    return {
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        itemPengajuanSelected: store.master.item_pengajuan_selected,
        listStatusPengajuan: store.master.list_status_pengajuan,
        filterStatusPengajuan: store.master.filter_status_pengajuan,
        listStatusPengajuan: store.master.list_status_pengajuan,
        paginationStatusPengajuan: store.master.pagination_status_pengajuan,
        urutStatusPengajuan: store.master.urut_status_pengajuan,
        modePengajuanBaru: store.master.mode_pengajuan_baru,
        itemProyekSelected: store.master.item_proyek_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getStatusPengajuan: (url, headerAuthorization) => dispatch(getStatusPengajuan(url, headerAuthorization)),
        resetItemPengajuanSelected: () => dispatch(resetItemPengajuanSelected()),
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setModePengajuanBaru: (nilai) => dispatch(setModePengajuanBaru(nilai)), 
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        setFilterProyek: (value) => dispatch(setFilterProyek(value)),
    };
};

class PengajuanBaru extends React.Component {
    render() {
        let page =
        <Form
            name="form-transaksi"
        >
            
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PengajuanBaru);