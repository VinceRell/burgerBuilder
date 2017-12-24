import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component{
    state={
      showSideDrawer: false
    }

    sideDrawerToggleHandler = () =>{
      this.setState(prevState =>({showSideDrawer: !prevState.showSideDrawer}));
    }

    sideDrawerClosedHandler = () =>{
      this.setState({showSideDrawer: false});
    }

    render(){
      return(
        <Aux>
          <Toolbar clicked={this.sideDrawerToggleHandler}/>
          <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
          <main className={classes.Content}>
              {this.props.children}
          </main>
        </Aux>
      );
    }

}

export default Layout;
