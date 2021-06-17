import React from 'react';
import { Tabs  } from 'antd';

import TableGroup from '../tables/Table-Group';
import TableUser from '../tables/Table-user';


const { TabPane } = Tabs;

class Security extends React.Component {
    render() {
        let page =
        <Tabs defaultActiveKey="1" centered size="large">            
            <TabPane tab="Group hak akses" key="1">
                <div className="content-flex-center">
                    <TableGroup title="Data Group Hak Akses"/>
                </div>
            </TabPane>
            <TabPane tab="User hak akses" key="2">
                <div className="content-flex-center">
                    <TableUser title="Data User Hak Akses"/>
                </div>
            </TabPane>
        </Tabs>;  
        return(page);
    }
}

export default Security;