import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import { setUnauthorization } from "../../actions/notification-action";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
});

const mapStateToProps = store => {
    return {
        authorizationNotify: store.notification.authorization_notify,
        credential: store.credential.credential_profile,
        headerAuthorization: store.credential.header_authorization,
        restfulServer: store.general.restful_domain,
        userProfile: store.credential.user_profile
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setUnauthorization: () => dispatch(setUnauthorization())
    };
};


class Main extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            open: false
        }

    }
    

    handleDrawerOpen = () => {
        this.setState({open: true});
    }
    
    render() {
        const { authorizationNotify, classes } = this.props;
        const { open } = this.state;

        let page = null;

        if(authorizationNotify === 'unauthorization') {
	    	return <Redirect to="/" />;
	    }
        else{
            page = 
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            PT. BARA
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>;

            return(page);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Main));