import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Master extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            itemTabSelected: 0
        }
    }

    handleChangeItemTab = (e, newValue) => {
        this.setState({itemTabSelected: })
    }

    render() {
        const { itemTabSelected } = this.state;
        let page =
        <Tabs
            value={itemTabSelected}
            onChange={this.handleChangeItemTab}
            indicatorColor="primary"
            textColor="primary"
            centered
        >
            <Tab label="Item One" />
            <Tab label="Item Two" />
            <Tab label="Item Three" />
        </Tabs>;
        return(page);
    }
}

export default Master;