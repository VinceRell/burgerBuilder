import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger.js";
import BuildControls from "../../components/Burger/BuildControls/BuildControls.js";
import Modal from "../../components/UI/Modal/Modal.js";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary.js"

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  purchasingHandler = (ingredients) =>{
    const sum = Object.keys(ingredients).map(igKey =>{
      return ingredients[igKey];
    }).reduce((sum,el)=>{
      return sum + el;
    },0);
    this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.purchasingHandler(updatedIngredients);
  };

  removeIngredientHandler = (type) =>{
    //keep track of the current inrgedient count from the state
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    //update the ingredient by -1
    const updatedCount = oldCount - 1;
    //create a copy of the state to prevent imutability of origional state
    const updatedIngredients = {
      ...this.state.ingredients
    }
    //replace the value of the selected type with its new value
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.purchasingHandler(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () =>{
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () =>{
     alert("You continued");
  }

  render(){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
           <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCancel={this.purchaseCancelHandler}
              purchaseContinue={this.purchaseContinueHandler}
           />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchase={this.state.purchasable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}/>
      </Aux>
    );
  }
}


export default BurgerBuilder;
