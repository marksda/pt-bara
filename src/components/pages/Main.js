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
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { setUnauthorization } from "../../actions/notification-action";
import { setItemMenuSelected, setModeProyekBaru } from "../../actions/master-action";
import { resetCredential } from "../../actions/login-action";

import Master from "./Master";
import PengajuanBaru from "./Pengajuan-Baru";
import Pengajuan from "./Pengajuan";
import Proyek from "./Proyek";
import ProyekBaru from "./Proyek-Baru";
import Security from "./Security";

import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex'
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
        padding: theme.spacing(3)
    },
    title: {
        flexGrow: 1,
    },
});

const mapStateToProps = store => {
    return {
        authorizationNotify: store.notification.authorization_notify,
        headerAuthorization: store.credential.header_authorization,
        listMenu: store.master.menus,
        restfulServer: store.general.restful_domain,
        userProfile: store.credential.user_profile,
        itemMenuSelected: store.master.item_menu_selected,
        isProgress: store.master.is_progress,
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setUnauthorization: () => dispatch(setUnauthorization()),
        setItemMenuSelected: (nilai) => dispatch(setItemMenuSelected(nilai)),
        setModeProyekBaru: (nilai) => dispatch(setModeProyekBaru(nilai)),  
        resetCredential: () => dispatch(resetCredential())
    };
};


class Main extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            open: false,
            isOpenMenu: false,
            anchorEl: null
        }
    }

    // componentDidMount() {
    //     this.cekSession();
    // }

    // cekSession = () => {

    // }

    handleCloseMenuPopup = (e) => {
        this.setState({anchorEl: null, isOpenMenu: false});
    }

    handleOpenMenuPopup = (e) => {
        this.setState({anchorEl: e.currentTarget, isOpenMenu: true});
    }
   
    handleDrawerClose = () => {
        this.setState({open: false});
    }

    handleDrawerOpen = (e) => {
        this.setState({open: true});
    }

    handleItemMenuClick = (e) => {
        const { setItemMenuSelected, setModeProyekBaru } = this.props;
        if( e.currentTarget.textContent === 'Proyek Baru') {
            setModeProyekBaru('add');
        }
        setItemMenuSelected(e.currentTarget.textContent);        
    }

    handleLogOut = () => {
        const { resetCredential, setUnauthorization} = this.props;        
        this.setState({anchorEl: null, isOpenMenu: false});
        resetCredential();
        setUnauthorization();
    }
    
    render() {
        const { authorizationNotify, classes, itemMenuSelected, isProgress, listMenu, restfulServer, userProfile } = this.props;
        const { anchorEl, isOpenMenu, open } = this.state;

        let page = null;
        let subPage = null;

        switch (itemMenuSelected) {
            case 'Proyek Baru':
                subPage = 
                <ProyekBaru  />;
                break;
            case 'Daftar Proyek':
                subPage = 
                <Proyek />;
                break;
            case 'Pengajuan Baru':
                subPage = <PengajuanBaru />;
                break;
            case 'Daftar Pengajuan':
                subPage = <Pengajuan />;
                break;
            case 'Master':
                subPage = <Master />;
                break;
            case 'Security':
                subPage = <Security />;
                break;
            default:
                subPage = null;
                break;
        }

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
                        <Typography variant="h6" noWrap style={{color: 'white'}} className={classes.title}>
                            {itemMenuSelected}
                        </Typography>
                        <div 
                            style={{display: 'flex', alignItems: 'center', cursor: isProgress===false?'pointer':'default'}}
                        >
                            <Typography 
                                variant="subtitle1" 
                                style={{marginRight: 8, color: 'white'}}                                
                                onClick={this.handleOpenMenuPopup}
                            >
                            {userProfile.accountRealName}
                            </Typography>
                            <Avatar 
                                alt={userProfile.accountRealName} 
                                src={`${restfulServer}/master/foto/pegawai/${userProfile.photo}`}                                
                                onClick={this.handleOpenMenuPopup}
                             />
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={isOpenMenu && !isProgress}
                                onClose={this.handleCloseMenuPopup}
                            >
                                <MenuItem onClick={this.handleCloseMenuPopup}>Profile</MenuItem>
                                <MenuItem onClick={this.handleCloseMenuPopup}>My account</MenuItem>
                                <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
                            </Menu>
                        </div>                        
                    </Toolbar>
                    {isProgress===true?<LinearProgress color="secondary"/>:null}
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
                                            disabled={isProgress}
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
                    {subPage}
                </main>
            </div>;

            return(page);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Main));