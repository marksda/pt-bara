import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { deepOrange } from '@material-ui/core/colors';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAuthorization } from "../../actions/notification-action";
import { setCredential, setUser } from "../../actions/login-action";
import { setMenu } from "../../actions/master-action";
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
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    smallAvatar: {
        width: 22,
        height: 22,
        fontSize: 10,
    },
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
      setAuthorization: () => dispatch(setAuthorization()),
      setMenu: data => dispatch(setMenu(data)),
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
            isErrorPassword: false,
            isErrorUserName: false,
            isShowPassword: false,
            step: 1
		};

        this.errorPasswordMessage = null;
        this.errorUserNameMessage = null;
        this.password = '';
        this.userName = '';
        this.userProfile = {};
	}

    componentDidMount() {
        // this.showStep(1);
    }

    handleBtnPasswordClick = (e) => {
        e.preventDefault();
        if(this.verifikasiPassword()) {
            this.validatePassword();
        }
    }
    
    handleBtnShowStep2Click = (e) => {
        e.preventDefault();
        if(this.verifikasiUserName()) {
            this.validateUsername();
        }
    }

    handleChangeShowPassword = (e) => {
        this.setState({isShowPassword: e.target.checked});
    }

    handleKeyUpPassword = (e) => {
        if (e.key === 'Enter') {
            if(this.verifikasiPassword()) {
                this.validatePassword();
            }
        }
    }

    handleKeyUpUsername = (e) => {
        if (e.key === 'Enter') {
            if(this.verifikasiUserName()) {
                this.validateUsername();
            }
        }
    }

    onChangePassword = (e) => {
        this.password = e.target.value;
    }

    onChangeUsername = (e) => {
        this.userName = e.target.value;
    }

    showStep = (step) => {
        let elusername = document.getElementById("step1");
        let elpassword = document.getElementById("step2");
        if(step === 1) {    
            document.getElementById("judul").textContent = "Sign in";
            let elsubjudul = document.getElementById("subjudul");
            elsubjudul.textContent = 'untuk lanjut ke sistem informasi keuangan';
            elsubjudul.style.marginTop = 8;
            elsubjudul.style.marginBottom = 8;
            elpassword.classList.add("hide");
            elusername.classList.remove("hide");        
            elusername.classList.add("show");
            this.setState({step: 1});
        }
        else if(step === 2) {            
            document.getElementById("judul").textContent = "SELAMAT DATANG DI SIK BARA";
            let elsubjudul = document.getElementById("subjudul");
            elsubjudul.textContent = this.userProfile.nama;
            elsubjudul.style.marginTop = 0;
            elsubjudul.style.marginBottom = 0;
            elusername.classList.add("hide");
            elpassword.classList.remove("hide");
            elpassword.classList.add("show");    
            let divElmPassword = elpassword.firstChild;
            divElmPassword.style.marginBottom = '0px';
            this.setState({step: 2});        
        }
    }

    validatePassword = () => {
        const { restfulServer, setAuthorization, setCredential, setMenu, setUser } = this.props;
        let self = this;
        axios({
            method: 'get',
            url: `${restfulServer}/login/password`,
            params: {
                id: self.userProfile.nip,
                password: self.password
            }
        })
        .then((r) => {         
            if(r.data.status === 200) {         
                self.setState({isProgress: false, isDisabled: false});                
                setMenu(r.data.keterangan.menu);
                setUser(self.userProfile);
                setCredential(r.data.keterangan.credential);
                setAuthorization();
            }
            else {
                self.errorPasswordMessage = `Password salah. Silahkan dicoba lagi`;
                self.setState({isErrorPassword: true, isProgress: false, isDisabled: false});
            }
        })
        .catch((e) => {
            console.log(e);
        });
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
                self.showStep(2);
            }
            else {
                self.errorUserNameMessage = `maaf user name ${self.userName} tidak dikenali`;
                self.setState({isErrorUserName: true, isProgress: false, isDisabled: false});
            }
        })
        .catch((e) => {
            console.log(e);
        });
    }

    verifikasiPassword = () => {
        if(this.password.length < 3) {
            this.errorPasswordMessage = "Password harus diisi minimal 8 karakter";
            this.setState({isErrorPassword: true});
            return false;
        }
        else {
            this.errorPasswordMessage = '';
            this.setState({isErrorPassword: false, isProgress: true, isDisabled: true});
            return true;
        }
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
        const { isDisabled, isErrorPassword, isErrorUserName, isProgress, isShowPassword, step } = this.state;
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
                        <Box id="judul" fontWeight="500" fontSize="h6.fontSize" textAlign="center" m={1}>
                            Sign in
                        </Box>
                        <div className="subjudul">
                            {
                                step === 2 ? <Avatar className={clsx(classes.orange, classes.smallAvatar)}>{this.userProfile.nama[0]}</Avatar> : null
                            }
                            <Box id="subjudul" textAlign="center" m={1}>
                                untuk lanjut ke sistem informasi keuangan
                            </Box>
                        </div>
                    </Typography>
                    <div className="slide-in-container">
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
                        <section id="step2" className="slide-in from-left hide">
                            <TextField
                                autoFocus={true} 
                                classes={{ root: classes.verticalSpacing48 }} 
                                disabled={isDisabled}
                                error={isErrorPassword} 
                                fullWidth={true}
                                id="outlined-basic" 
                                label="Masukkan password anda"
                                onChange={this.onChangePassword}
                                onKeyUp={this.handleKeyUpPassword}
                                variant="outlined"
                                required={true}
                                helperText={this.errorPasswordMessage}
                                type={isShowPassword === true ? "text" : "password"}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isShowPassword}
                                        color="primary"
                                        onChange={this.handleChangeShowPassword}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                }
                                label='Tunjukkan password'
                            />
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="large" 
                                disabled={isDisabled}
                                style={{width: 100, float: 'right', marginTop: 100}}
                                onClick={this.handleBtnPasswordClick}
                            >                
                            Next
                            </Button>
                        </section>                      
                    </div>
                </div>
            </Paper>;
            
            return(page);
        }        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Login));