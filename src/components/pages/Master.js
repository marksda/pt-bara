import React from 'react';
import { Tabs  } from 'antd';

import TableCustomer from '../tables/Table-Customer';
import TableJabatan from '../tables/Table-Jabatan';
import TablePegawai from '../tables/Table-Pegawai';
import TableStrukturOrganisasi from '../tables/Table-Struktur-Organisasi';


const { TabPane } = Tabs;

class Master extends React.Component {
    render() {
        let page =
        <Tabs defaultActiveKey="1" centered size="large">            
            <TabPane tab="Customer" key="1">
                <div className="content-flex-center">
                    <TableCustomer title="Data Customer"/>
                </div>
            </TabPane>            
            <TabPane tab="Jabatan" key="2">
                <div className="content-flex-center">
                    <TableJabatan title="Data Jabatan"/>
                </div>
            </TabPane>
            <TabPane tab="Pegawai" key="3">
                <div className="content-flex-center">
                    <TablePegawai title="Data Pegawai"/>
                </div>
            </TabPane>
            <TabPane tab="Pengemban jabatan" key="4">
                <div className="content-flex-center">
                Content of Tab Pane 3
                </div>
            </TabPane>
            <TabPane tab="Struktur organisasi" key="5">
                <div className="content-flex-center">
                    <TableStrukturOrganisasi title="Data Pegawai"/>
                </div>
            </TabPane>
        </Tabs>;  
        return(page);
    }
}

export default Master;