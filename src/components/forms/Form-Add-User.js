import React, { Component } from "react";
import axios from 'axios';
import { AutoComplete, Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getGroupHakAkses, getPegawai, getUser } from "../../actions/master-action";

const { Option } = AutoComplete;

const mapStateToProps = store => {
    return {      
        filterUser: store.master.filter_pengemban_jabatan,
        headerAuthorization: store.credential.header_authorization,
        paginationUser: store.master.pagination_pengemban_jabatan,
        restfulServer: store.general.restful_domain,
        urutUser: store.master.urut_pengemban_jabatan,
        listPegawai: store.master.list_pegawai,
        filterPegawai: store.master.filter_pegawai,
        paginationPegawai: store.master.pagination_pegawai,
        urutPegawai: store.master.urut_pegawai,
        listGroupHakAkses: store.master.list_group_hak_akses,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getGroupHakAkses: (url, headerAuthorization) => dispatch(getGroupHakAkses(url, headerAuthorization)),
        getPegawai: (url, headerAuthorization) => dispatch(getPegawai(url, headerAuthorization)),
        getUser: (url, headerAuthorization) => dispatch(getUser(url, headerAuthorization))     
    };
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
};

class FormAddUser extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemUser = {};
	}

    componentDidMount() {
        const { data, mode } = this.props;
        let filterGHA = {
            field: null,
            search: null
        };
        let tmpPaginationGHA = {
            current: 1,
            pageSize: 100,
        };
        let urutGHA = {
            field: "m.keterangan",
            order: "asc"
        };
        this.loadGroupHakAkses(filterGHA, tmpPaginationGHA, urutGHA);
               
        if(mode === 'edit') {
            this.itemUser = {...data};
            // this.itemUser.nip_baru_pegawai = this.itemUser.nip_pegawai;
            // this.itemUser.id_baru_jabatan = this.itemUser.id_jabatan;
            // this.itemUser.id_baru_struktur_organisasi = this.itemUser.id_struktur_organisasi;
            // this.itemUser.priode_baru_start = this.itemUser.priode_start;
            // this.itemUser.priode_baru_end = this.itemUser.priode_end;
        }
    }

    handleChangeGroup = (value) => {
        this.itemUser.idgroup = value;
	}

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
            case 'user':
                this.itemUser.userlogin = e.currentTarget.value;               
				break;
            case 'password':
                this.itemUser.password = e.currentTarget.value;               
                break;
			default:
                break;
		}
	}
    
    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateUser();
        }
        else {
			this.saveUser();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    handleSearchPegawai = (value) => {
        const { paginationPegawai, urutPegawai} = this.props;
		let tmpFilter = {
        	field: "m.nama",
        	search: value
        };
        this.loadPegawai(tmpFilter, paginationPegawai, urutPegawai);
	}

    handleSelectPegawai = (value, option) => {        
        this.itemUser.nip = option.key;
	}

    loadGroupHakAkses = (filter, pagination, urut) => {
        const { getGroupHakAkses, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/grouphakakses?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getGroupHakAkses(url, headerAuthorization);
    }

    loadPegawai = (filter, pagination, urut) => {
        const { getPegawai, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/pegawai?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getPegawai(url, headerAuthorization);
    }

    loadUser = (filter, pagination, urut) => {
        const { getUser, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/userhakakses?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getUser(url, headerAuthorization);
    }

    saveUser = () => {
		const { 
			filterUser, headerAuthorization, paginationUser, restfulServer, urutUser, handleClose, handleToggleOpenProgressDialog
		} = this.props;
	    let self = this;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/userhakakses`,
            headers: {...headerAuthorization},
            data: this.itemUser
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadUser(filterUser, paginationUser, urutUser);
	    	} 
	    	self.handleReset();
            self.setState({disabledInput: false});
            handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
	    	self.setState({disabledInput: true});
	    });
	}    

    updateUser = () => {
        const { filterUser, headerAuthorization, paginationUser, restfulServer, urutUser, handleClose } = this.props;
        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/user`,
            headers: {...headerAuthorization},
            data: this.itemUser
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadUser(
                    filterUser,
                    paginationUser,
                    urutUser
                );
            }
            self.setState({disabledInput: false});
            handleClose();
        })
        .catch((r) => {         
            self.setState({disabledInput: false});
        });        
    }

    render() {
        const { data, handleClose, listGroupHakAkses, listPegawai, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit User':'Formulir Add User'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="35%"
        >
            <Form
                {...layout}
                name="form--User"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["nama"]: mode==='edit'?data.namapegawai:null,
                    ["idgroup"]: mode==='edit'?data.idgroup:null,
                    ["userlogin"]: mode==='edit'?data.userlogin:'',
                }}
            >   
                <Form.Item 
                    label="Pengguna"
                    name="nama"
                    rules={[{required: true, message: 'Pegawai harus harus diisi'}]}
                >
                    <AutoComplete 
                        onSearch={this.handleSearchPegawai}
                        onSelect={this.handleSelectPegawai}
                        defaultValue={mode==='edit'?this.itemUser.nama:null}
                        disabled={disabledInput}
                    >
                    {
                        listPegawai !== null ? listPegawai.data.map((row) => 
                            <Option key={row.nip} value={row.nama}>
                                {row.nama}
                            </Option>
                        ):null
                    }
                    </AutoComplete>
                </Form.Item>
                <Form.Item 
                    label="Group"
                    name="idgroup"
                    rules={[{required: true, message: 'Group harus harus diisi'}]}
                >
                    <Select 
                        onChange={this.handleChangeGroup}
                        disabled={disabledInput}
                        style={{width: 200}}
                    >
                    {
                        listGroupHakAkses !== null ? listGroupHakAkses.data.map((row) => 
                            <Select.Option key={row.id} value={row.id}>{row.keterangan}</Select.Option>
                        ):null
                    }	
                    </Select>
                </Form.Item>
                <Form.Item
	                label="User login"
                    name="userlogin"
                    rules={[{required: true, message: 'User login harus diisi'}]}
                >
                    <Input 
                        data-jenis="user"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
	                label="Password"
                    name="password"
                    rules={[{required: mode==='add'?true:false, message: 'password harus diisi'}]}
                >
                    <Input.Password
                        data-jenis="password"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button 
                        htmlType="button" 
                        onClick={this.handleReset} 
                        disabled={mode==='edit'?true:disabledInput}
                        style={{marginRight: 8}}
                    >
                    Reset
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        disabled={disabledInput}
                    >
                    Simpan
                    </Button>
                </Form.Item>
            </Form>
            {
                mode === 'edit' ? <label style={{color: 'red'}}>*note: password boleh tidak diisi jika ingin tetap memakai password lama</label>: null
            }
        </Modal>;

	    return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddUser);