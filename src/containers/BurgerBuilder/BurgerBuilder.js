import React, { Component } from "react";

//components
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger.js";

class BurgerBuilder extends Component{

  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      bacon: 0,
      meat: 0
    }
  }

  render(){
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>burger-controls</div>
      </Aux>
    );
  }
}


export default BurgerBuilder;
