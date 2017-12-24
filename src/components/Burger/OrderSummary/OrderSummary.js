import React from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = (props)=>{
  const ingredientSummary = Object.keys(props.ingredients).map((igKey)=>{
    return(
      <li key={igKey}>
        <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
      </li>
    );
  });
  return(
    <Aux>
      <h3>Your Order:</h3>
      <p>A hamburger with</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><b>Total price: &#36;{props.price.toFixed(2)}</b></p>
      <p>Continue to checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.purchaseCancel}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.purchaseContinue}>CONTINUE</Button>
    </Aux>
  );
}

export default OrderSummary;
