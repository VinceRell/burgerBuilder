import React from "react";

import classes from "./BuildControls.css";

//components
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"}
];


const BuildControls = (props) =>(
  <div className={classes.BuildControls}>
    <p>price: <strong>&#36;{props.price.toFixed(2)}</strong></p>
    {controls.map(ctrl=>(
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        more={() => props.ingredientAdded(ctrl.type)}
        less={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}/>
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchase}
      onClick={props.ordered}>Purchase</button>
  </div>
);

export default BuildControls;
