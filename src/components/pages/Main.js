import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import { setUnauthorization } from "../../actions/notification-action";

const drawerWidth = 240;
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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
});

const mapStateToProps = store => {
    return {
        authorizationNotify: store.notification.authorization_notify,
        headerAuthorization: store.credential.header_authorization,
        listMenu: store.master.menus,
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
            itemMenuSelected: '',
            open: false
        }
    }

    componentDidMount() {
        const { listMenu } = this.props;
        if(listMenu.length > 0) {
            this.setState({itemMenuSelected: listMenu[0].menu_item[0].nama});
        }
    }

    handleDrawerClose = () => {
        this.setState({open: false});
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    }

    handleItemMenuClick = (e) => {
        if(e.currentTarget.textContent !== this.state.itemMenuSelected) {            
            this.setState({itemMenuSelected: e.currentTarget.textContent});
        }
    }
    
    render() {
        const { authorizationNotify, classes, listMenu } = this.props;
        const { itemMenuSelected, open } = this.state;

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
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {itemMenuSelected}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    })}
                    classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {
                        listMenu.map((item, idx) => 
                            <React.Fragment key={idx}>
                            <Divider />
                            <List
                                dense={true}
                                subheader={ open === true ?
                                    <ListSubheader>
                                    {item.sub_header}
                                    </ListSubheader>:
                                    null
                                }
                            >
                                {
                                    item.menu_item.map((itemMenu, index) =>
                                        <ListItem 
                                            button key={itemMenu.id} 
                                            onClick={this.handleItemMenuClick}
                                            selected={itemMenuSelected === itemMenu.nama ? true : false}
                                        >
                                            <ListItemIcon>
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={itemMenu.nama} />
                                        </ListItem>
                                    )
                                }
                            </List>
                            </React.Fragment>
                        )
                    }
                    
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                    </Typography>
                </main>
            </div>;

            return(page);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Main));