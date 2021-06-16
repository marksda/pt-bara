import React from "react";
import { connect } from "react-redux";
import _ from "lodash";


const mapStateToProps = store => {
    return { 
        menuTreeSelected: store.master.menu_tree_selected
    };
};

class Tree extends React.Component {
	constructor(props) {
        super(props); 
        this.menuTemporar = [];
    }

    componentDidMount() {
        const {data, menuTreeSelected, mode} = this.props;
        if(mode === 'edit') {
            this.menuTemporar = _.cloneDeep(menuTreeSelected);
            let liNode = document.getElementsByTagName("I");
            this.initTreeModeEdit(menuTreeSelected, data, 8, liNode);
        }
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

    counterStartItag = (menuLengkap, startItag) => {
        let i = 0;
        for(i=0;i<menuLengkap.length;i++) {
            startItag++;
            if(menuLengkap[i].has_child === true) {
                startItag = this.counterStartItag( menuLengkap[i].childs, startItag)
            }
        }
        return startItag;
    }

    handleNested = (e) => {
    	let elmt = e.currentTarget;
    	if(elmt.dataset.status === "close") {
    		elmt.parentElement.querySelector(".nested").classList.toggle("active-tree");
	    	elmt.removeChild(elmt.childNodes[0]);
	    	let elmSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	        elmSvg.setAttribute("height", "24");
	        elmSvg.setAttribute("style", "fill: rgba(0, 0, 0, 1); width: 16px; height: 24px; display: inline-block; font-size: 1.5rem; flex-shrink: 0; transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;");
	        let elmPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	        elmPath.setAttribute("d", "m0,7l5,6l5,-6l-10,0z");
	        elmSvg.appendChild(elmPath);
	        elmt.prepend(elmSvg);
	        elmt.setAttribute("data-status", "open");
    	}
    	else {
    		elmt.parentElement.querySelector(".nested").classList.toggle("active-tree");
	    	elmt.removeChild(elmt.childNodes[0]);
	    	let newEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            newEl.setAttribute("style", "fill: rgba(0, 0, 0, 1); width: 16px; height: 24px; display: inline-block; font-size: 1.5rem; flex-shrink: 0; transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;");
            let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path1.setAttribute("d", "m1,16l5,-5l-5,-5l0,10z");
            newEl.appendChild(path1);
            let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path2.setAttribute("d", "m1,16l5,-5l-5,-5l0,10z");
            newEl.appendChild(path2);
            elmt.prepend(newEl);
            elmt.setAttribute("data-status", "close");
    	}    	
    }

    handleRecursiveElement = (data, idxParent) => {
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

    handleToggleSelectBox = (e) => {
        const { data, updateMenu } = this.props;
        e.stopPropagation();
        let boxElement = e.currentTarget;
        let elmNodeTree = boxElement.parentElement.parentElement;
        let isHaveChilds = elmNodeTree.dataset.havechilds;
        let levelTree = parseInt(elmNodeTree.dataset.level); 
        let idx = parseInt(elmNodeTree.dataset.idx);
        let isChecked = boxElement.dataset.checked;

        if(isChecked === 'false') {
            //update ui
            boxElement.dataset.checked = "true"
            boxElement.classList.remove("fa-square");
            boxElement.classList.add("fa-check-square");

            if(isHaveChilds === 'true') {
                let liNode = elmNodeTree.getElementsByTagName("LI");   
                let j = 0;
                while(liNode.length > j) {
                    let elmt = null;
                    if( liNode[j].childElementCount === 2 ) {
                        elmt = liNode[j].firstChild.childNodes[1];
                    }
                    else {
                        elmt = liNode[j].firstChild.childNodes[0];                        
                    }
                    
                    elmt.dataset.checked = "true";
                    elmt.classList.remove("fa-square");
                    elmt.classList.add("fa-check-square");
                    j++;
                }            
            }

            //copy item data selected to menuTemporar
            if(levelTree === 0) {
                let tmpSelectedNode = this.props.data[idx];
                let indexFinded = _.findIndex(this.menuTemporar, function(o){
                    return o.title === tmpSelectedNode.title;
                });
                 
                if(indexFinded === -1) {
                    this.menuTemporar.splice(idx, 0, _.cloneDeep(data[idx]));
                }
                else {
                    this.menuTemporar.splice(indexFinded, 1);
                    this.menuTemporar.splice(idx, 0, _.cloneDeep(data[idx]));
                }                
            }
            else {
                this.copyTreeSelected(levelTree, elmNodeTree);
            }       
        }
        else {
            // update ui
            boxElement.dataset.checked = "false"
            boxElement.classList.remove("fa-check-square");
            boxElement.classList.add("fa-square");

            if(isHaveChilds === 'true') {
                let liNode = elmNodeTree.getElementsByTagName("LI");
                let j = 0;
                while(liNode.length > j) {
                    let elmt = null;

                    if( liNode[j].childElementCount === 2 ) {
                        elmt = liNode[j].firstChild.childNodes[1];                        
                    }
                    else {
                        elmt = liNode[j].firstChild.childNodes[0];
                    }

                    elmt.dataset.checked = "false"
                    elmt.classList.remove("fa-check-square");
                    elmt.classList.add("fa-square");
                    j++;
                }
            }

            // data copy
            if(levelTree === 0) {
                _.remove(this.menuTemporar, function(n){
                    return n.title == data[idx].title;
                });
            }
            else {
                let idxParent = parseInt(elmNodeTree.dataset.idxparent);
                this.removeTreeSelected(levelTree, elmNodeTree);
            }
        }

        updateMenu(this.menuTemporar);
    }

    copyTreeSelected = (level, nodeTree) => { 
        let domElmt = []; 
        let arNodeTreeIndex = [];
        arNodeTreeIndex.push(parseInt(nodeTree.dataset.idx));
        while(level>0) {
            domElmt.push(nodeTree.parentElement.parentElement);
            nodeTree = nodeTree.parentElement.parentElement;       
            arNodeTreeIndex.push(parseInt(nodeTree.dataset.idx));     
            level--;
        }

        let idx = arNodeTreeIndex.pop();
        // let tmpSelectedNode = this.props.data[idx];
        let tmpSelectedNode =  _.cloneDeep(this.props.data[idx]);
        let tmpObj = null;
        let indexFinded = _.findIndex(this.menuTemporar, function(o){
            return o.title === tmpSelectedNode.title;
        });

        if(indexFinded === -1) {
            // tmpObj = {...tmpSelectedNode};
            tmpObj = _.cloneDeep(tmpSelectedNode);
            if(tmpObj.has_child === true) {
                tmpObj.childs = [];
            }                
            this.menuTemporar.splice(idx, 0, tmpObj);
        }
        else {
            tmpObj = this.menuTemporar[indexFinded];
        }

        let x = 0;
        let boxElement = domElmt[x].firstChild.childNodes[1];
        boxElement.dataset.checked = "true"
        boxElement.classList.remove("fa-square");
        boxElement.classList.add("fa-check-square");
        x++;


        while(arNodeTreeIndex.length > 0) {
            idx = arNodeTreeIndex.pop();
            tmpSelectedNode = tmpSelectedNode.childs[idx];
            indexFinded = _.findIndex(tmpObj.childs, function(o){
                return o.title === tmpSelectedNode.title;
            });

            if(indexFinded === -1) {
                // let tmp = {...tmpSelectedNode};
                let tmp = _.cloneDeep(tmpSelectedNode);
                if(tmp.has_child === true) {
                    if(arNodeTreeIndex.length>0) {
                        tmp.childs = [];
                    }                    
                }    
                tmpObj.childs.splice(idx, 0, tmp);
                tmpObj = tmp;
                tmp = null;
            }
            else {
                tmpObj = tmpObj.childs[indexFinded];
            }  

            if(x < domElmt.length ) {
                boxElement = domElmt[x].firstChild.childNodes[1];
                boxElement.dataset.checked = "true"
                boxElement.classList.remove("fa-square");
                boxElement.classList.add("fa-check-square");
                x++;     
            }   
        }
    }

    removeTreeSelected = (level, nodeTree) => {   
        let domElmt = [];  
        let arNodeTreeIndex = [];
        arNodeTreeIndex.push(parseInt(nodeTree.dataset.idx));
        while(level>0) {
            domElmt.push(nodeTree.parentElement.parentElement);
            nodeTree = nodeTree.parentElement.parentElement;       
            arNodeTreeIndex.push(parseInt(nodeTree.dataset.idx));     
            level--;
        }
        
        let idx = arNodeTreeIndex.pop();
        let tmpSelectedNode = this.props.data[idx];
        let tmpObj = [];
        let arIndexFinded = [];

        let indexFinded = _.findIndex(this.menuTemporar, function(o){
            return o.title === tmpSelectedNode.title;
        });
        arIndexFinded.push(indexFinded);
        tmpObj.push(this.menuTemporar[indexFinded]);

        let j = 0;
        while(arNodeTreeIndex.length > 0) {
            idx = arNodeTreeIndex.pop();
            tmpSelectedNode = tmpSelectedNode.childs[idx];
            indexFinded = _.findIndex(tmpObj[j].childs, function(o){
                return o.title === tmpSelectedNode.title;
            });
           
            tmpObj.push(tmpObj[j].childs[indexFinded]);
            arIndexFinded.push(indexFinded);
            j++;
        }

        tmpObj.pop();

        let x = 0;
        let delIndexNode = arIndexFinded.pop();
        let delTempNode = tmpObj.pop();
        delTempNode.childs.splice(delIndexNode, 1);

        if(delTempNode.childs.length === 0) {
            let boxElement = domElmt[x].firstChild.childNodes[1];
            boxElement.dataset.checked = "false"
            boxElement.classList.remove("fa-check-square");
            boxElement.classList.add("fa-square");
            x++;
        }

        while(tmpObj.length >= 0) { 
            if(tmpObj.length === 0) {
                if(delTempNode.childs.length === 0) {
                    delIndexNode = arIndexFinded.pop();
                    this.menuTemporar.splice(delIndexNode, 1);
                }
                
                break;
            }       
            else {
                if(delTempNode.childs.length === 0) {
                    delIndexNode = arIndexFinded.pop();
                    delTempNode = tmpObj.pop();
                    delTempNode.childs.splice(delIndexNode, 1);
                    if(delTempNode.childs.length === 0) {
                        let boxElement = domElmt[x].firstChild.childNodes[1];
                        boxElement.dataset.checked = "false"
                        boxElement.classList.remove("fa-check-square");
                        boxElement.classList.add("fa-square");
                        x++;
                    }
                }
                else {
                    break;  
                }
            }
        }

    }

	render() {
		const { data, enableIconCheckable } = this.props;

		let page = 
		<ul id="menu_akses">
        {
        	data!==null?data.map((item, index) =>
        		<li key={item.title} data-level={item.level} data-idx={index} data-havechilds={item.has_child}>
            		<span 
            			className={item.has_child===true?"caret":null}
            			onClick={item.has_child===true?this.handleNested:null}
            			data-status="close"
            		>
            			{
                            item.has_child===true?
                            <svg width="16" height="24">
                                <path d="m1,16l5,-5l-5,-5l0,10z"/>
                                <path d="m1,16l5,-5l-5,-5l0,10z"/>
                            </svg> :null
                        }
                        {
                            enableIconCheckable===true?
                            <i 
                                data-checked="false"
                                className="far fa-square" 
                                style={{marginRight: 8, cursor: 'pointer'}}
                                onClick={this.handleToggleSelectBox}></i>:null
                        }
                        {item.title}

            		</span>
            		{
            			item.has_child===true?
            			this.handleRecursiveElement(item.childs, index)
            			:null
            		}
        		</li>
        	):null
        }
        </ul>;

        return(page);
	}
}

export default connect(mapStateToProps)(Tree);

class TreeDetail extends React.Component {
	render() {
		const { data_detail, enableIconCheckable, handle_nested, handle_recursive, handle_toggle_selectBox, index_parent } = this.props;
		let page = 
		<ul className="nested">
        {
        	data_detail.map((item, index) =>
        		<li key={item.title} data-level={item.level} data-idxparent={index_parent} data-idx={index} data-havechilds={item.has_child}
                    className={item.has_child===true?null:"non_caret"}
                >
            		<span 
            			className={item.has_child===true?"caret":null}
            			onClick={item.has_child===true?handle_nested:null}
            			data-status="close"
            		>
            			{
                            item.has_child===true?
                            <svg width="16" height="24">
                                <path d="m1,16l5,-5l-5,-5l0,10z"/>
                                <path d="m1,16l5,-5l-5,-5l0,10z"/>
                            </svg> :null
                        }
                        {
                            enableIconCheckable===true?
                            <i 
                                data-checked="false"
                                className="far fa-square" 
                                style={{marginRight: 8, cursor: 'pointer'}}
                                onClick={handle_toggle_selectBox}></i>:null
                        }
                        {item.title}
            		</span>
            		{
            			item.has_child===true?
            			handle_recursive(item.childs, index)
            			:null
            		}
        		</li>
        	)
        }
        </ul>;

        return(page);
	}
}
