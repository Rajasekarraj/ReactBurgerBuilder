import React, { Component } from 'react';
import classes from '../Layout/Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false})
    }

    openSideDrawer = () => {
        this.setState((prevState)=> {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar
                isAuth = {this.props.isAuthenticated}
                showOrHideDrawer = {this.openSideDrawer}/>
                <SideDrawer
                isAuth = {this.props.isAuthenticated}
                open = {this.state.showSideDrawer}
                closed = {this.closeSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);