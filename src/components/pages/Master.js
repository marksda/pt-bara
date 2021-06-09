import React from 'react';
import { Tabs  } from 'antd';


const { TabPane } = Tabs;

class Master extends React.Component {
    // constructor(props) {
	// 	super(props);

    //     // this.state = {
    //     //     itemTabSelected: 'Proyek'
    //     // }
    // }

    // handleChangeItemTab = (e) => {
    //     this.setState({ itemTabSelected: e.target.value });
    // }

    render() {
        // const { itemTabSelected } = this.state;
        let page =
        <Tabs defaultActiveKey="1" centered size="large">            
            <TabPane tab="Customer" key="1">
                <div className="content-flex-center">
                Content of Tab Pane 4
                </div>
            </TabPane>
            <TabPane tab="Struktur organisasi" key="2">
                <div className="content-flex-center">
                Content of Tab Pane 1
                </div>
            </TabPane>
            <TabPane tab="Jabatan" key="3">
                <div className="content-flex-center">
                Content of Tab Pane 2
                </div>
            </TabPane>
            <TabPane tab="Pegawai" key="4">
                <div className="content-flex-center">
                Content of Tab Pane 3
                </div>
            </TabPane>
            <TabPane tab="Pengemban jabatan" key="5">
                <div className="content-flex-center">
                Content of Tab Pane 3
                </div>
            </TabPane>
        </Tabs>;  
        return(page);
    }
}

export default Master;