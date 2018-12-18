import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let mobileStyles = [classes.SideDrawer, props.openSideDrawer ? classes.Open : classes.Close];
    return (
        <React.Fragment>

            <Backdrop
            show={props.openSideDrawer} 
            cancelEvent={props.closedSideDrawer}/>

            <div className={mobileStyles.join(" ")}>
                
                <div className={classes.Logo}>
                    <Logo />
                </div>
                
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>

            </div>
        </React.Fragment>
    );
}


export default sideDrawer;