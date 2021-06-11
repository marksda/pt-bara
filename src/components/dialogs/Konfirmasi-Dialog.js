import React, { Component } from "react";
import { Button } from 'antd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import {
    WarningOutlined,
} from '@ant-design/icons';
  


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
                <WarningOutlined style={{fontSize: '24px', color: '#e6a833', marginRight: 8}} />Warning
            </DialogTitle>
            <DialogContent 
                className="py-1" 
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16}}
            >               
                <Typography variant="body1">{this.props.message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button htmlType="button" size="medium" onClick={this.handleCancel} style={{width: 100}}>
                    Tidak
                </Button>
                <Button type="primary" htmlType="button" size="medium" onClick={this.handleOk} style={{width: 100, marginRight: 12}}>
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
