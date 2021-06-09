import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: 300,
        height: 30,
        textAlign: 'center'
    },
});

class ProcessingDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.open
        };
    }
    
    render() {
        const { classes } = this.props;  
        let page = null;
        page =
        <Dialog
            open={this.props.open}
        >
            <DialogContent className="px-2">
                <div className={classes.root}>
                    <LinearProgress color="secondary" />
                    <Typography variant="body1">
                        Processing....
                    </Typography>
                </div>
            </DialogContent>
        </Dialog>
        return(page);
    }
}

ProcessingDialog.propTypes = {
    container: PropTypes.object,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProcessingDialog);