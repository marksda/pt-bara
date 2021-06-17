import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import {
    BorderOutlined,
    CaretRightOutlined,
    CaretDownOutlined,
    CheckSquareOutlined,
    MinusSquareOutlined
} from '@ant-design/icons';


const mapStateToProps = store => {
    return { 
        menuTreeSelected: store.master.menu_tree_selected
    };
};

class Tree extends React.Component {
	constructor(props) {
        super(props); 
        this.state= {
            caretStatus: [],
            statusSelectedItem:[],
            reRenderDetail: false
        };

        this.menuTemporar = null;
    }

    componentDidMount() {
        const {data, mode} = this.props;
        this.menuTemporar = new Array(data.length);
        let tmpCaretStatus = [];
        let tmpStatusSelectedItem = [];

        for(let i=0;i<data.length;i++) {
            tmpCaretStatus[i] = false;
            tmpStatusSelectedItem[i] = 'none';
        }

        this.setState({caretStatus: tmpCaretStatus, statusSelectedItem: tmpStatusSelectedItem});

        if(mode === 'edit') {
            // this.menuTemporar = _.cloneDeep(menuTreeSelected);
            // let liNode = document.getElementsByTagName("I");
            // this.initTreeModeEdit(menuTreeSelected, data, 8, liNode);
        }
    }

    handleTogleCaret = (e) => {
        const {caretStatus} = this.state;
        let tmpCaretStatus = [...caretStatus];
        tmpCaretStatus[Number(e.currentTarget.dataset.id)] = !tmpCaretStatus[Number(e.currentTarget.dataset.id)];
        this.setState({caretStatus: tmpCaretStatus});

    }

    handleTogleItemMenu = (e) => {
        e.stopPropagation();
        const { reRenderDetail, statusSelectedItem } = this.state;    
        const { data, updateMenu } = this.props;  
        let tmpStatusSelectedItem = [...statusSelectedItem];
        let i = Number(e.currentTarget.dataset.id);
        switch(tmpStatusSelectedItem[i]) {
            case 'none':
                tmpStatusSelectedItem[i] = 'full';
                this.menuTemporar[i] = _.cloneDeep(data[i]);
                break;
            case 'half':
                tmpStatusSelectedItem[i] = 'full';
                this.menuTemporar[i] = _.cloneDeep(data[i]);
                break;
            default:
                tmpStatusSelectedItem[i] = 'none';
                this.menuTemporar[i] = undefined;
                break;

        }

        updateMenu(this.menuTemporar); 
        this.setState({statusSelectedItem: tmpStatusSelectedItem, reRenderDetail: !reRenderDetail});
    }

    handleToggleSelectBoxSubItem = (idxparent, idxsubitem, sub_menu_item, is_checked) => {
        const { statusSelectedItem, reRenderDetail } = this.state;
        const { data, updateMenu } = this.props;
        let tmpStatusSelectedItem = [...statusSelectedItem];
        
        if(is_checked === true) {
            if(this.menuTemporar[idxparent] === undefined) {
                this.menuTemporar[idxparent] = {
                    sub_header: data[idxparent].sub_header,
                    menu_item: new Array(data[idxparent].menu_item.length)
                };
                this.menuTemporar[idxparent].menu_item[idxsubitem] = sub_menu_item;                
            }
            else {
                this.menuTemporar[idxparent].menu_item[idxsubitem] = sub_menu_item;
            }
        }
        else {
            this.menuTemporar[idxparent].menu_item[idxsubitem] = undefined;
        }

        let filtered;
        filtered = this.menuTemporar[idxparent].menu_item.filter(el => {
            return el !== undefined;
        });

        if(filtered.length === this.menuTemporar[idxparent].menu_item.length) {
            tmpStatusSelectedItem[idxparent] = 'full';
        }
        else if(filtered.length === 0) {
            tmpStatusSelectedItem[idxparent] = 'none';
            this.menuTemporar[idxparent] = undefined;
        }
        else {
            tmpStatusSelectedItem[idxparent] = 'half';
        }
        
        updateMenu(this.menuTemporar);
        this.setState({statusSelectedItem: tmpStatusSelectedItem, reRenderDetail: !reRenderDetail});
    }

    handleRenderIcnSquareItemMenu = (idx) => {
        const { statusSelectedItem } = this.state;
        
        let icnsqritemmenu = null;
        switch (statusSelectedItem[idx]) {
            case 'none':
                icnsqritemmenu = <BorderOutlined data-id={idx} onClick={this.handleTogleItemMenu} />;
                break;
            case 'half':
                icnsqritemmenu = <MinusSquareOutlined data-id={idx} onClick={this.handleTogleItemMenu} />;
                break;
            case 'full':
                icnsqritemmenu = <CheckSquareOutlined data-id={idx} onClick={this.handleTogleItemMenu} />;
                break;
            default:                                        
                break;
        }
        return icnsqritemmenu;
    }

    handleRenderSubMenu = (data, idxParent) => {
        const { reRenderDetail } = this.state;
        let page = 
    	<TreeDetail 
            key={reRenderDetail}
    		data_detail={data} 
    		handle_nested={this.handleNested} 
    		handle_recursive={this.handleRecursiveElement}
            enableIconCheckable={this.props.enableIconCheckable}
            handle_toggle_selectBox={this.handleToggleSelectBoxSubItem}
            index_parent={idxParent}
            data_menu_tmp={this.menuTemporar[idxParent]}
    	/>;

    	return(page);
    }

	render() {
		const { data, enableIconCheckable } = this.props;
        const { caretStatus } = this.state;

		let page = null;
        if(caretStatus.length > 0) {
            page = 
            <ul id="menu_akses" style={{listStyleType: 'none', padding: 0}}>
            {
                data!==null?data.map((item, index) =>
                    <li key={item.sub_header}>
                        <span
                            data-id={index}
                            onClick={this.handleTogleCaret}
                        >
                            {
                                caretStatus[index] === false? <CaretRightOutlined style={{marginRight: enableIconCheckable===true?8:0}} />:<CaretDownOutlined style={{marginRight: enableIconCheckable===true?8:0}} />
                            }
                            {
                                enableIconCheckable===true?this.handleRenderIcnSquareItemMenu(index):null
                            }                            
                            <label style={{marginLeft: 4}}>{item.sub_header}</label>
                        </span>
                        {
                            caretStatus[index] === true?this.handleRenderSubMenu(item.menu_item, index):null
                        }
                    </li>
                ):null
            }
            </ul>;
        }

        return(page);
	}
}

export default connect(mapStateToProps)(Tree);

class TreeDetail extends React.Component {
    constructor(props) {
        super(props); 
        this.state= {
            statusSelectedItem:[],
        };
    }

    componentDidMount() {
        const { data_detail, data_menu_tmp } = this.props;
        let tmpStatusSelectedItem = [];
        if(data_menu_tmp !== undefined) {
            for(let i=0;i<data_detail.length;i++) {
                if(data_menu_tmp.menu_item[i] !== undefined){
                    tmpStatusSelectedItem[i] = 'full';
                }
                else {
                    tmpStatusSelectedItem[i] = 'none';
                }
            }
        }
        else {
            for(let i=0;i<data_detail.length;i++) {
                tmpStatusSelectedItem[i] = 'none';
            }
        }

        this.setState({statusSelectedItem: tmpStatusSelectedItem});

    }

    handleRenderIcnSquareItemMenu = (idx) => {
        const { statusSelectedItem } = this.state;
        
        let icnsqritemmenu = null;
        switch (statusSelectedItem[idx]) {
            case 'none':
                icnsqritemmenu = <BorderOutlined data-id={idx} onClick={this.handleTogleItemMenu} />;
                break;
            case 'full':
                icnsqritemmenu = <CheckSquareOutlined data-id={idx} onClick={this.handleTogleItemMenu} />;
                break;
            default:                                        
                break;
        }
        return icnsqritemmenu;

    }

    handleTogleItemMenu = (e) => {
        e.stopPropagation();
        const {statusSelectedItem} = this.state;              
        const { data_detail, handle_toggle_selectBox, index_parent } = this.props;

        let tmpStatusSelectedItem = [...statusSelectedItem];
        let i = Number(e.currentTarget.dataset.id);
        switch(tmpStatusSelectedItem[i]) {
            case 'none':
                tmpStatusSelectedItem[i] = 'full';
                handle_toggle_selectBox(index_parent, i, data_detail[i], true);
                break;
            default:
                tmpStatusSelectedItem[i] = 'none';
                handle_toggle_selectBox(index_parent, i, data_detail[i], false);
                break;

        }
    }

	render() {
		const { data_detail, enableIconCheckable } = this.props;
		let page = 
		<ul style={{listStyleType: 'none', paddingLeft: enableIconCheckable===false?20:40}}>
        {
        	data_detail.map((item, index) =>
        		<li key={item.id}>
            		<span data-id={index} >
                        {
                            enableIconCheckable===true?this.handleRenderIcnSquareItemMenu(index):null
                        } 
                        <label style={{marginLeft: 4}}>{item.nama}</label>
            		</span>
        		</li>
        	)
        }
        </ul>;

        return(page);
	}
}
