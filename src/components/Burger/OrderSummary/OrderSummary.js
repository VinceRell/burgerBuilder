import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    let ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{"textTransformation": "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>
        });

    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <strong>Total: ${props.price.toFixed(2)}</strong>
            <p>Continue to checkout?</p>
            <Button 
                BtnType={"Danger"} 
                clicked={props.cancelHandler}>
                CANCEL
            </Button>
            <Button 
                BtnType={"Success"}
                clicked={props.continueHandler}>
                CONTINUE
            </Button>
        </React.Fragment>
    );
}


export default orderSummary;