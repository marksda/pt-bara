import React from 'react';
import axios from 'axios';
import { Button, Dropdown, Form, Input, InputNumber, notification, Menu } from 'antd';
import { connect } from "react-redux";
import { getBudget, setFilterBudget, setItemMenuSelected, setPaginationBudget, setUrutBudget, setItemProyekSelected, setIsProgress } from "../../actions/master-action";
import { DownOutlined } from '@ant-design/icons';
import _ from 'lodash';


const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        modeProyekBaru: store.master.mode_proyek_baru,
        itemProyekSelected: store.master.item_proyek_selected,
        isProgress: store.master.is_progress,
        listBudget: store.master.list_budget,
        filterBudget: store.master.filter_budget,
        paginationBudget: store.master.pagination_budget,
        urutBudget: store.master.urut_budget
    };
};

const mapDispatchToProps = dispatch => {    
    return {             
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        getBudget: (url, headerAuthorization) => dispatch(getBudget(url, headerAuthorization)),
        setFilterBudget: (value) => dispatch(setFilterBudget(value)),
        setPaginationBudget: (value) => dispatch(setPaginationBudget(value)),
        setUrutBudget: (value) => dispatch(setUrutBudget(value)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),  
    };
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 4 },
};

class FormMonitoring extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            disabledInput: true,
            disabledInputEdit: true,
            totalBudget: 0.0,
            listMonitoring: null,        
            disabledInputEdit: false,
            disabledInput: true 
        }

        this.formRef = React.createRef();
        this.itemProyek = null;
        this.indexItemMonitoringSelected = null;
        this.listItemUpdate = [];
    }

    componentDidMount() {
        const { itemProyekSelected, paginationBudget, urutBudget, setFilterBudget } = this.props;
        this.getTotalBudget();
        let filter = [
            {field: 'm.status_header', header: false},
            {field: 'm.no_job', nojob: itemProyekSelected.no_job}
        ];
        setFilterBudget(filter);
        this.loadBudget(filter, paginationBudget, urutBudget);
        setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 300);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.itemProyek === null && nextProps.itemProyekSelected !== null) {     
            this.itemProyek = {
                no_job: nextProps.itemProyekSelected.no_job,
                nama_customer: nextProps.itemProyekSelected.nama_customer,
                nama_proyek: nextProps.itemProyekSelected.nama_proyek
            };

            this.formRef.current.setFieldsValue({
                no_job: nextProps.itemProyekSelected.no_job,
                nama_customer: nextProps.itemProyekSelected.nama_customer,
                nama_proyek: nextProps.itemProyekSelected.nama_proyek,
                nilai_kontrak: nextProps.itemProyekSelected.nilai_kontrak
            });     
        }

        if(nextState.totalBudget !== this.state.totalBudget) {
            this.formRef.current.setFieldsValue({
                total_budget: nextState.totalBudget
            });  
        }

        return true;
    }

    getMonitoring = (totalBudget) => {
        const { headerAuthorization, itemProyekSelected, restfulServer, setIsProgress } = this.props;
        setIsProgress(true);

        let self = this;    
                
        axios({
            method: 'get',
            url: `${restfulServer}/master/monitoring`,
            headers: {...headerAuthorization},
            params: { no_job: itemProyekSelected.no_job }
        })
        .then((r) => {         
            setIsProgress(false);
            if(r.data.status === 200) {                
                self.setState({listMonitoring: r.data.keterangan});
                let p = r.data.keterangan.length;
                let i;
                let realisasi = 0;
                for(i=0; i<p; i++) {
                    realisasi = realisasi + r.data.keterangan[i].jumlah;
                }                

                self.formRef.current.setFieldsValue({
                    realisasi_biaya: realisasi,
                    persentase_realisasi_biaya: (realisasi/totalBudget*100).toFixed(2)
                });         
            }
            else {
                self.formRef.current.setFieldsValue({
                    realisasi_biaya: 0,
                    persentase_realisasi_biaya: 0
                });  
            }
        })
        .catch((r) => {         
            console.log(r.toString());
            setIsProgress(false);
        });        
    }

    getTotalBudget = () => {
        const { headerAuthorization, itemProyekSelected, restfulServer, setIsProgress } = this.props;
        setIsProgress(true);
        let self = this;    
                
        axios({
            method: 'get',
            url: `${restfulServer}/master/totalbudget`,
            headers: {...headerAuthorization},
            params: { no_job: itemProyekSelected.no_job }
        })
        .then((r) => {         
            if(r.data.status === 200) {
                setIsProgress(false);
                self.setState({totalBudget: r.data.keterangan});                
                self.getMonitoring(r.data.keterangan);
            }
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
            setIsProgress(false);
        });        
    }

    handleItemBudgetClick = (e) => {
        const { listMonitoring } = this.state;
        const { listBudget } = this.props;

        let tmpListMonitoring = _.cloneDeep(listMonitoring);
        let itemUpdate = {
            id_jurnal: listMonitoring[this.indexItemMonitoringSelected.idxAkun].isimonitoring[this.indexItemMonitoringSelected.idxItem].id_jurnal,
            id_akun: listMonitoring[this.indexItemMonitoringSelected.idxAkun].id_akun,
            no_job: this.itemProyek.no_job,
            id_budget: e.key
        };

        let self = this;
        let i = 
        _.findIndex(self.listItemUpdate, 
            function(o) { 
                return (o.id_jurnal === itemUpdate.id_jurnal && o.id_akun === itemUpdate.id_akun); 
            }
        );

        if(i < 0){
            this.listItemUpdate.push(itemUpdate);
        }
        else {
            this.listItemUpdate[i].id_budget = e.key;
        }

        let tmpItemBudget = _.find(listBudget.data, function(o) { return o.id === e.key; });
        tmpListMonitoring[this.indexItemMonitoringSelected.idxAkun].isimonitoring[this.indexItemMonitoringSelected.idxItem].kategori_budget = tmpItemBudget.nama;
        this.setState({listMonitoring: tmpListMonitoring});
    }

    handleCellKategoriClick = (e) => {
        if(e.target.nodeName.toLowerCase() === 'td'){
            this.indexItemMonitoringSelected = {
                idxAkun: Number(e.target.dataset.idxakun),
                idxItem: Number(e.target.dataset.idxitem)
            }
        }
        else if(e.target.nodeName.toLowerCase() === 'a'){
            this.indexItemMonitoringSelected = {
                idxAkun: Number(e.target.parentElement.dataset.idxakun),
                idxItem: Number(e.target.parentElement.dataset.idxitem)
            }
        }
        else if(e.target.nodeName.toLowerCase() === 'svg') {
            this.indexItemMonitoringSelected = {
                idxAkun: Number(e.target.parentElement.parentElement.parentElement.dataset.idxakun),
                idxItem: Number(e.target.parentElement.parentElement.parentElement.dataset.idxitem)
            }
        }
        else {
            this.indexItemMonitoringSelected = {
                idxAkun: Number(e.target.parentElement.parentElement.parentElement.parentElement.dataset.idxakun),
                idxItem: Number(e.target.parentElement.parentElement.parentElement.parentElement.dataset.idxitem)
            }
        }
    }

    handleBatal = () => {        
        this.listItemUpdate = [];
        this.setState({disabledInput: true, disabledInputEdit: false});
        setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 300);
        this.getMonitoring(this.state.totalBudget);
    }

    handleEdit = () => {        
        this.setState({disabledInput: false, disabledInputEdit: true});
    }

    handleOnFinish = (value) => {
		this.setState({disabledInput: true});
        this.updateMonitoring();
	}

    handleToNavDaftarProyek = () => {
        const { setItemMenuSelected } = this.props;
        setItemMenuSelected('Daftar Proyek');
    }

    flipDate = (tgl) => {
        let tmptgl = tgl.split('-');
        return `${tmptgl[2]}-${tmptgl[1]}-${tmptgl[0]}`
    }

    formatterRupiah = (value) => {        
        let tmp = value.split('.');
        if(tmp.length>1){
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `Rp ${tmp[0]},${tmp[1]}`;
        }
        else {
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `Rp ${tmp[0]}`;
        }
    }

    parserRupiah = (value) => {
        value = value.replace(/Rp\s?|(\.*)/g, '')
        return value.replace(/\,/g, '.');
    }

    formatterPersen = (value) => {        
        let tmp = value.split('.');
        if(tmp.length>1){
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `${tmp[0]},${tmp[1]} %`;
        }
        else {
            tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\.');
            return `${tmp[0]} %`;
        }
    }

    parserPersen = (value) => {
        value = value.replace(/\s?%|(\.*)/g, '')
        return value.replace(/\,/g, '.');
    }

    loadBudget = (filter, pagination, urut) => {
        const { getBudget, headerAuthorization, restfulServer } = this.props; 
        let url;
        if(filter === null) {
            url = `${restfulServer}/master/budget?pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;        
        }
        else {
            url = `${restfulServer}/master/budget?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`;
        } 
        getBudget(url, headerAuthorization);
    }

    updateMonitoring = () => {
        const { headerAuthorization, restfulServer, setIsProgress } = this.props;
        const { totalBudget } = this.state;
        setIsProgress(true);
        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/monitoring`,
            headers: {...headerAuthorization},
            data: this.listItemUpdate
        })
        .then((r) => {       
            setIsProgress(false);  
            if(r.data.status === 200) {
                this.listItemUpdate = [];
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'monitoring berhasil diupdate.',
                    duration: 4,
                    placement: 'bottomRight'
                }); 
                self.setState({disabledInput: true, disabledInputEdit: false});     
                setTimeout(() => {this.formRef.current.getFieldInstance('btnedit').focus();}, 300);
                self.getMonitoring(totalBudget);
            }
            else {
                notification.open({
                    message: 'Pemberitahuan',
                    description:
                      'monitoring gagal diupdate.',
                    duration: 4,
                    placement: 'bottomRight'
                });  
            }
        })
        .catch((r) => {         
            notification.open({
                message: 'Pemberitahuan',
                description:
                  'monitoring gagal diupdate dikarenakan jaringan menuju server terputus',
                duration: 4,
                placement: 'bottomRight'
            });
        });        
    }

    render() {
        const { listMonitoring, disabledInput, disabledInputEdit } = this.state;
        const { isProgress, listBudget } = this.props;

        const menu = (
            <Menu>
                {
                    listBudget !== null?
                    listBudget.data.map((item) => (
                        <Menu.Item 
                            danger 
                            key={item.id} 
                            onClick={this.handleItemBudgetClick}
                        >
                            {item.nama}
                        </Menu.Item>
                    )):
                    null
                }
            </Menu>
        );

        let page =
        <Form
            name="form-budget"
            ref={this.formRef}
            onFinish={this.handleOnFinish}
            layout='vertical'
            initialValues={{
                ["no_job"]: null,
                ["nama_proyek"]: null,
                ["nama_customer"]: null,
                ["nilai_kontrak"]: null,
                ["total_budget"]: null,
                ["realisasi_biaya"]: null,
                ["persentase_realisasi_biaya"]: null
            }}
        >
            <div className="content-flex-center">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div className="content-flex-center">
                        <table className="table-proyek-monitoring">
                        <tbody>
                            <tr>
                                <td>
                                    <Form.Item
                                        label="No. Job"
                                        name="no_job"
                                        style={{marginBottom: 16}}
                                    >
                                        <Input 
                                            disabled={true}
                                            style={{ width: 150, color: '#646463' }}
                                        />
                                    </Form.Item>
                                </td>
                                <td>
                                    <Form.Item 
                                        label="Client"
                                        name="nama_customer"
                                        style={{marginBottom: 16}}
                                    >
                                        <Input 
                                            disabled={true}
                                            style={{minWidth: 250, color: '#646463'}}
                                        />
                                    </Form.Item>
                                </td>
                                <td>
                                    <Form.Item
                                        label="Proyek"
                                        name="nama_proyek"
                                        style={{marginBottom: 16}}
                                    >
                                        <Input 
                                            data-jenis="namaproyek"
                                            disabled={true}
                                            style={{minWidth: 250, color: '#646463'}}
                                        />
                                    </Form.Item>
                                </td>
                            </tr>
                            <tr>
                                    <td>
                                        <Form.Item
                                            label="Nilai Kontrak/PO"
                                            name="nilai_kontrak"
                                            style={{marginBottom: 16}}
                                        >
                                            <InputNumber
                                                disabled={true}
                                                style={{width: 150, color: '#646463'}}
                                                formatter={this.formatterRupiah}
                                                parser={this.parserRupiah}
                                            />
                                        </Form.Item>
                                    </td>
                                    <td>
                                        <div style={{display: 'flex'}}>
                                            <Form.Item
                                                label="Jumlah Budget"
                                                name="total_budget"
                                                style={{marginBottom: 16, marginRight: 16}}
                                            >
                                                <InputNumber
                                                    disabled={true}
                                                    style={{width: 150, color: '#646463'}}
                                                    formatter={this.formatterRupiah}
                                                    parser={this.parserRupiah}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Realisasi Biaya"
                                                name="realisasi_biaya"
                                                style={{marginBottom: 16, marginRight: 4}}
                                            >
                                                <InputNumber
                                                    disabled={true}
                                                    style={{width: 150, color: '#646463'}}
                                                    formatter={this.formatterRupiah}
                                                    parser={this.parserRupiah}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label=" "
                                                name="persentase_realisasi_biaya"
                                                style={{marginBottom: 16}}
                                            >
                                                <InputNumber
                                                    disabled={true}
                                                    style={{width: 75, color: '#646463'}}
                                                    formatter={this.formatterPersen}
                                                    parser={this.parserPersen}
                                                />
                                            </Form.Item>
                                        </div>
                                    </td>
                                </tr>   
                        </tbody>
                        </table>
                    </div>
                    <div className="content-flex-center">
                        <table className="table-monitoring">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Tanggal</th>
                                    <th>Nilai (Rp)</th>
                                    <th>Jumlah (Rp)</th>
                                    <th>Keterangan</th>
                                    <th>Kategori budget</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                listMonitoring !== null? listMonitoring.map((item, idx) => (
                                    <React.Fragment key={item.id_akun}>
                                    <tr key={item.id_akun}>
                                        <td colSpan="3" style={{textAlign: 'left', paddingTop: 16}}>
                                            <b>{item.nama}</b>
                                        </td>
                                        <td style={{textAlign: 'right', paddingTop: 16}}>
                                            <b>{new Intl.NumberFormat('id').format(item.jumlah)}</b>
                                        </td>
                                    </tr>      
                                    {
                                        item.isimonitoring.map((row, index) => (
                                            <tr key={`${item.id_akun}-${index}`}>
                                                <td>{`${index+1}.`}</td>
                                                <td>{this.flipDate(row.tanggal)}</td>
                                                <td>{new Intl.NumberFormat('id').format(row.nilai)}</td>
                                                <td></td>
                                                <td>{row.keterangan}</td>
                                                <td 
                                                    data-idxakun={idx}
                                                    data-idxitem={index}
                                                    onClick={this.handleCellKategoriClick}
                                                >
                                                    <Dropdown overlay={menu} trigger={['click']} disabled={disabledInput}>
                                                        {disabledInput===false?
                                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                                {row.kategori_budget===null?'Pilih kategori budget':row.kategori_budget}
                                                                <DownOutlined style={{marginLeft: 16}}/>
                                                            </a>:
                                                            <label>
                                                                {row.kategori_budget===null?'Pilih kategori budget':row.kategori_budget}
                                                            </label>
                                                        }
                                                    </Dropdown>
                                                </td>
                                            </tr> 
                                        ))
                                    }
                                    </React.Fragment>    
                                )):null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Form.Item {...tailLayout} style={{width: 150}} name="btnedit">                    
                        <Button 
                            shape="round"
                            size="default"
                            htmlType="button" 
                            onClick={this.handleEdit} 
                            style={{marginBottom: 8, width: 150}}
                            disabled={isProgress===true?true:disabledInputEdit}
                        >
                            Edit
                        </Button>
                    </Form.Item>      
                    <Form.Item {...tailLayout} style={{width: 150}}>  
                        <Button 
                            danger
                            type="primary" 
                            shape="round"
                            size="default"
                            htmlType="button" 
                            onClick={this.handleBatal} 
                            style={{marginBottom: 8, width: 150}}
                            disabled={isProgress===true?true:disabledInput}
                        >
                        Batal
                        </Button>
                        <Button 
                            type="primary" 
                            shape="round"
                            size="default"
                            htmlType="submit" 
                            disabled={isProgress===true?true:disabledInput}
                            style={{width: 150, marginBottom: 150}}
                        >
                        Simpan
                        </Button>
                        <Button 
                            shape="round"
                            size="default"
                            htmlType="button" 
                            onClick={this.handleToNavDaftarProyek} 
                            disabled={isProgress===true?true:!disabledInput}
                            style={{marginBottom: 8, width: 150}}
                        >
                        Daftar Proyek
                        </Button>
                    </Form.Item>              
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMonitoring);