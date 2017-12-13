import React from "react";

//components
import Aux from "../../hoc/Auxiliary";


const Layout = (props) =>(
  <Aux>
    <div>Toolbar, SideDrawer</div>
    <main>
        {props.children}
    </main>
  </Aux>
);

export default Layout;
