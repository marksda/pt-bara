import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import clsx from 'clsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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
			isProgress: false
		};
	}
    render() {
        const { classes } = this.props;
        const { isProgress } = this.state;
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
                <TextField 
                    classes={{ root: classes.verticalSpacing48 }} 
                    id="outlined-basic" 
                    label="User name" 
                    variant="outlined" 
                    fullWidth={true}
                    autoFocus={true}/>
                <Typography component="div" className={classes.verticalSpacing24}>
                    <Box textAlign="left" fontWeight="400" fontSize={12} m={0}>
                    Gunakan mode private untuk sign in, jika memakai komputer atau gadget orang lain.
                    </Box>
                </Typography>
                <Button variant="contained" color="primary" size="large" style={{width: 100, float: 'right'}}>                
                Next
                </Button>
                </div>
            </Paper>;
            
            return(page);
        }        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Login));