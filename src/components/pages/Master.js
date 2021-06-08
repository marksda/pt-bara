import React from 'react';
import { Radio } from 'antd';

class Master extends React.Component {
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
        <div>
        <Radio.Group value={itemTabSelected} onChange={this.handleChangeItemTab}>
          <Radio.Button value="Proyek">Proyek</Radio.Button>
          <Radio.Button value="Non_Proyek">Non-Proyek</Radio.Button>
        </Radio.Group>
        </div>;
        return(page);
    }
}

export default Master;