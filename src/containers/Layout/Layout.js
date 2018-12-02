import React, { Component } from 'react';

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
                <Toolbar openMobileNav={this.openSideDrawerHandler}/>
                <SideDrawer 
                    openSideDrawer={this.state.displaySideDrawer} 
                    closedSideDrawer={this.closeSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
} 

export default Layout;