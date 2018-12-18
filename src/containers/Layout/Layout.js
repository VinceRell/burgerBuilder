import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        displaySideDrawer: false
    }

    openSideDrawerHandler = () => {
        this.setState((prevState) => {
             return {displaySideDrawer: !prevState.displaySideDrawer};
        });
    }

    closeSideDrawerHandler = () => {
        this.setState({displaySideDrawer: false});
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                openMobileNav={this.openSideDrawerHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    openSideDrawer={this.state.displaySideDrawer} 
                    closedSideDrawer={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);