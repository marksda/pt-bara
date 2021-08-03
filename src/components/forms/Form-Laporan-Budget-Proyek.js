import React from 'react';
import { connect } from "react-redux";
import { Button, DatePicker, Form, Input, InputNumber, notification, Select, Typography } from 'antd';
import { FilterOutlined, FilePdfTwoTone, FileExcelTwoTone } from '@ant-design/icons';
import { setIsProgress, resetFilterProyek } from "../../actions/master-action";
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';

import FormPencarianProyek from '../forms/Form-Pencarian-Proyek';

const { Text } = Typography;

const mapStateToProps = store => {
    return {      
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        isProgress: store.master.is_progress,
        itemProyekSelected: store.master.item_proyek_selected,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setIsProgress: (nilai) => dispatch(setIsProgress(nilai)),
        resetFilterProyek: () => dispatch(resetFilterProyek()),
    };
};

class FormLaporanBudgetProyek extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            anchorEl: null,
        }

        this.formRef = React.createRef();
        this.prevDataPencarianProyek = null;
    }

    componentDidMount() {
        setTimeout(() => {this.formRef.current.getFieldInstance('btncariproyek').focus();}, 100);
    }

    componentWillUnmount() {
        this.props.resetFilterProyek();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.prevDataPencarianProyek !== nextProps.itemProyekSelected) {
            this.prevDataPencarianProyek = nextProps.itemProyekSelected;
            this.formRef.current.setFieldsValue({
                no_job: nextProps.itemProyekSelected.no_job,
                nama_customer: nextProps.itemProyekSelected.nama_customer,
                nama_proyek: nextProps.itemProyekSelected.nama_proyek
            });
        }

        return true;
    }

    handleCloseWindowProyekSearch = () => {
        this.setState({anchorEl: null});
    }

    handleOpenWindowProyekSearch = (e) => {
        this.setState({anchorEl: e.currentTarget});
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
        const { anchorEl } = this.state;
        const { itemProyekSelected } = this.props;

        console.log(itemProyekSelected);

        let page = 
        <Form
            name="form-laporan-budget"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={
                {
                    remember: true,
                    ["no_job"]: null,
                    ["nama_customer"]: null,
                    ["nama_proyek"]:  null,
                    ["nilai_kontrak"]: null,
                    ["total_budget"]: null
                }
            }     
        >
            <div className="content-flex-center">
                <div className="kontainer-left-lp-budget">
                    <div className="content-flex-left">
                        <Form.Item
                            label="No. Job"
                            name="no_job"
                            style={{marginBottom: 16, marginRight: 16}}
                        >
                            <Input 
                                data-jenis="nojob"
                                disabled={true}
                                style={{ width: 150, color: '#646463'}}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Client"
                            name="nama_customer"
                            style={{flexGrow: 1, marginBottom: 16, marginRight: 16}}
                        >
                            <Input disabled={true} style={{color: '#646463'}}/>
                        </Form.Item>
                        <Form.Item 
                            label="Proyek"
                            name="nama_proyek"
                            style={{ flexGrow: 1, marginBottom: 16, marginRight: 8}}
                        >
                            <Input disabled={true} style={{color: '#646463'}}/>
                        </Form.Item>
                        <Form.Item name="btncariproyek" label=" ">
                            <Button 
                                type="dashed" 
                                icon={<FilterOutlined />} 
                                disabled={false}
                                onClick={this.handleOpenWindowProyekSearch} />
                        </Form.Item>
                    </div>
                    <div className="content-flex-left">
                        <Form.Item
                            label="Nilai Kontrak/PO"
                            name="nilai_kontrak"
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
                    </div>
                    <Paper elevation={4} square style={{width: '100%', height: 200, padding: 16}}>
                        <div className="lp-budget-header">
                            <div>                                
                                <span>Post Budget</span>
                                <span>Sub-Post</span>
                            </div>
                            <div> 
                                <span>Sub-Budget</span>
                                <span>Budget</span>
                            </div>
                            <div>
                                <span>Sub-Realisasi</span>
                                <span>Realisasi</span>
                            </div>  
                            <div style={{flexGrow: 1}}>
                                <span>Progress</span>
                                <span>Sub-Sisa</span>
                                <span>Sisa-Budget</span>
                            </div> 
                        </div>
                    </Paper>
                </div>
                <div className="kontainer-right-lp-budget">  
                    <div className="content-flex-center" style={{marginBottom: 8}}>
                        <Text strong>Download</Text>
                    </div>     
                    <div className="content-flex-center"> 
                        <Form.Item name="btnexcel" style={{marginBottom: 8}}>             
                            <Button 
                                size="default"
                                htmlType="button" 
                                onClick={this.handleEdit} 
                                style={{width: 120}}
                                icon={<FileExcelTwoTone twoToneColor="#40D536" />}
                                shape="round"
                            >
                                EXCEL
                            </Button>
                        </Form.Item> 
                    </div> 
                    <div className="content-flex-center">               
                        <Form.Item name="btnpdf" style={{marginBottom: 8}}>             
                            <Button 
                                size="default"
                                onClick={this.handleEdit} 
                                style={{width: 120}}
                                icon={<FilePdfTwoTone twoToneColor="#CF0000" />}
                                shape="round"
                            >
                                PDF
                            </Button>
                        </Form.Item> 
                    </div>
                </div>
            </div>
            <Popover
                open={anchorEl===null?false:true}
                anchorEl={anchorEl}
                onClose={this.handleCloseWindowProyekSearch}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <FormPencarianProyek formRef={this.formRef} handleCloseWindowProyekSearch={this.handleCloseWindowProyekSearch} />
            </Popover> 
        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLaporanBudgetProyek);