import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return(
            <Redirect to="/"/>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);