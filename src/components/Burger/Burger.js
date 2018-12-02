import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

import classes from "./Burger.module.css";

const Burger  = (props) => {
    let ingredients = Object.keys(props.Ingredients).map(igKey => {
        return [...Array(props.Ingredients[igKey])].map((_,i) => {
            return <BurgerIngredients key={igKey + i} ingredientType={igKey} />
        });
    }).reduce((arr,el) => {
        return arr.concat(el);
    }, []);

     if(ingredients.length === 0) {
         ingredients = <p>Please Add Some Ingredients</p>
     }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients ingredientType={"top-bun"} />
            {ingredients}
            <BurgerIngredients ingredientType={"bottom-bun"} />
        </div>
    );
}


export default Burger;