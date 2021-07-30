import React from 'react';
import axios from 'axios';
import { Button, Dropdown, Form, Input, InputNumber, Menu, Progress, Tooltip, Upload } from 'antd';
import { connect } from "react-redux";
import { setItemProyekSelected, setIsProgress } from "../../actions/master-action";
import { DownOutlined } from '@ant-design/icons';


const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        modeProyekBaru: store.master.mode_proyek_baru,
        itemProyekSelected: store.master.item_proyek_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {             
        setItemProyekSelected: (url, headerAuthorization) => dispatch(setItemProyekSelected(url, headerAuthorization)),
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
    };
};

class FormMonitoring extends React.Component {
    constructor(props) {
		super(props);
        this.state ={
            disabledInput: true,
            disabledInputEdit: true,
            totalBudget: 0.0,
            listMonitoring: null,            
        }

        this.formRef = React.createRef();
        this.itemProyek = null;
    }

    componentDidMount() {
        this.getTotalBudget();
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
                total_budget: nextState.totalBudget,
                persentase_realisasi_biaya: 90.88
            });  
        }

        return true;
    }

    getMonitoring = (totalBudget) => {
        const { headerAuthorization, itemProyekSelected, restfulServer } = this.props;

        let self = this;    
                
        axios({
            method: 'get',
            url: `${restfulServer}/master/monitoring`,
            headers: {...headerAuthorization},
            params: { no_job: itemProyekSelected.no_job }
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.setState({listMonitoring: r.data.keterangan});
                console.log(r.data.keterangan);
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
        })
        .catch((r) => {         
            console.log(r.toString());
        });        
    }

    getTotalBudget = () => {
        const { headerAuthorization, itemProyekSelected, restfulServer } = this.props;

        let self = this;    
                
        axios({
            method: 'get',
            url: `${restfulServer}/master/totalbudget`,
            headers: {...headerAuthorization},
            params: { no_job: itemProyekSelected.no_job }
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.setState({totalBudget: r.data.keterangan});                
                self.getMonitoring(r.data.keterangan);
            }
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
        });        
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

    render() {
        const { listMonitoring } = this.state;

        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  1st menu item
                </a>
              </Menu.Item>
              <Menu.Item icon={<DownOutlined />} disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                  2nd menu item (disabled)
                </a>
              </Menu.Item>
              <Menu.Item disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                  3rd menu item (disabled)
                </a>
              </Menu.Item>
              <Menu.Item danger>a danger item</Menu.Item>
            </Menu>
        );

        let page =
        <Form
            name="form-budget"
            ref={this.formRef}
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
                                    label="Customer"
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
                            listMonitoring !== null? listMonitoring.map((item) => (
                                <>
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
                                        <tr key={`${item.id_aku}-${row.index}`}>
                                            <td>{`${index+1}.`}</td>
                                            <td>{this.flipDate(row.tanggal)}</td>
                                            <td>{new Intl.NumberFormat('id').format(row.nilai)}</td>
                                            <td></td>
                                            <td>{row.keterangan}</td>
                                            <td style={{textAlign: row.kategori_budget===null?'center':'left'}}>
                                                <Dropdown overlay={menu} trigger={['click']}>
                                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                    {row.kategori_budget===null?<b>Pilih kategori budget</b>:<b>{row.kategori_budge}</b>}
                                                    <DownOutlined style={{marginLeft: 16}}/>
                                                    </a>
                                                </Dropdown>
                                            </td>
                                        </tr> 
                                    ))
                                }
                                </>    
                            )):null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormMonitoring);