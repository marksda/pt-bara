import React, { Component } from "react";
import { Button } from 'antd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


class KonfirmasiDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.open
        };

        this.handleCancel = () => {
            this.props.aksi(false);
        };

        this.handleOk = () => {
            this.props.aksi(true);
        }
    }
    
    render() {
        let page = null;
        page =
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="lg"
            aria-labelledby="confirmation-dialog-title"
            open={this.props.open}
        >
            <DialogTitle id="confirmation-dialog-title">
                 <i 
                    className="fas fa-exclamation-triangle red-text pr-2"
                >
                </i>Warning
            </DialogTitle>
            <DialogContent 
                className="py-1" 
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
            >               
                <Typography variant="body1">{this.props.message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button htmlType="button" size="large" onClick={this.handleCancel} style={{width: 100}}>
                    Tidak
                </Button>
                <Button type="primary" htmlType="button" size="large" onClick={this.handleOk} style={{width: 100}}>
                    Ya
                </Button>
            </DialogActions>
        </Dialog>
        return(page);
    }
}

KonfirmasiDialog.propTypes = {
    container: PropTypes.object,
};

export default KonfirmasiDialog;
