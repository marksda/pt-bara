import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

class Home extends React.Component {
    render() {
        let page = null;

        page =
        <Paper variant="outlined" style={{width: 300, height: 400, margin: "10px auto"}}>
            <Button variant="contained" color="primary">
            Hello World
            </Button>
        </Paper>;
        return(page);
    }
}

export default Home;