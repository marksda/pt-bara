import React from 'react';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

import { setUnauthorization } from "../../actions/notification-action";

const styles = theme => ({
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
        userProfile: store.credential.user_profile
    };
};

const mapDispatchToProps = dispatch => {    
    return {
        setUnauthorization: () => dispatch(setUnauthorization())
    };
};


class Main extends React.Component {
    render() {
        const { authorizationNotify, classes } = this.props;
        let page = null;

        if(authorizationNotify === 'unauthorization') {
	    	return <Redirect to="/" />;
	    }
        else{
            page = <div>main</div>;
            return(page);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Main));