import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {
    
    const ingredientsCopy = [];
    for (let ingredientName in props.ingredients) {
        ingredientsCopy.push({
            name: ingredientName,
            quantity: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredientsCopy.map( ig => {
        return <span 
                    style={{
                        textTransform: "capitalize",
                        display: "inline-block",
                        margin: "0 8px",
                        border: "1px solid #ccc"
                    }}
                    key={ig.name}>
                        {ig.name} 
                        ({ig.quantity})
               </span>
    });

    return (    
        <div className={classes.Order}>
            <p>ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.price}</strong></p>
        </div>
    );
};


export default Order;