import React, { Component } from "react";
import axios from 'axios';
import { Button, Form, Input, Modal, Select } from 'antd';
import { connect } from "react-redux";
import { getGroupHakAkses, getMenuTree } from "../../actions/master-action";
import Tree from '../nav/Tree';
import _ from 'lodash';

const mapStateToProps = store => {
    return {      
        filterGroupHakAkses: store.master.filter_group_hak_akses,
        headerAuthorization: store.credential.header_authorization,
        paginationGroupHakAkses: store.master.pagination_group_hak_akses,
        restfulServer: store.general.restful_domain,
        urutGroupHakAkses: store.master.urut_group_hak_akses,
        menuTree: store.master.menu_tree
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        getGroupHakAkses: (url, headerAuthorization) => dispatch(getGroupHakAkses(url, headerAuthorization)),
        getMenuTree: (url, headerAuthorization) => dispatch(getMenuTree(url, headerAuthorization)),
    };
};

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
};

const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

class FormAddGroupHakAkses extends Component {
    constructor(props) {
		super(props);
		this.state = {
			disabledInput: false,
		};

		this.formRef = React.createRef();
		this.itemGroupHakAkses = {};
        this.menuSelected = [];
	}

    componentDidMount() {
        const { data, menuTree, mode } = this.props;
               
        if(mode === 'edit') {
            this.itemGroupHakAkses = _.cloneDeep(data);
            this.menuSelected = _.cloneDeep(this.itemGroupHakAkses.akses);
        }

        if(menuTree.length === 0) {
        	this.loadMenuTree();
        } 
    }

    handleChangeNilaiText = (e) => {
        const { mode } = this.props;
		switch(e.currentTarget.dataset.jenis) {
			case 'nama':
				this.itemGroupHakAkses.keterangan = e.currentTarget.value;
				break;
			default:
		}
	}

    handleOnFinish = (value) => {
		const { mode } = this.props;
		this.setState({disabledInput: true});
		if(mode === 'edit') {
            this.updateGroupHakAkses();
        }
        else {
			this.saveGroupHakAkses();
        }
	}

    handleReset = () => {
		this.formRef.current.resetFields();
	}

    handleUpdateMenuSelected = (menu) => {
		this.menuSelected = [...menu];
	}

    loadGroupHakAkses = (filter, pagination, urut) => {
        const { getGroupHakAkses, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/grouphakakses?filter=${JSON.stringify(filter)}&pagination=${JSON.stringify(pagination)}&sorter=${JSON.stringify(urut)}`; 
        getGroupHakAkses(url, headerAuthorization);
    }

    loadMenuTree = () => {
    	const { getMenuTree, headerAuthorization, restfulServer } = this.props; 
        let url = `${restfulServer}/master/menu?idhakakses=1`
        getMenuTree(url, headerAuthorization);
    }

    saveGroupHakAkses = () => {
        const { 
			filterGroupHakAkses, headerAuthorization, paginationGroupHakAkses, restfulServer, urutGroupHakAkses, handleClose, handleToggleOpenProgressDialog
		} = this.props;

	    let self = this;

        this.menuSelected = this.menuSelected.filter(el => {
            return el !== undefined;
        });

        let p = this.menuSelected.length;
        for(let i=0;i<p;i++) {
            this.menuSelected[i].menu_item = this.menuSelected[i].menu_item.filter(el => {
                return el !== undefined;
            });
        }

        this.itemGroupHakAkses.menu = this.menuSelected;
        
	    handleToggleOpenProgressDialog();

	    axios({
            method: 'put',
            url: `${restfulServer}/master/grouphakakses`,
            headers: {...headerAuthorization},
            data: this.itemGroupHakAkses
        })
	    .then((r) => {  
	    	if(r.data.status === 200) {        
				self.loadGroupHakAkses(filterGroupHakAkses, paginationGroupHakAkses, urutGroupHakAkses);
	    	} 
	    	self.handleReset();
            self.setState({disabledInput: false});
            handleClose();
            handleToggleOpenProgressDialog();
	    })
	    .catch((r) => {
	    	self.setState({disabledInput: true});
	    });
	}    

    updateGroupHakAkses = () => {
        const { filterGroupHakAkses, headerAuthorization, paginationGroupHakAkses, restfulServer, urutGroupHakAkses, handleClose } = this.props;

        this.menuSelected = this.menuSelected.filter(el => {
            return el !== undefined;
        });

        let p = this.menuSelected.length;
        for(let i=0;i<p;i++) {
            this.menuSelected[i].menu_item = this.menuSelected[i].menu_item.filter(el => {
                return el !== undefined;
            });
        }

        this.itemGroupHakAkses.akses = this.menuSelected;


        let self = this;    
                
        axios({
            method: 'post',
            url: `${restfulServer}/master/grouphakakses`,
            headers: {...headerAuthorization},
            data: this.itemGroupHakAkses
        })
        .then((r) => {         
            if(r.data.status === 200) {
                self.loadGroupHakAkses(
                    filterGroupHakAkses,
                    paginationGroupHakAkses,
                    urutGroupHakAkses
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
        const { data, handleClose, menuTree, mode, visible } = this.props;
		const { disabledInput } = this.state;

		let page = null;

        page =
        <Modal
            title={mode==='edit'?'Formulir Edit Group Hak Akses':'Formulir Add Group Hak Akses'}
            visible={visible}
            onCancel={handleClose}
            footer={null}      
            style={{top: 125}}      
            width="30%"
        >
            <Form
                {...layout}
                name="form--GroupHakAkses"
                onFinish={this.handleOnFinish}
                ref={this.formRef}
                initialValues={{
                    remember: true,
                    ["id"]: mode==='edit'?data.id:'',
                    ["nama"]: mode==='edit'?data.keterangan:''
                }}
            >                
                <Form.Item
	                label="Nama"
                    name="nama"
                    rules={[{required: true, message: 'Nama group hak akses harus diisi'}]}
                >
                    <Input 
                        data-jenis="nama"
                        disabled={disabledInput}
                        onChange={this.handleChangeNilaiText}
                    />
                </Form.Item>
                <Form.Item
                    label="Menu"
                >
                    <div style={{border: '1px solid #dfdddc', padding: '12px 16px', marginBottom: 8, width: '100%', height: 350, overflow: 'auto'}}>
                    {
                        menuTree.length > 0? 
                        <Tree 
                            data={menuTree} 
                            enableIconCheckable={true} 
                            updateMenu={this.handleUpdateMenuSelected}
                            mode={mode}
                        ></Tree>:null
                    }
                    </div>
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
        </Modal>;

	    return(page);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddGroupHakAkses);