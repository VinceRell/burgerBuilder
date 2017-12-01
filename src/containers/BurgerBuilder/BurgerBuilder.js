import React, { Component } from "react";

//components
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger.js";
import BuildControls from "../../components/Burger/BuildControls/BuildControls.js"

const INGREDIENT_PRICES={
  cheese: 0.10,
  salad: 0.25,
  bacon: 0.50,
  meat: 1.25
}

class BurgerBuilder extends Component{

  state = {
    ingredients: {
      cheese: 0,
      salad: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) =>{
    //keep track of the current inrgedient count from the state
    const oldCount = this.satte.ingredients[type];
    //update the ingredient by 1
    const updatedCount = oldCount + 1;
    //create a copy of the state to prevent imutability of origional state
    const upgradedIngredients = {
      ...this.state.ingredients
    }
    //replace the value of the selected type with its new value
    upgradedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ingredients: upgradedIngredients, totalPrice: newPrice});
  };

  render(){
    return(
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls />
      </Aux>
    );
  }
}


export default BurgerBuilder;
