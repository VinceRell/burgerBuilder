import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                            key={ctrl.label} 
                            label={ctrl.label} 
                            addHandler={() => props.ingredientAdded(ctrl.type)}
                            removeHandler={() => props.ingredientRemoved(ctrl.type)}
                            disabled={props.disabled[ctrl.type]}/>
            })}
            <button 
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>{props.isAuth ? "Order Now" : "Sign Up To Order"}</button>
        </div>
    );
}

export default BuildControls;