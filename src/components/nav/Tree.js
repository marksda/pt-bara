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
        };

        this.menuTemporar = [];
    }

    componentDidMount() {
        const {data, menuTreeSelected, mode} = this.props;
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
        const {statusSelectedItem} = this.state;        
        let tmpStatusSelectedItem = [...statusSelectedItem];
        let i = Number(e.currentTarget.dataset.id);
        switch(tmpStatusSelectedItem[i]) {
            case 'none':
                tmpStatusSelectedItem[i] = 'full';
                break;
            case 'half':
                tmpStatusSelectedItem[i] = 'full';
                break;
            default:
                tmpStatusSelectedItem[i] = 'none';
                break;

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
        let page = 
    	<TreeDetail 
    		data_detail={data} 
    		handle_nested={this.handleNested} 
    		handle_recursive={this.handleRecursiveElement}
            enableIconCheckable={this.props.enableIconCheckable}
            handle_toggle_selectBox={this.handleToggleSelectBox}
            index_parent={idxParent}
    	/>;

    	return(page);
    }

    initTreeModeEdit = (menuTerpilih, menuLengkap, startItag, liNode) => {
        let i = 0;
        let indexFinded = -1;
        let boxElement = null;
        for(i=0;i<menuLengkap.length;i++) {
            indexFinded = _.findIndex(menuTerpilih, function(o){
                return o.title === menuLengkap[i].title;
            });

            if(indexFinded !== -1) {
                boxElement = liNode[startItag];
                boxElement.dataset.checked = "true"
                boxElement.classList.remove("fa-square");
                boxElement.classList.add("fa-check-square");
            }

            startItag++;

            if(indexFinded !== -1 && menuLengkap[i].has_child === true) {
                startItag = this.initTreeModeEdit(menuTerpilih[indexFinded].childs, menuLengkap[i].childs, startItag, liNode);
            } 
            else if(menuLengkap[i].has_child === true) {
                startItag = this.counterStartItag( menuLengkap[i].childs, startItag);
            }           
        }
        return startItag;
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
        const { data_detail } = this.props;
        let tmpStatusSelectedItem = [];

        for(let i=0;i<data_detail.length;i++) {
            tmpStatusSelectedItem[i] = 'none';
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

    handleTogleItemMenu = (e) => {
        e.stopPropagation();
        const {statusSelectedItem} = this.state;        
        let tmpStatusSelectedItem = [...statusSelectedItem];
        let i = Number(e.currentTarget.dataset.id);
        switch(tmpStatusSelectedItem[i]) {
            case 'none':
                tmpStatusSelectedItem[i] = 'full';
                break;
            case 'half':
                tmpStatusSelectedItem[i] = 'full';
                break;
            default:
                tmpStatusSelectedItem[i] = 'none';
                break;

        }
        
        this.setState({statusSelectedItem: tmpStatusSelectedItem});
    }

	render() {
		const { data_detail, enableIconCheckable } = this.props;
		let page = 
		<ul style={{listStyleType: 'none', paddingLeft: enableIconCheckable===false?20:40}}>
        {
        	data_detail.map((item, index) =>
        		<li key={item.id}>
            		<span data-id={item.id} >
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
