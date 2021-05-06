import React from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setUser, setCredential } from "../../actions/login-action";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    containerButton: {
        float: 'right'
    },
    verticalSpacing48: {
        marginBottom: theme.spacing(6)
    },
    verticalSpacing32: {
        marginBottom: theme.spacing(4)
    },
    verticalSpacing24: {
        marginBottom: theme.spacing(3)
    },
    progresBorderIndikator: {
        borderRadius: '3px 3px 0px 0px'
    }
});

const mapStateToProps = store => {
    return {
        authorizationNotify: store.notification.authorization_notify,
        credential: store.credential.credential_profile,
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
      setUser: data => dispatch(setUser(data)),
      setCredential: data => dispatch(setCredential(data))
    };
};

class Login extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			isProgress: false,
            isDisabled: false,
            isErrorUserName: false
		};

        this.errorUserNameMessage = null;
        this.userName = '';
        this.userProfile = {};
	}

    handleBtnShowStep2Click = (e) => {
        e.preventDefault();
        if(this.verifikasiUserName()) {
            this.validateUsername();
        }
    }

    handleKeyUpUsername = (e) => {
        if (e.key === 'Enter') {
            if(this.verifikasiUserName()) {
                this.validateUsername();
            }
        }
    }

    onChangeUsername = (e) => {
        this.userName = e.target.value;
    }

    validateUsername = () => {
        const { restfulServer } = this.props;
        let self = this;
        axios({
            method: 'get',
            url: `${restfulServer}/login/user`,
            params: {
                username: self.userName
            }
        })
        .then((r) => {
            
            if(r.data.status === 200) {
                self.setState({isProgress: false, isDisabled: false});
                self.userProfile = {...r.data.user};
            }
            else {
                self.errorUserNameMessage = `User name : ${self.userName} tidak dikenali`;
                self.setState({isErrorUserName: true, isProgress: false, isDisabled: false});
            }
        })
        .catch((e) => {
            console.log(e);
        });
    }

    verifikasiUserName = () => {
        if(this.userName.length === 0) {
            this.errorUserNameMessage = "User name harus diisi";
            this.setState({isErrorUserName: true});
            return false;
        }
        else {
            this.errorUserNameMessage = '';
            this.setState({isErrorUserName: false, isProgress: true, isDisabled: true});
            return true;
        }
    }

    render() {
        const { authorizationNotify, classes } = this.props;
        const { isDisabled, isErrorUserName, isProgress } = this.state;
        let page = null;

        if(authorizationNotify === 'authorization') {
	    	return <Redirect to="/main" />;
	    }
        else{
            page =
            <Paper variant="outlined" className={"container-login"}>
                {
                    isProgress === true ? <LinearProgress classes={{root: classes.progresBorderIndikator}}/> : null
                }
                <div className="container-login-body">
                    <Typography component="div" className={classes.verticalSpacing32}>
                        <Box fontWeight="500" fontSize="h6.fontSize" textAlign="center" m={1}>
                            Sign in
                        </Box>
                        <Box textAlign="center" m={1}>
                            untuk lanjut ke sistem informasi keuangan
                        </Box>
                    </Typography>
                    <section id="step1" className="slide-in from-left show">
                        <TextField
                            autoFocus={true} 
                            classes={{ root: classes.verticalSpacing48 }} 
                            disabled={isDisabled}
                            error={isErrorUserName} 
                            fullWidth={true}
                            id="outlined-basic" 
                            label="User name"
                            onChange={this.onChangeUsername}
                            onKeyUp={this.handleKeyUpUsername}
                            variant="outlined"
                            required={true}
                            helperText={this.errorUserNameMessage}
                        />
                        <Typography component="div" className={classes.verticalSpacing24}>
                            <Box textAlign="left" fontWeight="400" fontSize={12} m={0}>
                            Gunakan mode private untuk sign in, jika memakai komputer atau gadget orang lain.
                            </Box>
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            disabled={isDisabled}
                            style={{width: 100, float: 'right'}}
                            onClick={this.handleBtnShowStep2Click}
                        >                
                        Next
                        </Button>
                    </section>
                </div>
            </Paper>;
            
            return(page);
        }        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Login));