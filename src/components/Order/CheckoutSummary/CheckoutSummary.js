import React from "react";

import classes from "./CheckoutSummary.css";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";


const CheckoutSummary = (props)=>{
  return(<div className={classes.CheckoutSummary}>
    <h1>Enjoy your tasty meal!</h1>
    <div style={{width: "100%", height: "300px", margin: "auto"}}>
      <Burger ingredients={props.ingredients}/>
    </div>
    <Button
      btnType="Danger"
      clicked={props.checkoutCancelled}>
        CANCEL
    </Button>
    <Button
      btnType="Success"
      clicked={props.checkoutContinued}>
        SUCCESS
    </Button>
  </div>);
}


export default CheckoutSummary;
