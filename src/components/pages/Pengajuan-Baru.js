import React from 'react';
import { Divider, Radio } from 'antd';

import FormPengajuanProyek from '../forms/Form-Pengajuan-Proyek';

class PengajuanBaru extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            itemTabSelected: 'Proyek'
        }
    }

    handleChangeItemTab = (e) => {
        this.setState({ itemTabSelected: e.target.value });
    }

    render() {
        const { itemTabSelected } = this.state;
        let page =
        <>
            <div className="content-master">
                <Radio.Group value={itemTabSelected} onChange={this.handleChangeItemTab}>
                    <Radio.Button value="Proyek">Proyek</Radio.Button>
                    <Radio.Button value="Non_Proyek">Non-Proyek</Radio.Button>
                </Radio.Group>  
            </div>                  
            <Divider style={{borderTop: '1px solid rgba(17, 123, 236, 0.54)'}}/>
            <FormPengajuanProyek />
        </>;
        return(page);
    }
}

export default PengajuanBaru;